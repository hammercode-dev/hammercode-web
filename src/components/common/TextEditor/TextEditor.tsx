"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import python from "highlight.js/lib/languages/python";
import { useState, useCallback, useMemo, useEffect } from "react";
import { markdownToHtml, htmlToMarkdown } from "./utils";
import "highlight.js/styles/github-dark.css";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Toolbar } from "@/components/common/TextEditor";
import Loader from "../Loader";

const lowlight = createLowlight();

lowlight.register("js", js);
lowlight.register("javascript", js);
lowlight.register("ts", ts);
lowlight.register("typescript", ts);
lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("xml", html);
lowlight.register("python", python);
lowlight.register("py", python);

interface TextEditorProps {
  markdownOutput?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const TextEditor = ({ markdownOutput = false, value, onChange }: TextEditorProps) => {
  const [markdownContent, setMarkdownContent] = useState("");

  const htmlContent = useMemo(() => markdownToHtml(value || ""), [value]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Underline,
      Typography,
      HorizontalRule,
      Placeholder.configure({
        placeholder: "Start typing your content here... Use the toolbar above to format your text.",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: htmlContent,
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      const html = editor.getHTML();
      setMarkdownContent(htmlToMarkdown(html));
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const markdown = htmlToMarkdown(html);
      setMarkdownContent(markdown);
      onChange?.(htmlToMarkdown(html));
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-md dark:prose-invert max-w-none mx-auto focus:outline-none max-h-[300px] p-3 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:before:content-none prose-blockquote:not-italic prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:p-3 prose-p:my-1 prose-h1:my-2 prose-h2:my-2 prose-h3:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-hr:my-3",
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("Enter image URL:");

    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addImageFromFile = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file && editor) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          editor.chain().focus().setImage({ src }).run();
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl || "");

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  useEffect(() => {
    if (editor && htmlContent !== undefined) {
      const currentMarkdown = htmlToMarkdown(editor.getHTML());
      const incomingMarkdown = htmlToMarkdown(htmlContent);

      if (currentMarkdown !== incomingMarkdown && !editor.isFocused) {
        editor.commands.setContent(htmlContent);
      }
    }
  }, [editor, htmlContent]);

  if (!editor) {
    return <Loader />;
  }

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader className="p-1">
          <Toolbar
            editor={editor}
            onAddImage={addImage}
            onAddImageFromFile={addImageFromFile}
            onAddLink={addLink}
            // onDownloadMarkdown={downloadMarkdown}
            isDownloadDisabled={!markdownContent}
          />
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto border-t">
            <EditorContent editor={editor} className="min-h-[200px] focus-within:outline-none" />
          </div>
        </CardContent>
      </Card>

      {markdownOutput && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Markdown Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-muted max-h-64 overflow-x-auto overflow-y-auto rounded-lg border p-4 text-sm">
                <code className="text-muted-foreground">{markdownContent || "No content yet..."}</code>
              </pre>
              <Button
                onClick={() => navigator.clipboard.writeText(markdownContent)}
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
              >
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TextEditor;

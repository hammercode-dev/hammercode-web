"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useCallback, useMemo } from "react";
import TurndownService from "turndown";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Toolbar } from "@/components/common/TextEditor";

interface TextEditorProps {
  markdownOutput?: boolean;
}

const TextEditor = ({ markdownOutput = false }: TextEditorProps) => {
  const [markdownContent, setMarkdownContent] = useState("");

  const turndownService = useMemo(() => {
    const service = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    });

    // Custom rule for underline tags
    service.addRule("underline", {
      filter: "u",
      replacement: (content) => `<u>${content}</u>`,
    });

    return service;
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Typography,
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
    content: "",
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      const html = editor.getHTML();
      setMarkdownContent(turndownService.turndown(html));
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setMarkdownContent(turndownService.turndown(html));
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none mx-auto focus:outline-none min-h-[300px] p-3 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:before:content-none prose-blockquote:not-italic prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:text-foreground",
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

  const downloadMarkdown = useCallback(() => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdownContent]);

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

  if (!editor) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
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
            onDownloadMarkdown={downloadMarkdown}
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

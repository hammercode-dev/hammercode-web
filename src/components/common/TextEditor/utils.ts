import { marked } from "marked";
import TurndownService from "turndown";
import DOMPurify from "dompurify";

const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  emDelimiter: "*",
  strongDelimiter: "**",
});

turndownService.addRule("underline", {
  filter: "u",
  replacement: (content) => `<u>${content}</u>`,
});

/**
 * Convert markdown to clean HTML compatible with Tiptap
 * @param markdown - The markdown string to convert
 * @returns Clean HTML string
 */
export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return "";

  try {
    const html = marked(markdown) as string;

    const sanitizedHtml = DOMPurify.sanitize(html as string);

    return sanitizedHtml;
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return markdown;
  }
};

/**
 * Convert HTML to clean markdown
 * @param html - The HTML string to convert
 * @returns Clean markdown string
 */
export const htmlToMarkdown = (html: string): string => {
  if (!html) return "";

  try {
    const sanitizedHtml = DOMPurify.sanitize(html as string);

    return turndownService.turndown(sanitizedHtml);
  } catch (error) {
    console.error("Error converting HTML to markdown:", error);
    return html;
  }
};

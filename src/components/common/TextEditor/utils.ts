import { marked } from "marked";
import TurndownService from "turndown";
import DOMPurify from "dompurify";

// Configure Turndown for consistent markdown output
const turndownService = new TurndownService();

// Custom rule for underline tags
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

  // If it's already HTML, sanitize and return
  if (markdown.includes("<") && markdown.includes(">")) {
    return DOMPurify.sanitize(markdown as string);
  }

  try {
    const html = marked.parse(markdown) as string;

    // Sanitize HTML with DOMPurify
    const sanitizedHtml = DOMPurify.sanitize(html as string);

    // Clean up HTML to be more compatible with Tiptap
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
    // Sanitize HTML before converting to markdown
    // const sanitizedHtml = DOMPurify.sanitize(html as string);

    return turndownService.turndown(html);
  } catch (error) {
    console.error("Error converting HTML to markdown:", error);
    return html;
  }
};

/**
 * Initialize Tiptap content from markdown
 * @param markdown - The markdown content
 * @returns HTML content ready for Tiptap editor
 */
export const initTiptapContent = (markdown: string): string => {
  return markdownToHtml(markdown);
};

/**
 * Process Tiptap content to markdown for storage
 * @param html - The HTML content from Tiptap editor
 * @returns Clean markdown for storage
 */
export const processTiptapContent = (html: string): string => {
  return htmlToMarkdown(html);
};

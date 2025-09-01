import { useState, useEffect } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

/**
 * Options for configuring MDX processing
 */
interface UseMDXOptions {
  /** Whether to parse frontmatter from the MDX content. Defaults to true */
  parseFrontmatter?: boolean;
  /** Code syntax highlighting theme. Defaults to 'github-dark' */
  theme?: string;
}

/**
 * Custom hook for processing and serializing MDX content with syntax highlighting and GitHub Flavored Markdown support
 * Converts raw MDX/Markdown content into a format that can be rendered by MDXRemote
 *
 * @param content - The raw MDX/Markdown content string to process
 * @param options - Configuration options for MDX processing
 * @returns Object containing the serialized MDX source, loading state, and any errors
 */
export const useMDX = (content: string | undefined, options: UseMDXOptions = {}) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!content) {
      setMdxSource(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    serialize(content, {
      parseFrontmatter: options.parseFrontmatter || true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: options.theme || "github-dark",
              keepBackground: false,
            },
          ],
        ],
      },
    })
      .then(setMdxSource)
      .catch((err) => {
        console.error("Error serializing MDX:", err);
        setError(err.message || "Failed to serialize MDX content");
        setMdxSource(null);
      })
      .finally(() => setIsLoading(false));
  }, [content, options.parseFrontmatter, options.theme]);

  return {
    mdxSource,
    isLoading,
    error,
  };
};

export default useMDX;

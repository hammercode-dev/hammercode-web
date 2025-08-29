import { useState, useEffect } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

interface UseMDXOptions {
  parseFrontmatter?: boolean;
  theme?: string;
}

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

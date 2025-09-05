"use client";

import { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import { Skeleton } from "@/components/ui/Skeleton";
import { useMDX } from "@/hooks/useMDX";
import { cn } from "@/lib/utils";

interface MDXContentProps {
  content?: string;
  className?: string;
  fallbackText?: string;
  showSkeleton?: boolean;
  skeletonHeight?: string;
  theme?: string;
  parseFrontmatter?: boolean;
}

const MDXContent: FC<MDXContentProps> = ({
  content,
  className,
  fallbackText,
  showSkeleton = true,
  skeletonHeight = "h-20",
  theme = "github-dark",
  parseFrontmatter = true,
}) => {
  const { mdxSource, isLoading } = useMDX(content, {
    theme,
    parseFrontmatter,
  });

  if (isLoading && showSkeleton) {
    return <Skeleton className={cn(skeletonHeight, "w-full", className)} />;
  }

  if (!mdxSource) {
    return (
      <div
        className={cn(
          "prose prose-md dark:prose-invert prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:before:content-none prose-blockquote:not-italic prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:text-foreground prose-pre:p-3 prose-p:my-1 prose-h1:my-2 prose-h2:my-2 prose-h3:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-hr:my-6 mx-auto max-w-none p-3",
          className
        )}
      >
        <p>{fallbackText || content}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "prose prose-md dark:prose-invert prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:before:content-none prose-blockquote:not-italic prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:text-foreground prose-pre:p-3 prose-p:my-1 prose-h1:my-2 prose-h2:my-2 prose-h3:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-hr:my-6 mx-auto max-w-none p-3",
        className
      )}
    >
      <MDXRemote {...mdxSource} />
    </div>
  );
};

export default MDXContent;

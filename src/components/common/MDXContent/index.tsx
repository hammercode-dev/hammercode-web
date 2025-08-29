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
      <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)}>
        <p>{fallbackText || content}</p>
      </div>
    );
  }

  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)}>
      <MDXRemote {...mdxSource} />
    </div>
  );
};

export default MDXContent;

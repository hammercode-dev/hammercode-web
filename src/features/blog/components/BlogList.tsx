import React from "react";
import BlogCard from "./BlogCard";
import { BlogPost } from "@/lib/mdx";
import { PaginationCustom } from "@/components/common/PaginationCustom";
import { Skeleton } from "@/components/ui/Skeleton";

interface BlogListProps {
  blogs: BlogPost[];
  currentPage: number;
  totalPages: number;
}

const BlogList = ({ blogs, currentPage, totalPages }: BlogListProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="grid gap-4 lg:grid-cols-4">
          <Skeleton className="h-40 w-full rounded-md lg:col-span-1" />
          <Skeleton className="h-40 w-full rounded-md lg:col-span-3" />
        </div>
      }
    >
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>

      <PaginationCustom currentPage={currentPage} totalPages={totalPages} />
    </React.Suspense>
  );
};

export default BlogList;

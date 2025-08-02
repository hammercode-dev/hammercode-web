import { BlogPage } from "@/features/blog";
import { getAllBlogs, getBlogsByCategory } from "@/lib/mdx";
import { Metadata } from "next";

interface BlogsPageProps {
  searchParams?: {
    category?: string;
    page?: string;
  };
}

export function generateMetadata(): Metadata {
  return {
    title: "Blogs",
    description: "Read our latest blog posts and articles.",
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const page = Number(searchParams?.page || 1);
  const category = searchParams?.category?.replace(/\/$/, "");

  const allBlogs = category ? await getBlogsByCategory(category) : await getAllBlogs();

  return <BlogPage allBlogs={allBlogs} sanitizedCategory={category} page={page} />;
}

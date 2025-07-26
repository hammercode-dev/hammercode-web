import { BlogPage } from "@/features/blog";
import { getAllBlogs, getBlogsByCategory } from "@/lib/mdx";
import { Metadata } from "next";

interface BlogsPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export function generateMetadata(): Metadata {
  return {
    title: "Blogs",
    description: "Read our latest blog posts and articles.",
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { page, category } = await searchParams;

  const sanitizedCategory = category?.replace(/\/$/, "");
  const allBlogs = sanitizedCategory ? await getBlogsByCategory(sanitizedCategory) : await getAllBlogs();

  return <BlogPage allBlogs={allBlogs} sanitizedCategory={sanitizedCategory} page={Number(page) || 1} />;
}

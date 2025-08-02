import { BlogPage } from "@/features/blog";
import { getAllBlogs, getBlogsByCategory } from "@/lib/mdx";
import { Metadata } from "next";

interface BlogsPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs",
    description: "Read our latest blog posts and articles.",
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const query = await searchParams;
  const page = Number(query.page || 1);
  const category = query.category?.replace(/\/$/, "");

  const allBlogs = category ? await getBlogsByCategory(category) : await getAllBlogs();

  return <BlogPage allBlogs={allBlogs} sanitizedCategory={category} page={page} />;
}

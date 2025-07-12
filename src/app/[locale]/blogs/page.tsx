import { BlogPage } from "@/features/blog";
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

  return <BlogPage category={category} page={Number(page) || 1} perPage={5} />;
}

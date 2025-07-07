import { BlogPage } from "@/features/blog";

interface BlogsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export function generateMetadata() {
  return {
    title: "Blogs",
    description: "Read our latest blog posts and articles.",
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { category } = await searchParams;

  return <BlogPage category={category} />;
}

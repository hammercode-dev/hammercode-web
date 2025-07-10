import { BlogPage } from "@/features/blog";

interface BlogsPageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}

export function generateMetadata() {
  return {
    title: "Blogs",
    description: "Read our latest blog posts and articles.",
  };
}

export default function BlogsPage({ searchParams }: BlogsPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const category = searchParams.category;

  return <BlogPage category={category} page={page} perPage={5} />;
}

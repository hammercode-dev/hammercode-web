import { getBlogBySlug } from "@/lib/mdx";
import BlogDetailPage from "@/features/blog/BlogDetailPage";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}

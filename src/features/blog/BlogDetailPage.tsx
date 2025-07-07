import Link from "next/link";
import { getBlogBySlug } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { notFound } from "next/navigation";

interface BlogDetailPageProps {
  slug: string;
}

const BlogDetailPage = async ({ slug }: BlogDetailPageProps) => {
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="container mx-auto px-5 pt-24 pb-28">
      <Link
        href={`/blogs`}
        className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <Badge>
          <ArrowLeft />
          Back to Blogs
        </Badge>
      </Link>

      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">{post.metadata.title}</h1>

        {post.metadata.tags && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          {post.metadata.author && (
            <>
              <span>By {post.metadata.author}</span>
              <span>•</span>
            </>
          )}
          {post.metadata.category && (
            <>
              <span className="capitalize">{post.metadata.category}</span>
              <span>•</span>
            </>
          )}
          <span>{new Date(post.metadata.date).toLocaleDateString()}</span>
        </div>
      </header>

      <hr className="mb-8" />
      <div className="prose prose-sm dark:prose-invert max-w-none">{post.content}</div>
    </section>
  );
};

export default BlogDetailPage;

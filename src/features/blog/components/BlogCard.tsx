import { BlogPost } from "@/lib/mdx";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Link } from "@/lib/navigation";

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${blog.slug}`} prefetch={true} className="!cursor-pointer">
      <section className="grid gap-4 lg:grid-cols-4">
        <Card
          className="hidden rounded-lg bg-cover bg-center shadow-md lg:col-span-1 lg:flex"
          style={{ backgroundImage: `url(${blog?.metadata.images})` }}
        />
        <Card className="rounded-lg bg-white shadow-md transition-shadow lg:col-span-3 dark:bg-gray-800">
          <div className="p-6">
            <h2 className="text-hmc-primary mb-2 line-clamp-2 !cursor-pointer text-xl font-bold">
              {blog.metadata.title}
            </h2>

            <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">{blog.metadata.description}</p>

            {blog.metadata.tags && (
              <div className="mb-4 flex flex-wrap gap-2">
                {blog.metadata.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full bg-blue-100 text-xs font-normal text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                {blog.metadata.author && <span>By {blog.metadata.author}</span>}
                {blog.metadata.category && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{blog.metadata.category}</span>
                  </>
                )}
              </div>
              <span>{new Date(blog.metadata.date).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>
      </section>
    </Link>
  );
};

export default BlogCard;

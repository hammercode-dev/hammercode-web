import { getAllBlogs, getBlogsByCategory } from "@/lib/mdx";
import { Link } from "@/lib/navigation";
import BlogCard from "./components/BlogCard";

const BlogPage = async ({ category }: { category?: string }) => {
  const sanitizedCategory = category?.replace(/\/$/, "");
  const blogs = sanitizedCategory ? await getBlogsByCategory(sanitizedCategory) : await getAllBlogs();
  const categories = ["technology", "tutorial", "news", "announcement"];

  return (
    <section className="container mx-auto px-5 pt-24 pb-28">
      <header className="mb-8">
        <h1 className="text-hmc-base-blue text-xl font-bold sm:text-3xl">
          {sanitizedCategory
            ? `${sanitizedCategory.charAt(0).toUpperCase() + sanitizedCategory.slice(1)} Blogs`
            : "All Blogs"}
        </h1>
        <p className="mb-4 text-xs text-gray-500 sm:text-base">
          Temukan berbagai artikel seputar teknologi, tutorial, dan berita terbaru.
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href={`/blogs`}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              !sanitizedCategory
                ? "bg-hmc-base-lightblue text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => {
            console.log(category, cat);
            return (
              <Link
                key={cat}
                href={`/blogs?category=${cat}`}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  sanitizedCategory === cat
                    ? "bg-hmc-base-lightblue text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            );
          })}
        </div>
      </header>

      {blogs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No blogs found {sanitizedCategory && `in ${sanitizedCategory} category`}.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div key={blog.slug}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default BlogPage;

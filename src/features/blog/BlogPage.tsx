import { BlogPost } from "@/lib/mdx";
import { Link } from "@/lib/navigation";
import { CategoryFilter } from "./components/CategoriesFilter";
import BlogList from "./components/BlogList";

interface BlogPageProps {
  allBlogs: BlogPost[];
  sanitizedCategory?: string;
  page?: number;
  perPage?: number;
}

const BlogPage = ({ allBlogs, sanitizedCategory, page = 1, perPage = 1 }: BlogPageProps) => {
  const totalBlogs = allBlogs.length;
  const totalPages = Math.ceil(totalBlogs / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const blogs = allBlogs.slice(startIndex, endIndex);

  const categories = ["technology", "tutorial", "news", "announcement"];

  return (
    <section className="container mx-auto px-5 pt-24 pb-28">
      <header className="my-8">
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
            prefetch={true}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              !sanitizedCategory
                ? "bg-hmc-base-lightblue text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All
          </Link>
          <CategoryFilter categories={categories} sanitizedCategory={sanitizedCategory} />
        </div>
      </header>

      {blogs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No blogs found {sanitizedCategory && `in ${sanitizedCategory} category`}.
          </p>
        </div>
      ) : (
        <BlogList blogs={blogs} currentPage={page} totalPages={totalPages} />
      )}
    </section>
  );
};

export default BlogPage;

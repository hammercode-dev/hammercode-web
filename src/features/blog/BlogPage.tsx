import { getAllBlogs, getBlogsByCategory } from "@/lib/mdx";
import { Link } from "@/lib/navigation";
import BlogCard from "./components/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/Pagination";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CategoryFilter } from "./components/CategoriesFilter";

interface BlogPageProps {
  category?: string;
  page?: number;
  perPage?: number;
}

const BlogPage = async ({ category, page = 1, perPage = 5 }: BlogPageProps) => {
  const sanitizedCategory = category?.replace(/\/$/, "");
  const allBlogs = sanitizedCategory ? await getBlogsByCategory(sanitizedCategory) : await getAllBlogs();

  const totalBlogs = allBlogs.length;
  const totalPages = Math.ceil(totalBlogs / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const blogs = allBlogs.slice(startIndex, endIndex);

  const categories = ["technology", "tutorial", "news", "announcement"];

  const generatePageUrl = (pageNum: number) => {
    const baseUrl = "/blogs";
    const params = new URLSearchParams();
    if (sanitizedCategory) params.set("category", sanitizedCategory);
    if (pageNum > 1) params.set("page", pageNum.toString());
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

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
          <CategoryFilter categories={categories} sanitizedCategory={sanitizedCategory} />
        </div>

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1}-{Math.min(endIndex, totalBlogs)} of {totalBlogs} blogs
          {totalPages > 1 && ` (Page ${page} of ${totalPages})`}
        </div>
      </header>

      {blogs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No blogs found {sanitizedCategory && `in ${sanitizedCategory} category`}.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={generatePageUrl(page - 1)}
                        className="bg-secondary text-secondary-foreground"
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === page;

                    if (pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href={generatePageUrl(pageNum)}
                            isActive={isActive}
                            className={cn({
                              [buttonVariants({
                                variant: "default",
                                className:
                                  "bg-hmc-base-blue hover:bg-hmc-base-blue text-white !shadow-none hover:text-white",
                              })]: isActive,
                              "bg-secondary text-secondary-foreground": !isActive,
                            })}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (pageNum === page - 2 || pageNum === page + 2) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return null;
                  })}

                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href={generatePageUrl(page + 1)}
                        className="bg-secondary text-secondary-foreground"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BlogPage;

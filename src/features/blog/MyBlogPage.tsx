import { BlogPost } from "@/lib/mdx";
import { useTranslations } from "next-intl";
import BlogList from "./components/BlogList";

interface MyBlogPageProps {
  myBlogs: BlogPost[];
  page?: number;
  perPage?: number;
}

const MyBlogPage = ({ myBlogs, page = 1, perPage = 1 }: MyBlogPageProps) => {
  const t = useTranslations("MyBlogPage");

  const totalBlogs = myBlogs.length;
  const totalPages = Math.ceil(totalBlogs / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const blogs = myBlogs.slice(startIndex, endIndex);

  return (
    <section className="container mx-auto px-5 pt-24 pb-28">
      <header className="my-8">
        <h1 className="text-hmc-base-blue text-xl font-bold sm:text-3xl">{t("title")}</h1>
        <p className="mb-4 text-xs text-gray-500 sm:text-base">{t("description")}</p>
      </header>
      {blogs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">{t("not-found")}</p>
        </div>
      ) : (
        <BlogList blogs={blogs} currentPage={page} totalPages={totalPages} />
      )}
    </section>
  );
};

export default MyBlogPage;

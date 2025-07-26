import { MyBlogPage } from "@/features/blog";
import { getAllBlogs } from "@/lib/mdx";

interface MyBlogsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function MyBlogsPage({ searchParams }: MyBlogsPageProps) {
  const { page } = await searchParams;
  const myBlogs = await getAllBlogs(); // TODO: get all my blogs

  return <MyBlogPage myBlogs={myBlogs} page={Number(page) || 1} />;
}

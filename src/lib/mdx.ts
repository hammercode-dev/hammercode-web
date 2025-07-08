import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const contentDirectory = path.join(process.cwd(), "src");

export interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    author?: string;
    tags?: string[];
    category?: string;
    published?: boolean;
    images?: string;
    id?: string;
  };
  content: React.ReactElement;
}

export interface ApiBlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  status: "published" | "draft";
  slug: string;
}

// Example Data
export const mockApiBlogs: ApiBlogPost[] = [];

export async function fetchBlogsFromApi(): Promise<ApiBlogPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const data = mockApiBlogs.filter((blog) => blog.status === "published");
  return data;
}

async function convertApiToBlogPost(apiBlog: ApiBlogPost): Promise<BlogPost> {
  try {
    const { content } = await compileMDX({
      source: apiBlog.content,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "github-dark",
                keepBackground: false,
              },
            ],
          ],
        },
        parseFrontmatter: true,
      },
    });

    return {
      slug: apiBlog.slug,
      metadata: {
        title: apiBlog.title,
        description: apiBlog.excerpt,
        date: apiBlog.publishedAt,
        author: apiBlog.author.name,
        tags: apiBlog.tags,
        category: apiBlog.category,
        published: apiBlog.status === "published",
        id: apiBlog.id,
      },
      content,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function getAllBlogSlugs(): string[] {
  const blogDirectory = path.join(contentDirectory, "content");

  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogDirectory);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(".mdx", ""));
}

export async function getAllBlogSlugsWithApi(): Promise<string[]> {
  const localSlugs = getAllBlogSlugs();

  try {
    const apiBlogs = await fetchBlogsFromApi();
    const apiSlugs = apiBlogs.map((blog) => blog.slug);

    return [...new Set([...localSlugs, ...apiSlugs])];
  } catch (error) {
    console.error(error);
    return localSlugs;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const localBlog = await getLocalBlogBySlug(slug);
  if (localBlog) {
    return localBlog;
  }

  try {
    const apiBlogs = await fetchBlogsFromApi();
    const apiBlog = apiBlogs.find((blog) => blog.slug === slug);

    if (apiBlog) {
      return await convertApiToBlogPost(apiBlog);
    }
  } catch (error) {
    console.error(`${slug}:`, error);
  }

  return null;
}

async function getLocalBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, "content", `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");

    const { content, frontmatter } = await compileMDX({
      source: fileContent,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "github-dark",
                keepBackground: false,
              },
            ],
          ],
        },
        parseFrontmatter: true,
      },
    });

    return {
      slug,
      metadata: {
        ...(frontmatter as BlogPost["metadata"]),
      },
      content,
    };
  } catch (error) {
    console.error(`${slug}:`, error);
    return null;
  }
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const results: BlogPost[] = [];

  const localSlugs = getAllBlogSlugs();
  for (const slug of localSlugs) {
    try {
      const post = await getLocalBlogBySlug(slug);
      if (post) {
        results.push(post);
      }
    } catch (error) {
      console.error(`${slug}:`, error);
    }
  }

  try {
    const apiBlogs = await fetchBlogsFromApi();
    for (const apiBlog of apiBlogs) {
      try {
        const convertedBlog = await convertApiToBlogPost(apiBlog);
        results.push(convertedBlog);
      } catch (error) {
        console.error(`${apiBlog.slug}:`, error);
      }
    }
  } catch (error) {
    console.error(error);
  }

  return results
    .filter((post) => post.metadata.published !== false)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}

export async function getBlogsByCategory(category: string): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter((blog) => blog.metadata.category?.toLowerCase() === category.toLowerCase());
}

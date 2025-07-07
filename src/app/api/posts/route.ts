import { NextResponse } from "next/server";

// Mock data - replace with your actual data source
const mockPosts = [
  {
    id: "1",
    title: "Building Modern Web Apps with API",
    description: "Learn how to build modern web applications using APIs and dynamic content.",
    content: `
      <h2>Introduction</h2>
      <p>This post comes from a custom API endpoint. It demonstrates how you can combine static MDX content with dynamic API content.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Dynamic content management</li>
        <li>Real-time updates</li>
        <li>Flexible data sources</li>
        <li>Content versioning</li>
      </ul>
      
      <h3>Implementation</h3>
      <p>The API endpoint provides structured data that gets seamlessly integrated with your static MDX files.</p>
      
      <blockquote>
        <p>This approach gives you the flexibility to manage content through both static files and dynamic APIs.</p>
      </blockquote>
    `,
    date: "2024-01-20T10:00:00Z",
    publishedAt: "2024-01-20T10:00:00Z",
    author: {
      name: "API Author",
    },
    tags: ["api", "web development", "next.js"],
    slug: "building-modern-web-apps-api",
  },
  {
    id: "2",
    title: "Content Management with APIs",
    description: "Understanding how to manage content through API endpoints.",
    content: `
      <h2>API-First Content Strategy</h2>
      <p>An API-first approach to content management provides several advantages:</p>
      
      <h3>Advantages</h3>
      <ol>
        <li><strong>Scalability:</strong> Easy to scale content across multiple platforms</li>
        <li><strong>Flexibility:</strong> Content can be updated without redeployment</li>
        <li><strong>Integration:</strong> Easy integration with headless CMS systems</li>
      </ol>
      
      <h3>Use Cases</h3>
      <p>Perfect for:</p>
      <ul>
        <li>News and blog platforms</li>
        <li>E-commerce product catalogs</li>
        <li>Documentation sites</li>
        <li>Multi-language content</li>
      </ul>
      
      <p>This post demonstrates how API content can be seamlessly integrated with your static MDX content.</p>
    `,
    date: "2024-01-18T14:30:00Z",
    publishedAt: "2024-01-18T14:30:00Z",
    author: {
      name: "Content Manager",
    },
    tags: ["cms", "api", "content management"],
    slug: "content-management-apis",
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      posts: mockPosts,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        posts: [],
        success: false,
        message: "Failed to fetch posts",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and content are required",
        },
        { status: 400 }
      );
    }

    const newPost = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || body.content.substring(0, 150) + "...",
      content: body.content,
      date: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      author: {
        name: body.author || "Anonymous",
      },
      tags: body.tags || [],
      slug: body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    };

    return NextResponse.json({
      post: newPost,
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create post",
        error,
      },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import BlogClient from "./BlogClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: 'Manage Blogs | KhasCom Admin',
});

export default async function AdminBlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Blog & Content</h1>
        <p className="text-stone-500 text-sm mt-1">Manage your website&apos;s blog posts here.</p>
      </div>

      <BlogClient initialPosts={posts} />
    </div>
  );
}

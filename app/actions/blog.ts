"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBlogPost(data: { title: string; content: string; excerpt: string }) {
  try {
    // 1. Ensure at least one user exists for the authorId constraint
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Admin",
          email: "admin@khascom.com",
          passwordHash: "dummy",
          role: "SuperAdmin"
        }
      });
    }

    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: slug,
        content: data.content,
        excerpt: data.excerpt,
        status: "Published",
        publishAt: new Date(),
        authorId: user.id,
      }
    });

    revalidatePath("/blog");
    return { success: true, post };
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

"use client";

import { useState } from "react";
import { createBlogPost, deleteBlogPost } from "@/app/actions/blog";

export default function BlogClient({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await createBlogPost({ title, excerpt, content });
    if (res.success) {
      setPosts([res.post, ...posts]);
      setIsAdding(false);
      setTitle("");
      setExcerpt("");
      setContent("");
    } else {
      alert("Failed to create blog: " + res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const res = await deleteBlogPost(id);
    if (res.success) {
      setPosts(posts.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-stone-200">
        <h2 className="text-xl font-bold text-stone-800">Manage Blogs</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#14532D] text-white px-4 py-2 rounded-md hover:bg-[#0f4022] transition-colors"
        >
          {isAdding ? "Cancel" : "Add New Blog"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 space-y-4">
          <h3 className="font-bold text-lg mb-4">Create New Blog Post</h3>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
            <input 
              required
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-stone-300 rounded-md p-2 focus:ring-[#14532D] focus:border-[#14532D]"
              placeholder="e.g. Benefits of Organic Farming"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Short Excerpt (Intro)</label>
            <textarea 
              required
              value={excerpt} 
              onChange={e => setExcerpt(e.target.value)}
              className="w-full border border-stone-300 rounded-md p-2 h-20 focus:ring-[#14532D] focus:border-[#14532D]"
              placeholder="A brief summary of the blog..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Full Content</label>
            <textarea 
              required
              value={content} 
              onChange={e => setContent(e.target.value)}
              className="w-full border border-stone-300 rounded-md p-2 h-40 focus:ring-[#14532D] focus:border-[#14532D]"
              placeholder="Write your full blog post here..."
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#C8A14A] text-white px-6 py-2 rounded-md hover:bg-[#b08d3f] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-stone-900">Title</th>
              <th className="px-6 py-4 font-semibold text-stone-900">Date Published</th>
              <th className="px-6 py-4 font-semibold text-stone-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-stone-500">No blog posts found.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{post.title}</td>
                  <td className="px-6 py-4">{new Date(post.publishAt || post.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

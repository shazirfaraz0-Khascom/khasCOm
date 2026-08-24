import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Blog & Market Insights',
  path: '/blog',
  description: 'Latest news, market insights, and updates from the global agricultural trade industry.',
});

export const revalidate = 3600;

export default async function BlogIndexPage() {
  let posts: any[] = [];
  let categories: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { status: 'Published' },
      orderBy: { publishAt: 'desc' },
      include: { category: true, author: true },
    });

    categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="flex-1 bg-stone-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Market Insights & News</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in international trade, agricultural seasons, and company news.
          </p>
        </div>

        {/* Categories Nav */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Link href="/blog" className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium">All Posts</Link>
            {categories.map(cat => (
              <Link key={cat.id} href={`/blog/category/${cat.slug}`} className="px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-primary hover:text-primary transition-colors text-sm font-medium">
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col hover:shadow-xl transition-all">
              <Link href={`/blog/${post.slug}`} className="aspect-[16/9] bg-stone-200 relative overflow-hidden block">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm">Image: {post.title}</div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                {post.category && (
                  <Link href={`/blog/category/${post.category.slug}`} className="text-xs font-semibold uppercase tracking-wider text-primary mb-3 inline-block">
                    {post.category.name}
                  </Link>
                )}
                <Link href={`/blog/${post.slug}`} className="block mb-3">
                  <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                </Link>
                <p className="text-stone-600 text-sm line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-100 mt-auto">
                  <span>{post.publishAt ? new Date(post.publishAt).toLocaleDateString() : ''}</span>
                  <span>{post.author.name}</span>
                </div>
              </div>
            </article>
          ))}
          
          {posts.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-stone-300 text-stone-500">
              No blog posts published yet. Check back soon for updates.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

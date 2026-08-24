import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({ where: { status: 'Published' }, select: { slug: true } });
    return posts.map((p) => ({
      post: p.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: resolvedParams.post },
    });
    if (post) {
      return constructMetadata({
        title: post.seoTitle || `${post.title}`,
        description: post.seoMeta || post.excerpt || `Read ${post.title} on KhasCom blog.`,
      });
    }
  } catch (e) {
    console.error(e);
  }
  return constructMetadata({ title: 'Not Found' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ post: string }> }) {
  const resolvedParams = await params;
  let post: any = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: resolvedParams.post },
      include: { category: true, author: true },
    });
  } catch (e) {
    console.error(e);
  }

  if (!post || post.status !== 'Published') {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.publishAt?.toISOString(),
  };

  return (
    <article className="flex-1 bg-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Header */}
      <header className="bg-stone-50 min-h-[100svh] flex flex-col justify-center border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          {post.category && (
            <Link href={`/blog/category/${post.category.slug}`} className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 inline-block">
              {post.category.name}
            </Link>
          )}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center text-sm text-stone-500 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-600">
                {post.author.name.charAt(0)}
              </div>
              <span>{post.author.name}</span>
            </div>
            <span>•</span>
            <time dateTime={post.publishAt?.toISOString()}>{post.publishAt ? new Date(post.publishAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</time>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 max-w-3xl mt-12">
        <div className="aspect-[21/9] bg-stone-200 rounded-2xl overflow-hidden relative mb-12">
          <div className="absolute inset-0 flex items-center justify-center text-stone-400">Featured Image Placeholder</div>
        </div>
        
        <div className="prose prose-stone prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
      </div>
    </article>
  );
}

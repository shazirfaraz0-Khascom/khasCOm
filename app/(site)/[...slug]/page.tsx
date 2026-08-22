import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  try {
    const page = await prisma.staticPage.findUnique({
      where: { slug: slugPath },
    });
    
    if (page) {
      return constructMetadata({
        title: `${page.title} | KhasCom`,
      });
    }
  } catch (e) {
    console.error(e);
  }
  return constructMetadata({ title: 'Not Found' });
}

// Map section types to components
function BannerSection({ data }: { data: any }) {
  return (
    <div className="bg-primary text-white min-h-[100svh] flex flex-col justify-center relative overflow-hidden">
      {data.backgroundImage && (
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{ backgroundImage: `url(${data.backgroundImage})` }} />
      )}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">{data.heading}</h1>
        {data.subheading && <p className="text-xl max-w-2xl mx-auto text-primary-foreground/90">{data.subheading}</p>}
      </div>
    </div>
  );
}

function TextBlockSection({ data }: { data: any }) {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {data.heading && <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6 text-center">{data.heading}</h2>}
        <div className="prose prose-stone prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </div>
  );
}

function CTASection({ data }: { data: any }) {
  return (
    <div className="py-20 bg-stone-100 text-center">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">{data.heading}</h2>
        <p className="text-lg text-stone-600 mb-8">{data.content}</p>
        <Link href={data.buttonLink || '/contact-us'} className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground px-8 py-3 text-base font-semibold shadow hover:bg-accent/90 transition-colors">
          {data.buttonText || 'Contact Us'}
        </Link>
      </div>
    </div>
  );
}

export default async function StaticPageTemplate({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  
  // Exclude hardcoded routes that have their own folders from hitting this catch-all
  // Though Next.js should handle this, it's good to be safe.
  if (slugPath.startsWith('import') || slugPath.startsWith('export') || slugPath.startsWith('blog') || slugPath.startsWith('contact-us')) {
    notFound();
  }

  let page: any = null;
  try {
    page = await prisma.staticPage.findUnique({
      where: { slug: slugPath },
    });
  } catch (e) {
    console.error(e);
  }

  if (!page) {
    // Return a generic layout for the specified structural pages if they are not in the DB yet,
    // so the build doesn't fail for missing seeded static pages.
    const validPlaceholders = [
      'about-us', 'about-us/our-story', 'about-us/why-choose-us', 'about-us/global-network', 'about-us/certifications',
      'quality-logistics', 'quality-logistics/quality-control', 'quality-logistics/cold-chain-packaging', 'quality-logistics/freight-capability', 'quality-logistics/documentation-customs',
      'privacy-policy', 'terms-conditions', 'faqs'
    ];
    
    if (validPlaceholders.includes(slugPath)) {
      return (
        <div className="flex-1 bg-stone-50 py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6 capitalize">{slugPath.replace(/-/g, ' ').split('/').pop()}</h1>
            <p className="text-lg text-stone-500 border border-dashed border-stone-300 p-12 rounded-xl bg-white">
              [EDIT COPY] Content for this page will be managed via the Admin Panel Static Page Builder.
            </p>
          </div>
        </div>
      );
    }
    
    notFound();
  }

  let sections: any[] = [];
  try {
    const parsed = typeof page.sections === 'string' ? JSON.parse(page.sections) : page.sections;
    sections = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse sections", e);
  }

  return (
    <div className="flex-1">
      {sections.length > 0 ? (
        sections.map((section: any, idx: number) => {
          switch (section.type) {
            case 'Banner': return <BannerSection key={idx} data={section.data} />;
            case 'TextBlock': return <TextBlockSection key={idx} data={section.data} />;
            case 'CTA': return <CTASection key={idx} data={section.data} />;
            default: return null;
          }
        })
      ) : (
        <div className="py-20 text-center text-stone-500">No sections defined for this page.</div>
      )}
    </div>
  );
}

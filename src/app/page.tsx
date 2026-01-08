import Link from "next/link";
import { getArticles, Category } from "@/lib/store";
import ImageCarousel from "@/components/ImageCarousel";
import { PenTool } from "lucide-react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

const CATEGORIES: Category[] = ['Politics', 'Economy', 'Society', 'Culture', 'Science', 'Medical', 'Essay', 'Portfolio (Art)', 'Portfolio (Architecture)'];

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams.category;

  const allArticles = await getArticles();
  let articles = allArticles.filter(a => a.status === 'approved');

  if (selectedCategory && CATEGORIES.includes(selectedCategory as Category)) {
    articles = articles.filter(a => a.category === selectedCategory);
  }

  // Sort by newest first
  articles.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="-mt-8">
      {/*
        Negative margin to offset the main padding because we want the carousel
        to be full width relative to the container, or we need to adjust layout.
        Actually, the layout has max-w-4xl. To make full width carousel,
        we should move it out of the layout or use a portal, but for now
        we can just make it fit the container or stretch it.
        Let's keep it inside the container but style it nicely.
        WAIT, user said "Home Page... screen 1/3".
        It looks better if full width.
        I will modify the layout to allow full width for home page?
        Or just put it in the container for now.
        Let's try to make it look good within the container first,
        or use `w-screen` and negative margins to break out.
      */}

      <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] mb-12">
        <ImageCarousel />
      </div>

      <header className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-beige-900 tracking-tight">
          Voices of the Era v3.2
        </h1>
        <p className="text-lg text-beige-900/60 max-w-2xl mx-auto">
          A collection of curated essays, articles, and perspectives on the world around us.
        </p>
      </header>

      {/* Submission CTA Section */}
      <section className="mb-16 bg-white border border-beige-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-1">
          <h2 className="text-2xl font-serif font-bold text-beige-900 mb-2">Have a Voice?</h2>
          <p className="text-beige-900/70">
            Share your insights on politics, economy, culture, and more.
            Your essay could spark the next big conversation.
          </p>
        </div>
        <Link
          href="/submit"
          className="shrink-0 flex items-center gap-2 px-8 py-4 bg-beige-900 text-beige-50 font-medium rounded-lg hover:bg-beige-900/90 transition-all transform hover:-translate-y-1 shadow-md"
        >
          <PenTool size={20} />
          Submit Article
        </Link>
      </section>

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-beige-200 pb-6 sticky top-16 bg-beige-50/95 backdrop-blur z-40 py-4">
        <Link
          href="/"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${!selectedCategory
              ? 'bg-beige-900 text-beige-50 shadow-md'
              : 'bg-white text-beige-900/70 hover:bg-beige-200'}`}
        >
          All
        </Link>
        {CATEGORIES.map(cat => (
          <Link
            key={cat}
            href={`/?category=${cat}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${selectedCategory === cat
                ? 'bg-amber-800 text-beige-50 shadow-md'
                : 'bg-white text-beige-900/70 hover:bg-beige-200'}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {articles.length === 0 ? (
          <div className="col-span-full text-center py-20 text-beige-900/50 italic">
            No articles found in this category.
          </div>
        ) : (
          articles.map(article => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="group block bg-white rounded-xl shadow-sm border border-beige-200 hover:shadow-md hover:border-amber-300 transition-all duration-300 overflow-hidden"
            >
              {article.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden bg-beige-100 border-b border-beige-100">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold tracking-wider uppercase text-amber-800 bg-amber-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-beige-900/40">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-beige-900 mb-3 group-hover:text-amber-800 transition-colors">
                  {article.title}
                </h2>
                <p className="text-beige-900/70 line-clamp-3 mb-4 leading-relaxed">
                  {article.content}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-beige-900/50">
                  <span>By {article.author}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

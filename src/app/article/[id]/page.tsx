import { getArticles } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
    params: { id: string };
}

async function getArticle(id: string) {
    try {
        const articles = await getArticles();
        return articles.find(a => a.id === id);
    } catch (e) {
        console.error(e);
        return null; // Or throw to let Error Boundary handle it, but for now we want to inspect
    }
}

export default async function ArticlePage({ params }: PageProps) {
    // Debugging: let's see why it's failing
    let article;
    let errorMsg = '';

    try {
        article = await getArticle(params.id);
    } catch (e: any) {
        errorMsg = e.message || JSON.stringify(e);
    }

    if (!article) {
        return (
            <div className="text-center py-20 px-4">
                <h2 className="text-2xl font-bold text-beige-900 mb-4">Article not found</h2>
                {errorMsg && (
                    <div className="mb-4 text-red-500 bg-red-50 p-4 rounded text-left overflow-auto max-w-lg mx-auto">
                        <p className="font-bold">Error Details:</p>
                        <pre className="text-xs whitespace-pre-wrap">{errorMsg}</pre>
                    </div>
                )}
                <p className="text-beige-900/60 mb-8">
                    Possible reasons:
                    <ul className="list-disc list-inside mt-2 text-sm">
                        <li>Database connection failed (Check Environment Variables)</li>
                        <li>Table does not interact (Check if Query was run)</li>
                        <li>Article ID is wrong</li>
                    </ul>
                </p>
                <Link href="/" className="text-amber-800 hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <article className="max-w-2xl mx-auto pt-8">
            <Link
                href="/"
                className="inline-flex items-center text-sm text-beige-900/50 hover:text-amber-800 mb-8 transition-colors group"
            >
                <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to articles
            </Link>

            <header className="mb-12 text-center">
                <div className="flex justify-center mb-6">
                    <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold tracking-widest uppercase rounded-full">
                        {article.category}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-beige-900 mb-6 leading-tight">
                    {article.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-beige-900/60 text-sm mb-8">
                    <span className="font-medium text-beige-900">{article.author}</span>
                    <span>•</span>
                    <span>{new Date(article.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>

                {/* Article Cover Image */}
                {article.imageUrl && (
                    <div className="relative w-full h-[50vh] mb-12 rounded-xl overflow-hidden shadow-sm">
                        {/* Since we don't know the domain of user provided URLs, we might need unoptimized or config. 
                        For prototype, we'll try unoptimized if external. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </header>

            <div className="prose prose-stone prose-lg max-w-none text-beige-900/80 leading-loose whitespace-pre-wrap font-serif">
                {article.content}
            </div>

            <hr className="my-16 border-beige-200" />

            {/* Footer / Read More area could go here */}
        </article>
    );
}

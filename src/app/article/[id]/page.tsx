import { getArticleById } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ArticlePage(props: PageProps) {
    const params = await props.params;

    let article;
    let errorMsg = '';

    try {
        article = await getArticleById(params.id);
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
        errorMsg = errorMessage;
        console.error("Error fetching article:", e);
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
                <div className="border-b border-beige-200 pb-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-sm font-bold tracking-wider uppercase text-amber-800 bg-amber-50 px-3 py-1 rounded">
                            {article.category}
                        </span>
                        <span className="text-sm text-beige-900/60">
                            {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-beige-900 mb-6 leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-3 text-beige-900/60 font-medium">
                        <div className="w-10 h-10 rounded-full bg-beige-200 flex items-center justify-center text-lg font-serif">
                            {article.author[0]}
                        </div>
                        <span>By {article.author}</span>
                    </div>
                </div>

                {article.imageUrl && (
                    <div className="relative w-full h-auto max-h-[600px] mb-10 rounded-xl overflow-hidden border border-beige-200 bg-beige-50">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain max-h-[600px]"
                            priority
                        />
                    </div>
                )}
            </header>

            <div className="prose prose-stone prose-lg max-w-none text-beige-900/80 leading-loose whitespace-pre-wrap font-serif">
                {article.content}
            </div>

            <hr className="my-16 border-beige-200" />
        </article>
    );
}

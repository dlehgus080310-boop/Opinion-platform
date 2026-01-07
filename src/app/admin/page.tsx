import { getArticles } from "@/lib/store";
import { approveArticle, rejectArticle, deleteArticle } from "@/app/actions";
import { Check, X, Trash2 } from "lucide-react";

// ... (keep rest of top content)

// Inside the map loop, we are looking for where the buttons are.
// The user wants ability to delete articles.
// The current UI shows buttons only for 'pending'.
// We should probably allow deleting ANY article (approved/rejected/pending).
// So let's move the delete button outside the 'pending' check, or duplicate it?
// Usually Admins want to delete anything. Let's add it for all statuses.

// Wait, the previous code had a specific block for 'pending'. 
// I will place the Delete button *after* the status-specific actions, valid for all.

// Let's replace the whole card content to rearrange or just append the delete button.
// To be safe and clean, let's look at lines 45-73 which is the pending block.
// I will insert the delete form AFTER that block.

{
    article.status === 'pending' && (
        <div className="flex gap-2 shrink-0">
            <form action={async () => {
                'use server';
                await approveArticle(article.id);
            }}>
                <button
                    type="submit"
                    className="p-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-full transition-colors border border-green-200"
                    title="Approve"
                >
                    <Check size={20} />
                </button>
            </form>

            <form action={async () => {
                'use server';
                await rejectArticle(article.id);
            }}>
                <button
                    type="submit"
                    className="p-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-full transition-colors border border-red-200"
                    title="Reject"
                >
                    <X size={20} />
                </button>
            </form>
        </div>
    )
}

{/* Delete Button for ALL statuses */ }
<div className="ml-2 pl-2 border-l border-beige-200 shrink-0">
    <form action={async () => {
        'use server';
        await deleteArticle(article.id);
    }}>
        <button
            type="submit"
            className="p-2 bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors border border-gray-200 group"
            title="Delete Permanently"
        >
            <Trash2 size={20} className="group-hover:stroke-red-600" />
        </button>
    </form>
</div>

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const allArticles = await getArticles();
    const articles = allArticles.sort((a, b) => b.createdAt - a.createdAt);

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold text-beige-900 mb-8">Admin Dashboard</h1>

            <div className="space-y-4">
                {articles.length === 0 ? (
                    <p className="text-beige-900/60 italic">No articles submitted yet.</p>
                ) : (
                    articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white p-6 rounded-xl shadow-sm border border-beige-200 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold tracking-wide uppercase
                    ${article.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                            article.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'}`}
                                    >
                                        {article.status}
                                    </span>
                                    <span className="text-xs text-beige-900/50">
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="text-xs font-medium text-beige-900/70 border border-beige-200 px-2 rounded-full">
                                        {article.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-beige-900 mb-1">{article.title}</h3>
                                <p className="text-sm text-beige-900/70 mb-2">By {article.author}</p>
                                <p className="text-sm text-beige-900/60 line-clamp-2">{article.content}</p>
                            </div>

                            {article.status === 'pending' && (
                                <div className="flex gap-2 shrink-0">
                                    <form action={async () => {
                                        'use server';
                                        await approveArticle(article.id);
                                    }}>
                                        <button
                                            type="submit"
                                            className="p-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-full transition-colors border border-green-200"
                                            title="Approve"
                                        >
                                            <Check size={20} />
                                        </button>
                                    </form>

                                    <form action={async () => {
                                        'use server';
                                        await rejectArticle(article.id);
                                    }}>
                                        <button
                                            type="submit"
                                            className="p-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-full transition-colors border border-red-200"
                                            title="Reject"
                                        >
                                            <X size={20} />
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

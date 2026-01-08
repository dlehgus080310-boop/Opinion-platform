import { getArticles } from "@/lib/store";
import { approveArticle, rejectArticle, deleteArticle, logoutAdmin } from "@/app/actions";
import { Check, X, Trash2, Edit2, LogOut } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('admin_session');

    if (!isAdmin) {
        redirect('/admin/login');
    }

    const allArticles = await getArticles();
    const articles = allArticles.sort((a, b) => b.createdAt - a.createdAt);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-beige-900">Admin Dashboard</h1>
                <form action={logoutAdmin}>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 bg-beige-200 text-beige-900 rounded-lg hover:bg-beige-300 transition-colors text-sm font-medium"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </form>
            </div>

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

                            <div className="flex items-center gap-3 shrink-0 mt-4 md:mt-0">
                                {article.status === 'pending' && (
                                    <>
                                        <form action={async () => {
                                            'use server';
                                            await approveArticle(article.id);
                                        }}>
                                            <button
                                                type="submit"
                                                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
                                                title="Approve Article"
                                            >
                                                <Check size={16} />
                                                Approve
                                            </button>
                                        </form>

                                        <form action={async () => {
                                            'use server';
                                            await rejectArticle(article.id);
                                        }}>
                                            <button
                                                type="submit"
                                                className="flex items-center gap-1 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                                                title="Reject Article"
                                            >
                                                <X size={16} />
                                                Reject
                                            </button>
                                        </form>
                                    </>
                                )}

                                <form action={async () => {
                                    'use server';
                                    await deleteArticle(article.id);
                                }}>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-1 px-3 py-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                                        title="Delete Permanently"
                                    >
                                        <Trash2 size={16} />
                                        <span>Delete</span>
                                    </button>
                                </form>

                                <Link
                                    href={`/admin/edit/${article.id}`}
                                    className="flex items-center gap-1 px-3 py-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-sm"
                                    title="Edit Article"
                                >
                                    <Edit2 size={16} />
                                    <span>Edit</span>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

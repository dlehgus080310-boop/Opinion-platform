import { getArticleById } from "@/lib/store";
import { editArticle } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPage(props: PageProps) {
    const params = await props.params; // Await params for Next.js 15
    const article = await getArticleById(params.id);

    if (!article) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Article not found</h1>
                <Link href="/admin" className="text-blue-500 hover:underline">Back to Admin</Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link
                href="/admin"
                className="inline-flex items-center text-sm text-beige-900/50 hover:text-amber-800 mb-8 transition-colors group"
            >
                <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-serif font-bold text-beige-900 mb-8">Edit Article</h1>

            <form action={editArticle} className="space-y-6 bg-white/50 p-8 rounded-xl shadow-sm border border-beige-200">
                <input type="hidden" name="id" value={article.id} />
                <input type="hidden" name="keepImage" value="true" />

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-beige-900 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        defaultValue={article.title}
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50"
                    />
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-beige-900 mb-2">
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        required
                        defaultValue={article.author}
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-beige-900 mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        required
                        defaultValue={article.category}
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50"
                    >
                        <option value="">Select a category...</option>
                        <option value="Politics">Politics</option>
                        <option value="Economy">Economy</option>
                        <option value="Society">Society</option>
                        <option value="Culture">Culture</option>
                        <option value="Medical">Medical</option>
                        <option value="Essay">Essay</option>
                        <option value="Portfolio (Art)">Portfolio (Art)</option>
                        <option value="Portfolio (Architecture)">Portfolio (Architecture)</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="imageFile" className="block text-sm font-medium text-beige-900 mb-2">
                        Cover Image
                    </label>
                    {article.imageUrl && (
                        <div className="mb-3 p-3 bg-beige-50 rounded-lg border border-beige-200">
                            <div className="flex items-center gap-2 mb-2 text-xs text-green-600 font-medium">
                                ✓ Current image set
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="deleteImage"
                                    name="deleteImage"
                                    value="true"
                                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <label htmlFor="deleteImage" className="text-sm text-red-600">
                                    Remove this image
                                </label>
                            </div>
                        </div>
                    )}
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*"
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50"
                    />
                    <p className="text-xs text-beige-900/50 mt-1">Upload new to replace, or check box above to delete.</p>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-beige-900 mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows={12}
                        defaultValue={article.content}
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50 resize-y"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Link href="/admin" className="flex-1 py-3 px-6 bg-white border border-beige-200 text-beige-900 font-medium rounded-lg hover:bg-beige-50 transition-colors text-center">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-amber-800 text-beige-50 font-medium rounded-lg hover:bg-amber-900 transition-colors shadow-sm"
                    >
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

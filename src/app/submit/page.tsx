import { submitArticle } from "@/app/actions";
import { ArticleEditor } from "@/components/ArticleEditor";

export default function SubmitPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-beige-900 mb-8">Submit an Article</h1>

            <form action={submitArticle} className="space-y-6 bg-white/50 p-8 rounded-xl shadow-sm border border-beige-200">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-beige-900 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50"
                        placeholder="Enter article title"
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
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50"
                        placeholder="Your name"
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
                        Cover Image (Upload)
                    </label>
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*"
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50"
                    />
                    <p className="text-xs text-beige-900/50 mt-1">For Portfolios, an image is recommended.</p>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-beige-900 mb-2">
                        Content (Optional for Portfolio)
                    </label>
                    <ArticleEditor
                        id="content"
                        name="content"
                        rows={12}
                        className="w-full px-4 py-2 rounded-lg border border-beige-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50 resize-y font-mono text-sm leading-relaxed"
                        placeholder="Write your article here... (Tab key is supported)"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-beige-900 text-beige-50 font-medium rounded-lg hover:bg-beige-900/90 transition-colors shadow-sm"
                >
                    Submit for Review
                </button>
            </form>
        </div>
    );
}

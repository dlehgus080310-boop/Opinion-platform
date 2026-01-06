import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="max-w-md mx-auto text-center py-20">
            <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-600/80" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-beige-900 mb-4">Submission Received</h1>
            <p className="text-beige-900/70 mb-8">
                Thank you for your contribution. Your article has been submitted for review.
                Once approved by an administrator, it will be published on the platform.
            </p>

            <div className="flex justify-center gap-4">
                <Link
                    href="/"
                    className="px-6 py-2 bg-white border border-beige-200 rounded-lg hover:border-amber-300 transition-colors"
                >
                    Back to Home
                </Link>
                <Link
                    href="/submit"
                    className="px-6 py-2 bg-beige-900 text-beige-50 rounded-lg hover:bg-beige-900/90 transition-colors"
                >
                    Submit Another
                </Link>
            </div>
        </div>
    );
}

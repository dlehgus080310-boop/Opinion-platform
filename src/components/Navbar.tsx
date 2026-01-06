import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full border-b border-beige-200 bg-beige-50/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-serif font-bold tracking-tight">
                    Opinion.
                </Link>

                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="hover:text-amber-700 transition-colors">
                        Read
                    </Link>
                    <Link href="/submit" className="hover:text-amber-700 transition-colors">
                        Submit
                    </Link>
                    <Link href="/plagiarism-check" className="hover:text-amber-700 transition-colors">
                        Check Plagiarism
                    </Link>
                    <Link href="/admin" className="text-xs text-beige-900/50 hover:text-amber-700 transition-colors">
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
}

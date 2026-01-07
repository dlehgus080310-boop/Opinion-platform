import { loginAdmin } from "@/app/actions";

export default function AdminLoginPage({
    searchParams,
}: {
    searchParams?: { error?: string };
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-beige-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border border-beige-200">
                <h1 className="text-2xl font-serif font-bold text-center text-beige-900 mb-6">
                    Admin Access
                </h1>
                {searchParams?.error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                        {searchParams.error}
                    </div>
                )}
                <form action={loginAdmin} className="space-y-4">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-beige-900/70 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-beige-200 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-colors bg-white text-gray-900"
                            placeholder="Enter admin password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-amber-800 text-beige-50 font-bold rounded-lg hover:bg-amber-900 transition-colors shadow-sm"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

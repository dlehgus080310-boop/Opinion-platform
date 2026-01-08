import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
  let articles;
  let errorMsg = null;

  try {
    articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error: any) {
    console.error("Debug Page Error:", error);
    errorMsg = error.message || "Unknown database error";
    articles = [];
  }

  if (errorMsg) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Database Error</h1>
        <pre className="bg-red-50 p-4 rounded overflow-auto border border-red-200 text-red-800">
          {errorMsg}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Database Debugger</h1>
      
      <div className="bg-green-50 p-4 rounded mb-8 border border-green-200">
            <p className="font-bold text-green-800">✅ Database Connection Success</p>
            <p>If you see this, Prisma is working correctly.</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Current Articles ({articles!.length})</h2>
      
      {articles!.length === 0 ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
              No articles found. Please go to <Link href="/submit" className="underline font-bold">Submit Page</Link> to create one.
          </div>
      ) : (
          <div className="space-y-4">
              {articles!.map(article => (
                  <div key={article.id} className="border p-4 rounded shadow-sm bg-white">
                      <p><strong>ID:</strong> <code className="bg-gray-100 px-1 rounded select-all">{article.id}</code></p>
                      <p><strong>Title:</strong> {article.title}</p>
                      <p><strong>Status:</strong> {article.status}</p>
                      <div className="mt-2 flex gap-2">
                          <Link href={`/article/${article.id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                              View Article
                          </Link>
                          <Link href="/admin" className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                              Go to Admin
                          </Link>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
}

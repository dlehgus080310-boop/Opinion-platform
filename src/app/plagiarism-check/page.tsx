'use client';

import { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

export default function PlagiarismCheckPage() {
    const [text, setText] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [result, setResult] = useState<{ score: number; clean: boolean } | null>(null);

    const handleCheck = () => {
        if (!text.trim()) return;

        setIsChecking(true);
        setResult(null);

        // Mock analysis delay
        setTimeout(() => {
            // Mock result logic
            const score = Math.floor(Math.random() * 20); // Mostly clean results for demo
            setIsChecking(false);
            setResult({
                score: score,
                clean: score < 15
            });
        }, 2000);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-serif font-bold text-beige-900 mb-4 flex items-center justify-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-amber-800" />
                    Plagiarism Checker
                </h1>
                <p className="text-beige-900/60">
                    Verify the originality of your essays and papers before submission.
                    <br />
                    (This is a demo tool for the prototype)
                </p>
            </header>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-beige-200">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your text here to check for plagiarism..."
                    className="w-full h-64 p-4 rounded-lg border border-beige-200 bg-beige-50/30 focus:outline-none focus:ring-2 focus:ring-amber-200/50 resize-y mb-6 font-serif text-beige-900/80"
                />

                <div className="flex items-center justify-between">
                    <div className="text-xs text-beige-900/40">
                        {text.length} characters
                    </div>
                    <button
                        onClick={handleCheck}
                        disabled={isChecking || !text.trim()}
                        className="flex items-center gap-2 px-8 py-3 bg-amber-800 text-beige-50 font-medium rounded-lg hover:bg-amber-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isChecking ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Scanning Databases...
                            </>
                        ) : (
                            'Check Originality'
                        )}
                    </button>
                </div>
            </div>

            {result && (
                <div className={`mt-8 p-6 rounded-xl border ${result.clean ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                    <div className="flex items-start gap-4">
                        {result.clean ? (
                            <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
                        ) : (
                            <AlertTriangle className="w-8 h-8 text-red-600 shrink-0" />
                        )}
                        <div>
                            <h3 className={`text-lg font-bold mb-1 ${result.clean ? 'text-green-800' : 'text-red-800'}`}>
                                {result.clean ? 'Content is Original' : 'Potential Plagiarism Detected'}
                            </h3>
                            <p className={`text-sm mb-2 ${result.clean ? 'text-green-700' : 'text-red-700'}`}>
                                Similarity Score: <strong>{result.score}%</strong>
                            </p>
                            <p className="text-sm opacity-80">
                                {result.clean
                                    ? "We didn't find any significant matches in our database. You are good to go!"
                                    : "We found some matching text. Please review your citations."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

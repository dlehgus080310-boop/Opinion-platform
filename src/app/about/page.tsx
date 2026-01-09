import Image from "next/image";

export const metadata = {
    title: "About the Founder | Opinion Platform",
    description: "The mission and story behind Better World Maker.",
};

export default function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Section */}
            <section className="text-center space-y-6">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-beige-200 shadow-xl">
                    {/* Placeholder for Founder's Image - User can replace this later */}
                    <div className="w-full h-full bg-beige-300 flex items-center justify-center text-beige-900/40 text-xs font-serif italic">
                        Founder Photo
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-beige-900">Do Hyun Lee</h1>
                    <p className="text-amber-800 font-medium tracking-wide uppercase text-sm mt-2">Founder & Editor-in-Chief</p>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-beige-200">
                <h2 className="text-xl font-serif font-bold text-beige-900 mb-4">Mission Statement</h2>
                <blockquote className="text-lg text-beige-900/80 italic leading-relaxed border-l-4 border-amber-800 pl-4">
                    "To bridge the gap between academic theories and real-world social issues, creating a platform where intellectual curiosity meets social responsibility."
                </blockquote>
            </section>

            {/* Narrative Section */}
            <section className="space-y-6 text-beige-900/80 leading-relaxed text-lg">
                <p>
                    Welcome to <span className="font-bold text-beige-900">Better World Maker</span>.
                </p>
                <p>
                    I established this platform as a space to apply the rigorous analytical frameworks of
                    <span className="font-semibold text-amber-800 mx-1">AP Macroeconomics</span> and
                    <span className="font-semibold text-amber-800 mx-1">Political Science</span>
                    to the complex realities of our global society.
                </p>
                <p>
                    My journey as a global citizen—from witnessing economic disparities in Southeast Asia to
                    engaging in model UN debates—has taught me that awareness is only the first step.
                    True change begins when we articulate our understanding and share it with a community
                    of critical thinkers.
                </p>
                <p>
                    Here, you will find not just essays, but <span className="font-bold text-beige-900">research-driven perspectives</span>
                    on everything from market dynamics to cultural shifts. This is my portfolio of thought,
                    and an invitation for you to join the dialogue.
                </p>
            </section>

            {/* Footer / Signature */}
            <div className="pt-8 border-t border-beige-200 text-center">
                <p className="font-serif text-2xl text-amber-900/40 font-bold italic">Do Hyun Lee</p>
            </div>
        </div>
    );
}

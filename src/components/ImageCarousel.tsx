'use client';

import Image from 'next/image';

const IMAGES = [
  '/social_movement_1.png',
  '/social_movement_2.png',
  '/social_movement_3.png'
];

export default function ImageCarousel() {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0); // Removed unused state

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-beige-200">
      <Image
        src={IMAGES[0]}
        alt="Social Movement"
        fill
        className="object-cover opacity-90"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply" />
      {/* The following lines seem to be part of a malformed loop or structure.
                Based on the instruction to restore Image component syntax, I'm assuming
                the intent was to have a single Image component here, and the rest of the
                malformed JSX should be removed or corrected if it was part of a different
                feature. For now, I'm only fixing the Image component.
                The original code had:
                `                    </div >
                                ))
                }
                            </div >`
                which is syntactically incorrect and doesn't fit with the single Image component.
                I will remove these malformed closing tags.
            */}

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-beige-50/80 to-transparent bottom-0 h-24" />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
      `}</style>
    </div >
  );
}

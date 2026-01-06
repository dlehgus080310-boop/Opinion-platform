'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
    '/images/social_movement_1.png', // We will rename them after copying or check the exact filenames
    '/images/social_movement_2.png',
    '/images/social_movement_3.png',
    '/images/social_movement_1.png',
    '/images/social_movement_2.png',
    '/images/social_movement_3.png',
];

export default function ImageCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-scroll logic (simple fade or slide)
    // User asked for "Repeatedly appear covering 1/3 of the screen"
    // A marquee or a carousel? "반복해서 나타나도록" implies a marquee or slideshow.
    // "Covering 1/3 of the screen".
    // Let's make a seamless marquee (css animation) or a simple slideshow.
    // A seamless marquee is better for "repeatedly appear".

    return (
        <div className="relative w-full h-[35vh] overflow-hidden bg-beige-200">
            <div className="flex w-[200%] h-full animate-marquee">
                {/* Double the images for seamless loop */}
                {[...images, ...images].map((src, index) => (
                    <div key={index} className="relative w-1/3 md:w-1/4 h-full shrink-0 border-r border-white/20">
                        <Image
                            src={src}
                            alt="Social Movement"
                            fill
                            className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply" />
                    </div>
                ))}
            </div>

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
        </div>
    );
}

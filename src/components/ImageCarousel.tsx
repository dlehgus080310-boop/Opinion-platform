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
        alt = "Social Movement"
                            fill
    className = "object-cover opacity-90 hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply" />
                    </div >
                ))
}
            </div >

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

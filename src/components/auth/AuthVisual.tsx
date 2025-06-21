import Image from 'next/image';
import { Logo } from '@/components/shared/Logo';

const Wave = () => (
    <svg 
        className="absolute top-0 bottom-0 left-0 h-full z-10 text-background" 
        style={{ transform: 'translateX(-50%)' }}
        width="150" 
        viewBox="0 0 75 800" 
        preserveAspectRatio="none"
    >
        <path d="M75 800V0C25 160 125 400 25 800h50z" fill="currentColor"></path>
        <path d="M75 800V0C25 160 125 400 25 800" stroke="hsl(var(--border))" fill="none" strokeDasharray="4 4" strokeWidth="0.5"></path>
    </svg>
);

export function AuthVisual() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-card">
            <Image
              src="https://images.unsplash.com/photo-1582407947304-c899e5217333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZ3xlbnwwfHx8fDE3NTE1MTc3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Modern architectural building"
              layout="fill"
              objectFit="cover"
              className="z-0"
              data-ai-hint="modern building architecture"
              priority
            />
            <div className="absolute bottom-8 right-8 z-20">
                <Logo size="lg" className="[&>span]:text-white [&>svg]:text-white/80" />
            </div>
            <Wave />
        </div>
    )
}

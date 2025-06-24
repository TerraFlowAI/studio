import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';

const Wave = () => (
    <svg 
        className="absolute top-0 bottom-0 left-0 h-full z-10 text-background" 
        style={{ transform: 'translateX(-50%)' }}
        width="150" 
        viewBox="0 0 75 800" 
        preserveAspectRatio="none"
    >
        <path d="M 75 800 V 0 L 0 0 C 50 400, 50 400, 0 800 Z" fill="currentColor"></path>
    </svg>
);

export function AuthVisual() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-card">
            <Image
              src="https://images.unsplash.com/photo-1689366154849-b8e58a995fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8TW9kZXJuJTIwQXJjaGl0ZWN0dXJhbCUyMEJ1aWxkaW5nfGVufDB8fHx8MTc1MDQ4ODk5OXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Modern architectural building"
              layout="fill"
              objectFit="cover"
              className="z-0"
              data-ai-hint="modern building architecture"
              priority
            />
            <div className="absolute bottom-8 right-8 z-20">
                <Logo className="[&>span]:text-white" />
            </div>
            <Wave />
        </div>
    )
}


"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Particles } from '@/components/ui/particles';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';

const STATIC_HEADLINE_PART = "AI-Powered Real Estate is Here. ";
const TYPING_PHRASES = ["Business on Auto-pilot with AI", "Start Closing More Deals Faster", "Reclaim Your Time", "Automate- Analyze- Accelerate"];
const TYPING_SPEED_MS = 100;
const DELETING_SPEED_MS = 50;
const DELAY_BETWEEN_PHRASES_MS = 2000;


export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTypingAnimationPaused, setIsTypingAnimationPaused] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedAnimatedText, setDisplayedAnimatedText] = useState('');

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]); 
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const trustedByCompanies = [
    "ACME Realty",
    "Globex Properties",
    "Initech Homes",
    "Massive Dynamics",
    "Umbrella Estates"
  ];
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const { currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPos = event.clientX - left;
    const yPos = event.clientY - top;
    const xPct = xPos / width - 0.5;
    const yPct = yPos / height - 0.5;
    
    x.set(xPct * 100); 
    y.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []); 

  useEffect(() => {
    if (!isVisible) {
        setDisplayedAnimatedText('');
        return;
    }

    let timeoutId: NodeJS.Timeout;

    if (isTypingAnimationPaused) {
        timeoutId = setTimeout(() => {
            setIsTypingAnimationPaused(false);
            if (isDeleting && subIndex === 0) { 
                setIsDeleting(false);
                setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % TYPING_PHRASES.length);
            } else if (!isDeleting && TYPING_PHRASES[currentPhraseIndex] && subIndex === TYPING_PHRASES[currentPhraseIndex].length) {
                setIsDeleting(true); 
            }
        }, DELAY_BETWEEN_PHRASES_MS);
    } else { 
        const currentPhrase = TYPING_PHRASES[currentPhraseIndex];
        if (!currentPhrase) { 
            setIsDeleting(false);
            setCurrentPhraseIndex(0); 
            setIsTypingAnimationPaused(true);
            setSubIndex(0);
            setDisplayedAnimatedText('');
            return () => clearTimeout(timeoutId);
        }

        if (isDeleting) {
            if (subIndex > 0) {
                timeoutId = setTimeout(() => {
                    setDisplayedAnimatedText(currentPhrase.substring(0, subIndex - 1));
                    setSubIndex(subIndex - 1);
                }, DELETING_SPEED_MS);
            } else { 
                setIsTypingAnimationPaused(true); 
            }
        } else { 
            if (subIndex < currentPhrase.length) {
                timeoutId = setTimeout(() => {
                    setDisplayedAnimatedText(currentPhrase.substring(0, subIndex + 1));
                    setSubIndex(subIndex + 1);
                }, TYPING_SPEED_MS);
            } else { 
                setIsTypingAnimationPaused(true); 
            }
        }
    }
    return () => clearTimeout(timeoutId);
  }, [subIndex, isDeleting, currentPhraseIndex, isVisible, isTypingAnimationPaused]);

  const headlineJsx = (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-2 leading-tight">
      <span className="block">
        {STATIC_HEADLINE_PART}
      </span>
      <span
        className={`block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-200 min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] lg:min-h-[7rem]`}
      >
        {displayedAnimatedText}
        {((isTypingAnimationPaused && TYPING_PHRASES[currentPhraseIndex] && subIndex === TYPING_PHRASES[currentPhraseIndex].length && !isDeleting) ||
         (isVisible && !isTypingAnimationPaused && TYPING_PHRASES[currentPhraseIndex] && subIndex < TYPING_PHRASES[currentPhraseIndex].length && subIndex > 0) ||
         (isDeleting && subIndex > 0) 
         ) ? (
          <span className={`inline-block w-1 h-10 md:h-12 lg:h-14 ml-1 align-bottom
                           bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 animate-pulse`}></span>
        ) : <span className="inline-block w-1 h-10 md:h-12 lg:h-14 ml-1 align-bottom"></span>}
      </span>
    </h1>
  );

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 overflow-hidden pt-24 pb-12 sm:pt-16"
      data-section-view="hero"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={50}
        color="#46B3AC"
        ease={50}
        staticity={50}
        size={0.4}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-teal-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-0"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-700"></div>
        <div className="absolute -bottom-8 left-80 w-80 h-80 bg-gradient-to-r from-purple-200 to-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-1000"></div>
        <div className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[80rem] h-96 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-1500 z-0"></div>
        <div className="absolute -bottom-80 left-1/4 w-[70rem] h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-2000 z-0"></div>
        <div className="absolute -bottom-70 right-1/4 w-[90rem] h-80 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-2500 z-0"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ perspective: '1000px' }}>
        <div className="max-w-6xl mx-auto">
          <div className={`mt-8 inline-flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary dark:text-teal-300 mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} border border-primary/20`}>
            <Sparkles className="w-4 h-4 text-primary dark:text-teal-300" />
            <span>Powered by TerraFlow AI Suite</span>
          </div>

          {headlineJsx}

          <p className={`text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-600`}>
            Elevate your real estate business with TerraFlow's AI automation. Engage leads 24/7, streamline marketing, and close more deals.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-1000`}>
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
              data-cta-click="hero-demo-request"
            >
              <Link href="#features">
                <span className="flex items-center gap-2">
                  See TerraFlow in Action
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary dark:text-white hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg"
              data-cta-click="hero-strategic-call"
            >
              <Link href="#contact">
                Book Free Strategic Call
              </Link>
            </Button>
          </div>

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className={`relative mt-12 sm:mt-16 w-full max-w-6xl mx-auto z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-1200`}
          >
            <div className="relative w-full rounded-2xl bg-white/70 backdrop-blur-xl shadow-2xl border border-slate-200 p-2">
                <Image
                    src="https://placehold.co/1200x675.png" 
                    alt="TerraFlow Dashboard Screenshot"
                    data-ai-hint="dashboard ui"
                    width={1200}
                    height={675}
                    className="h-auto w-full rounded-lg"
                    priority
                />
            </div>
          </motion.div>
          
          <div className="mt-12 sm:mt-20 w-full max-w-5xl mx-auto z-10 relative">
              <h3 className="text-center text-gray-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Trusted by AI-forward real estate leaders
              </h3>
              <div className="relative w-full overflow-hidden mask-gradient-lr">
                <div className="flex animate-scroll-companies whitespace-nowrap">
                  {[...trustedByCompanies, ...trustedByCompanies].map((company, index) => (
                    <span key={index} className="text-gray-500 text-base sm:text-lg font-semibold hover:text-gray-700 transition-colors flex-shrink-0 mx-4 md:mx-8 lg:mx-12">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

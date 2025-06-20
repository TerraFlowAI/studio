// src/components/landing/BeforeAfterAI.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, Edit2 } from 'lucide-react';
import Image from 'next/image';

const BeforeAfterAI = () => {
  const [sliderValue, setSliderValue] = useState(50);

  const placeholderContent = {
    originalHeadline: "Spacious 3 Bed, 2 Bath Home in Prime Location",
    originalDescription: "This charming home features three bedrooms, two bathrooms, and a large backyard. Located in a desirable neighborhood, close to schools and parks. Needs some TLC but has great potential. Perfect for families or investors.",
    aiHeadline: "✨ Transformed Oasis: Stunning 3-Bed, 2-Bath Haven in Coveted Locale!",
    aiDescription: "Step into your dream! This meticulously reimagined 3-bedroom, 2-bathroom sanctuary in a highly sought-after neighborhood awaits. Bathed in natural light, the open-concept living space flows effortlessly into a chef's kitchen boasting brand-new quartz countertops and stainless steel appliances. Unwind in the expansive master suite with a spa-like ensuite. The generous backyard offers a private retreat, perfect for entertaining or quiet evenings. With top-rated schools and vibrant parks just moments away, this home isn't just a residence—it's a lifestyle upgrade. Every detail considered, every finish perfected. Your exceptional new beginning starts here!",
    originalImageUrl: "https://placehold.co/600x400.png",
    aiImageUrl: "https://placehold.co/600x400.png",
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-teal-950" data-section-view="before-after-ai">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-slate-800 dark:text-slate-100">
            From <span className="text-slate-500 dark:text-slate-400">Basic</span> to <span className="animate-text-shimmer-strong">Brilliant</span> with AI
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            See how TerraFlowAI transforms standard property inputs into compelling, market-ready content and insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* "Before AI" Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-card p-6 rounded-xl shadow-lg border border-border relative overflow-hidden"
          >
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full opacity-50 blur-xl"></div>
            <div className="flex items-center mb-4">
              <FileText className="w-7 h-7 text-slate-500 mr-3" />
              <h3 className="text-2xl font-semibold font-headline text-slate-700 dark:text-slate-200">Before TerraFlow AI</h3>
            </div>
            <Image
              src={placeholderContent.originalImageUrl}
              alt="Original property"
              width={600}
              height={400}
              className="rounded-lg mb-4 aspect-[3/2] object-cover border border-border"
              data-ai-hint="old house"
            />
            <h4 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-1">{placeholderContent.originalHeadline}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">
              {placeholderContent.originalDescription}
            </p>
            <Button variant="outline" className="mt-6 w-full border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              <Edit2 className="w-4 h-4 mr-2" /> Edit Manually
            </Button>
          </motion.div>

          {/* "After AI" Card - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-6 rounded-xl shadow-2xl border-2 border-primary relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/30 to-blue-500/20 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center mb-4">
              <Sparkles className="w-8 h-8 text-primary mr-3 animate-pulse" />
              <h3 className="text-2xl font-semibold font-headline text-primary">After TerraFlow AI</h3>
            </div>
             <Image
              src={placeholderContent.aiImageUrl}
              alt="AI enhanced property"
              width={600}
              height={400}
              className="rounded-lg mb-4 aspect-[3/2] object-cover border border-primary/30 shadow-lg"
              data-ai-hint="modern house"
            />
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{placeholderContent.aiHeadline}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
              {placeholderContent.aiDescription}
            </p>
             <Button className="mt-6 w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-md hover:shadow-lg transition-all">
              <Sparkles className="w-4 h-4 mr-2" /> Use AI Content
            </Button>
          </motion.div>
        </div>

        {/* Interactive Slider (Optional) */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Drag to Compare (Conceptual)</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Imagine an interactive slider revealing the AI transformation in real-time.
          </p>
          <div className="max-w-md mx-auto">
            <Slider
              defaultValue={[sliderValue]}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              aria-label="Before and after AI slider"
              className="[&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-slate-300 [&>span:first-child]:to-primary"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span>Manual Input</span>
              <span>AI Enhanced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterAI;

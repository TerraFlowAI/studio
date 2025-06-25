"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "TerraFlowAI revolutionized our lead generation. The AI scoring is a game-changer, and we're closing deals faster than ever.",
    image: "https://placehold.co/40x40.png",
    name: "Briana Patton",
    role: "Operations Manager, ACME Realty",
  },
  {
    text: "Implementing TerraFlowAI was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://placehold.co/40x40.png",
    name: "Bilal Ahmed",
    role: "IT Manager, Globex Properties",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://placehold.co/40x40.png",
    name: "Saman Malik",
    role: "Customer Support Lead, Initech Homes",
  },
  {
    text: "TerraScribe's AI content generation has saved us countless hours. We now produce high-quality listings in a fraction of the time.",
    image: "https://placehold.co/40x40.png",
    name: "Omar Raza",
    role: "CEO, Massive Dynamics Estates",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://placehold.co/40x40.png",
    name: "Zainab Hussain",
    role: "Project Manager, Umbrella Estates",
  },
  {
    text: "The SmartFlow automation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://placehold.co/40x40.png",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our agents' productivity improved with a user-friendly design and positive customer feedback from the AI chatbot.",
    image: "https://placehold.co/40x40.png",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our client management.",
    image: "https://placehold.co/40x40.png",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using TerraFlowAI, our online presence and conversions significantly improved, boosting our revenue.",
    image: "https://placehold.co/40x40.png",
    name: "Hassan Ali",
    role: "Lead Developer",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export function TestimonialsSection() {
  return (
    <section className="bg-background py-16 md:py-24 relative">

      <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
        >
           <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
            Why Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Leaders</span> are Choosing TerraFlow
          </h2>
          <p className="text-lg md:text-xl text-slate-600">
            See how professionals and developers are leveraging TerraFlowAI to grow their business.
          </p>
        </motion.div>

        <div className="relative flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

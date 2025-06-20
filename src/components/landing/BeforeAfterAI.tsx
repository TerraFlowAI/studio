// src/components/landing/BeforeAfterAI.tsx
"use client";

import React from 'react';
import { MessageSquare, Phone, Mail, DollarSign, CheckCircle, Repeat, Truck, Zap, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion"; // Added for potential animations if needed

const BeforeAfterAI = () => {
  const beforeActivities = [
    { icon: <Phone size={20} className="text-red-500 dark:text-red-400" />, title: 'Jane Appleseed', text: '2 missed voice call', time: '3m ago' },
    { icon: <Mail size={20} className="text-gray-500 dark:text-gray-400" />, title: 'Ralph Edwards', text: 'Did you see my email? I want to update the menu for my booking.', time: 'now' },
    { icon: <MessageSquare size={20} className="text-gray-500 dark:text-gray-400" />, title: 'ivym', text: 'Are you available to cater Pan-Asian for 30?', time: '3m ago' },
    { icon: <DollarSign size={20} className="text-gray-500 dark:text-gray-400" />, title: 'ivym', text: 'How do I pay? I want to make advance settlement before the booking', time: '3m ago' },
    { icon: <Phone size={20} className="text-red-500 dark:text-red-400" />, title: 'Erin Stead', text: '10 Missed call', time: '3m ago' },
  ];

  const afterActivities = [
    { icon: <CheckCircle size={20} className="text-green-600 dark:text-green-400" />, title: 'New request', text: 'New request to reschedule the booking to a new date.', time: 'now' },
    { icon: <DollarSign size={20} className="text-green-600 dark:text-green-400" />, title: 'Payment received', text: 'Payment $2,200 from Mason Mount', time: '3m ago' },
    { icon: <Repeat size={20} className="text-purple-600 dark:text-purple-400" />, title: 'Menu change request', text: 'Menu change request for the upcoming booking', time: 'now' },
    { icon: <Truck size={20} className="text-green-600 dark:text-green-400" />, title: 'New order', text: 'Are you available to cater Pan-Asian for 30?', time: '3m ago' },
    { icon: <DollarSign size={20} className="text-green-600 dark:text-green-400" />, title: 'Payment received', text: 'Payment $1,200 from Jason Mount', time: '3m ago' },
    { icon: <MessageSquare size={20} className="text-green-600 dark:text-green-400" />, title: 'Service inquiry', text: 'Sara Ernst inquired about your cooking services', time: '3m ago' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative animate-moving-dashboard-border p-8 my-16 rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-text-shimmer-strong">
            TerraLead Suite: Before & After AI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Before Column - Painful Manual Process */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-semibold mb-8 text-foreground/90">Painful Manual Process</h3>
              <div className="w-full space-y-4">
                {beforeActivities.map((activity, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-start space-x-3 border border-gray-300 dark:border-gray-700">
                    <div className="mt-0.5 text-gray-700 dark:text-gray-300 flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1 text-left">
                       {activity.title && <p className="font-semibold text-foreground text-sm leading-tight">{activity.title}</p>}
                      <p className="text-foreground/80 text-sm leading-tight">{activity.text}</p>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-xs flex-shrink-0 self-start">{activity.time}</span>
                  </div>
                ))}
              </div>
               <p className="text-lg text-foreground/70 mt-8 leading-relaxed">
                Traditional lead management can be time-consuming and less efficient. Manual data entry, limited insights, and slower response times.
              </p>
               <ul className="text-left text-foreground/70 list-disc list-inside mt-4 space-y-2">
                <li>Manual lead qualification</li>
                <li>Limited market analysis</li>
                <li>Basic reporting</li>
                <li>Slower follow-up</li>
              </ul>
            </div>

            {/* After Column - TerraLead AI Automated */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-semibold mb-8 text-primary dark:text-green-400">TerraLead AI Automated</h3>
               <div className="w-full space-y-4">
                {afterActivities.map((activity, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-green-100 dark:bg-green-800 p-4 rounded-lg flex items-start space-x-3 border border-green-300 dark:border-green-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  >
                     {/* Subtle pulse animation for icons */}
                    <div className="mt-0.5 text-green-800 dark:text-green-300 animate-pulse-custom flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1 text-left">
                       {activity.title && <p className="font-semibold text-foreground text-sm leading-tight">{activity.title}</p>}
                      <p className="text-foreground/80 text-sm leading-tight">{activity.text}</p>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-xs flex-shrink-0 self-start">{activity.time}</span>
                  </motion.div>
                ))}
                 {/* Simplified AI Process Visualization */}
                 <motion.div 
                    className="w-full bg-purple-200/50 dark:bg-purple-800/50 p-4 rounded-lg flex items-center justify-around text-foreground/70 mt-8 border border-purple-400 dark:border-purple-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: afterActivities.length * 0.1 + 0.5, duration: 0.5 }}
                  >
                    <Zap size={24} className="text-purple-600 dark:text-purple-400 animate-bounce"/>
                    <ArrowRight size={20} className="text-purple-600 dark:text-purple-400"/>
                    <span className="text-sm font-semibold">Processing</span>
                     <ArrowRight size={20} className="text-purple-600 dark:text-purple-400"/>
                    <Zap size={24} className="text-purple-600 dark:text-purple-400 animate-bounce animation-delay-500"/>
                 </motion.div>
              </div>
               <p className="text-lg text-foreground/70 mt-8 leading-relaxed">
                TerraLead AI Suite automates processes, provides deep insights, and accelerates deal closure. Leverage AI for smart lead scoring, market trend analysis, and personalized communication.
              </p>
               <ul className="text-left text-foreground/70 list-disc list-inside mt-4 space-y-2">
                <li>AI-powered lead scoring</li>
                <li>Automated market trend analysis</li>
                <li>Predictive analytics</li>
                <li>Personalized automated follow-up</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterAI; // Ensure default export

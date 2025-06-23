
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Zap, TrendingUp, Brain, BarChart3, Users, Target, Activity, Loader2, Home, Settings, PieChart, MapPin, Camera, FileText, Calendar, Bell, User, Menu, Search, Filter, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Particles } from '@/components/ui/particles';
import Image from 'next/image';

const STATIC_HEADLINE_PART = "AI-Powered Real Estate is Here. ";
const TYPING_PHRASES = ["Business on Auto-pilot with AI", "Start Closing More Deals", "Reclaim Your Time", "Automate- Analyze- Accelerate"];
const TYPING_SPEED_MS = 100;
const DELETING_SPEED_MS = 50;
const DELAY_BETWEEN_PHRASES_MS = 2000;


export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [leadScore, setLeadScore] = useState(0);
  const [marketTrend, setMarketTrend] = useState(0);
  const [activeLeads, setActiveLeads] = useState(127);
  const [cursorPosition, setCursorPosition] = useState({ x: 20, y: 30 });
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [propertyValue, setPropertyValue] = useState(2.4);
  const [conversionRate, setConversionRate] = useState(68);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');

  const [barHeights, setBarHeights] = useState<string[]>([]);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedAnimatedText, setDisplayedAnimatedText] = useState('');
  const [isTypingAnimationPaused, setIsTypingAnimationPaused] = useState(false);


  const features = [
    { icon: Sparkles, text: "AI-Powered Lead Generation" },
    { icon: TrendingUp, text: "Smart Market Analytics" },
    { icon: Zap, text: "Automated Workflows" }
  ];

  const sidebarItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'properties', icon: MapPin, label: 'Properties' },
    { id: 'leads', icon: Users, label: 'Leads' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const trustedByCompanies = [
    "ACME Realty",
    "Globex Properties",
    "Initech Homes",
    "Massive Dynamics",
    "Umbrella Estates"
  ];

  useEffect(() => {
    setIsVisible(true);

    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    const aiInterval = setInterval(() => {
      setAiProcessing(true);
      setTimeout(() => {
        setLeadScore(Math.floor(Math.random() * 100));
        setMarketTrend(Math.floor(Math.random() * 40) - 20);
        setActiveLeads(prev => prev + Math.floor(Math.random() * 10) - 5);
        setPropertyValue(prev => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
        setConversionRate(prev => Math.max(50, Math.min(90, prev + Math.floor(Math.random() * 10 - 5))));
        setAiProcessing(false);
      }, 1500);
    }, 4000);

    const cursorInterval = setInterval(() => {
      const actions = [
        { item: 'analytics', x: 20, y: 100 },
        { item: 'properties', x: 20, y: 140 },
        { item: 'leads', x: 20, y: 180 },
        { item: 'kpi-card', x: 300, y: 100 },
        { item: 'chart-area', x: 450, y: 250 },
        { item: 'property-card', x: 350, y: 350 }
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setCursorPosition({ x: randomAction.x, y: randomAction.y });
      setActiveSidebarItem(prevActive => randomAction.item.includes('analytics') ? 'analytics' :
                          randomAction.item.includes('properties') ? 'properties' :
                          randomAction.item.includes('leads') ? 'leads' : prevActive);
      setTimeout(() => {
        setClickedItem(randomAction.item);
        setTimeout(() => setClickedItem(null), 800);
      }, 1000);
    }, 5000);

    let barAnimationInterval: NodeJS.Timeout | null = null;
    if (typeof window !== 'undefined') {
        const initialHeights = Array(12).fill('20%');
        setBarHeights(initialHeights); 

        const updateBarHeights = () => {
            const newHeights = [...Array(12)].map((_, i) => {
            return `${20 + Math.sin((Date.now() / 1000 + i * 0.5) * 0.7) * 35 + 10 * Math.cos(Date.now()/2000 + i * 0.3)}%`;
            });
            setBarHeights(newHeights);
        };
        updateBarHeights(); 
        barAnimationInterval = setInterval(updateBarHeights, 100); 
    }
    

    return () => {
      clearInterval(featureInterval);
      clearInterval(aiInterval);
      clearInterval(cursorInterval);
      if (barAnimationInterval) clearInterval(barAnimationInterval);
    };
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


  const currentKpiData = [
    { label: 'Total Revenue', value: '₹1.2Cr', change: '+24%', trend: 'up' },
    { label: 'Active Listings', value: '847', change: '+12%', trend: 'up' },
    { label: 'Conversion Rate', value: `${conversionRate}%`, change: '+8%', trend: 'up' },
    { label: 'Avg. Property Value', value: `₹${propertyValue.toFixed(1)}Cr`, change: '+15%', trend: 'up' }
  ];

  const headlineJsx = (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-2 leading-tight">
      <span className="block">
        {STATIC_HEADLINE_PART}
      </span>
      <span
        className={`block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-200 min-h-[5rem] md:min-h-[6rem] lg:min-h-[7rem]`}
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
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 overflow-hidden pt-16"
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

        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-bounce animation-delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-bounce animation-delay-1500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-2000"></div>

        {/* --- NEW: Bottom Glowing Effects --- */}
        <div className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[80rem] h-96 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-1500 z-0"></div>
        <div className="absolute -bottom-80 left-1/4 w-[70rem] h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-2000 z-0"></div>
        <div className="absolute -bottom-70 right-1/4 w-[90rem] h-80 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-2500 z-0"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <div className={`mt-8 inline-flex items-center gap-2 bg-transparent backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-teal-700 dark:text-teal-300 mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} animate-shimmering-border`}>
 <Sparkles className="w-4 h-4 animate-pulse text-teal-700 dark:text-teal-300 z-10" />
            <span className="animate-text-shimmer">Powered by TerraFlow AI-Suit</span>
           <span className="relative flex w-3 h-3 ml-2"><span className="absolute inset-0 inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-pulse"></span><span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span></span>
          </div>

          {headlineJsx}

          <p className={`text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-600`}>
            Elevate your real estate business with TerraFlow's AI automation. Engage leads 24/7, streamline marketing, and close more deals.
          </p>

          <div className={`flex items-center justify-center gap-2 mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-800`}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${
                    index === currentFeature
                      ? 'bg-teal-100 border-teal-300 text-teal-700 scale-105'
                      : 'bg-white/50 border-gray-200 text-gray-500 scale-95'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${index === currentFeature ? 'animate-pulse' : ''}`} />
                  <span className="text-sm font-medium hidden sm:block">{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-1000`}>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
              data-cta-click="hero-demo-request"
            >
              <span className="flex items-center gap-2">
                See TerraFlow in Action
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
 className="border-primary text-primary dark:text-white hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg"
 data-cta-click="hero-strategic-call"
            >
              Book Free Strategic Call
            </Button>
          </div>

          {/* Dashboard Visual - Neomorphism Theme */}
          <div 
            className={`relative transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} animation-delay-1200`}
          >
            <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-7xl mx-auto hover:shadow-3xl transition-all duration-500 group overflow-hidden animate-moving-dashboard-border">

              <div className="bg-slate-800 rounded-t-2xl overflow-hidden relative"> {/* Main container background */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-white font-bold text-lg flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">TF</span>
                      </div>
                      TerraFlow
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">dashboard.terraflow.ai</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gray-400" />
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    {aiProcessing ? (
                      <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                    ) : (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                    <span className="text-xs text-green-400">AI Active</span>
                  </div>
                </div>

                <div className="flex h-[650px]"> {/* Increased height */}

                  {/* Sidebar - Neomorphism */}
                  <div className="w-64 bg-slate-800 border-r border-slate-700 p-4"> 
                    <div className="space-y-2">
                      {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                              activeSidebarItem === item.id || clickedItem === item.id
                                ? 'bg-teal-500 text-white shadow-[-2px_-2px_5px_rgba(100,116,139,0.1),_2px_2px_5px_rgba(15,23,42,0.2)]' 
                                : 'text-gray-300 hover:bg-slate-700' 
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${clickedItem === item.id ? 'animate-pulse' : ''}`} />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-3 bg-slate-700 rounded-lg shadow-[-4px_-4px_8px_rgba(100,116,139,0.2),_4px_4px_8px_rgba(15,23,42,0.3)]"> 
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-semibold text-purple-200">AI Assistant</span>
                      </div>
                      <div className="text-xs text-gray-300">
                        "I've identified 3 high-priority leads for follow-up today."
                      </div>
                    </div>
                  </div>

                  {/* Main Dashboard Content Area - Neomorphism */}
                  <div className="flex-1 p-6 space-y-6 bg-slate-700"> 

                    {/* KPI Cards - Neomorphism */}
                    <div className="grid grid-cols-4 gap-4">
                      {currentKpiData.map((kpi, index) => (
                        <div
                          key={index}
                          className={`bg-slate-700 rounded-lg p-4 shadow-[-5px_-5px_10px_rgba(100,116,139,0.25),_5px_5px_10px_rgba(15,23,42,0.35)] transition-all duration-500 ${ 
                            clickedItem === 'kpi-card' ? 'shadow-[-2px_-2px_5px_rgba(100,116,139,0.25),_2px_2px_5px_rgba(15,23,42,0.35)] scale-95' : 'hover:shadow-[-3px_-3px_7px_rgba(100,116,139,0.25),_3px_3px_7px_rgba(15,23,42,0.35)]' 
                          }`}
                        >
                          <div className="text-xs text-gray-300 mb-1">{kpi.label}</div>
                          <div className="text-xl font-bold text-white mb-1">{kpi.value}</div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-300" />
                            <span className="text-xs text-green-300">{kpi.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-6">

                      <div className="col-span-2">
                        {/* Market Analysis Panel - Neomorphism */}
                        <div className={`bg-slate-700 rounded-lg p-4 h-48 shadow-[-5px_-5px_10px_rgba(100,116,139,0.25),_5px_5px_10px_rgba(15,23,42,0.35)] transition-all duration-500 ${ 
                          clickedItem === 'chart-area' ? 'shadow-[-2px_-2px_5px_rgba(100,116,139,0.25),_2px_2px_5px_rgba(15,23,42,0.35)] scale-95' : ''
                        }`}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <PieChart className="w-5 h-5 text-blue-300" />
                              <span className="text-white font-semibold">Market Trends</span>
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${marketTrend >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                              <TrendingUp className={`w-4 h-4 ${marketTrend < 0 ? 'rotate-180' : ''} transition-transform duration-500`} />
                              <span>{marketTrend >= 0 ? '+' : ''}{marketTrend}%</span>
                            </div>
                          </div>

                          {/* Chart Background - Inset Neomorphism */}
                          <div className="relative h-24 bg-slate-700 rounded shadow-[inset_5px_5px_8px_rgba(15,23,42,0.3),_inset_-5px_-5px_8px_rgba(100,116,139,0.2)] overflow-hidden">
                            <div className="absolute inset-0 flex items-end justify-around p-3">
                              {barHeights.length > 0 ? barHeights.map((height, i) => (
                                <div
                                  key={i}
                                  className="bg-gradient-to-t from-blue-500/80 to-teal-500/80 rounded-t transition-all duration-1000"
                                  style={
                                    {
                                      height: height,
                                      width: '6px',
                                      animationDelay: `${i * 100}ms`
                                    } as React.CSSProperties
                                  }
                                ></div>
                              )) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Insights Panel - Neomorphism */}
                      <div className="bg-slate-700 rounded-lg p-4 shadow-[-5px_-5px_10px_rgba(100,116,139,0.25),_5px_5px_10px_rgba(15,23,42,0.35)]"> 
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-5 h-5 text-orange-300" />
                          <span className="text-white font-semibold">AI Insights</span>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-teal-600/30 rounded p-2 shadow-[-3px_-3px_6px_rgba(100,116,139,0.15),_3px_3px_6px_rgba(15,23,42,0.25)]"> 
                            <div className="text-xs text-teal-200 font-semibold">High Priority</div>
                            <div className="text-xs text-gray-300">Bandra West showing 15% price surge</div>
                          </div>
                          <div className="bg-blue-600/30 rounded p-2 shadow-[-3px_-3px_6px_rgba(100,116,139,0.15),_3px_3px_6px_rgba(15,23,42,0.25)]">
                            <div className="text-xs text-blue-200 font-semibold">Opportunity</div>
                            <div className="text-xs text-gray-300">3 leads ready for follow-up</div>
                          </div>
                          <div className="bg-purple-600/30 rounded p-2 shadow-[-3px_-3px_6px_rgba(100,116,139,0.15),_3px_3px_6px_rgba(15,23,42,0.25)]">
                            <div className="text-xs text-purple-200 font-semibold">Trending</div>
                            <div className="text-xs text-gray-300">Luxury segment up 22%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Property Showcase - Neomorphism */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Property Card 1 */}
                        <div className={`bg-slate-700 rounded-lg overflow-hidden shadow-[-5px_-5px_10px_rgba(100,116,139,0.25),_5px_5px_10px_rgba(15,23,42,0.35)] transition-all duration-500 relative group ${ 
                          clickedItem === 'property-card' ? 'shadow-[-2px_-2px_5px_rgba(100,116,139,0.25),_2px_2px_5px_rgba(15,23,42,0.35)] scale-95' : ''
                        }`}>
                          <Image 
                            src="https://placehold.co/400x250.png"
                            alt="Luxury Villa"
                            width={400}
                            height={250}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg" 
                            data-ai-hint="modern house"
                          />
                          <div className="absolute top-2 left-2 bg-slate-600 rounded px-2 py-1 shadow-[-2px_-2px_4px_rgba(100,116,139,0.2),_2px_2px_4px_rgba(15,23,42,0.3)]"> 
                            <span className="text-xs font-bold text-white/90">Premium</span>
                          </div>
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-white truncate">Luxury Villa, Juhu</h4>
                            <p className="text-xs text-gray-300">₹8.5 Cr • 4 BHK</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-green-300">AI Score: 92%</span>
                              <Camera className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        </div>
                         {/* Property Card 2 */}
                        <div className="bg-slate-700 rounded-lg overflow-hidden shadow-[-5px_-5px_10px_rgba(100,116,139,0.25),_5px_5px_10px_rgba(15,23,42,0.35)] relative group">
                           <Image 
                            src="https://placehold.co/400x250.png"
                            alt="Modern Apartment"
                            width={400}
                            height={250}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                            data-ai-hint="apartment building"
                          />
                          <div className="absolute top-2 left-2 bg-slate-600 rounded px-2 py-1 shadow-[-2px_-2px_4px_rgba(100,116,139,0.2),_2px_2px_4px_rgba(15,23,42,0.3)]">
                            <span className="text-xs font-bold text-white/90">Featured</span>
                          </div>
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-white truncate">Modern Apartment</h4>
                            <p className="text-xs text-gray-300">₹3.2 Cr • 3 BHK</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-blue-300">AI Score: 87%</span>
                               <Camera className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        </div>
                        {/* Property Card 3 */}
                        <div className="bg-slate-700 rounded-lg overflow-hidden shadow-[-5px_-5px_10px_rgba(100,116,139,0.25),_5px_5px_10px_rgba(15,23,42,0.35)] relative group">
                           <Image 
                            src="https://placehold.co/400x250.png"
                            alt="Commercial Space"
                            width={400}
                            height={250}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                            data-ai-hint="commercial building"
                          />
                           <div className="absolute top-2 left-2 bg-slate-600 rounded px-2 py-1 shadow-[-2px_-2px_4px_rgba(100,116,139,0.2),_2px_2px_4px_rgba(15,23,42,0.3)]">
                            <span className="text-xs font-bold text-white/90">New</span>
                          </div>
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-white truncate">Commercial Space</h4>
                            <p className="text-xs text-gray-300">₹12 Cr • Office</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-purple-300">AI Score: 95%</span>
                               <Camera className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute w-4 h-4 bg-white rounded-full shadow-lg border-2 border-slate-400 pointer-events-none transition-all duration-1000 ease-out z-50"
                  style={{
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                    transform: clickedItem ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  <div className={`absolute inset-0 bg-teal-400 rounded-full ${clickedItem ? 'animate-ping' : ''}`}></div>
                </div>

                <div className="border-t border-slate-700 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>AI Processing: {aiProcessing ? 'Active' : 'Standby'}</span>
                    <span>•</span>
                    <span>Last Updated: Just now</span>
                    <span>•</span>
                    <span>{activeLeads} Active Leads</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">Real-time sync</span>
                    </div>
                    <div className="text-xs text-gray-400">TerraFlow v2.1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted By Section - Modified for infinite slider and integrated into Hero background */}
          <div className="mt-20 w-full max-w-5xl mx-auto z-10 relative"> {/* Added z-10 to ensure it's above background glows */}
              <h3 className="text-center text-gray-600 text-sm font-medium mb-6 flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" /> {/* Changed primary to a specific teal shade */}
                Trusted by AI-forward real estate leaders
              </h3>
              {/* Infinite Slider Container */}
              <div className="relative w-full overflow-hidden mask-gradient-lr">
                <div className="flex animate-scroll-companies whitespace-nowrap">
                  {/* Duplicate the list to create the infinite loop */}
                  {[...trustedByCompanies, ...trustedByCompanies].map((company, index) => (
                    <span key={index} className="text-gray-500 text-lg font-semibold hover:text-gray-700 transition-colors flex-shrink-0 mx-4 md:mx-8 lg:mx-12">
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

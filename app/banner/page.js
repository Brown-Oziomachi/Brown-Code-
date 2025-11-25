"use client";
import React from 'react';
import Image from 'next/image';

export default function DeveloperBanner() {
    return (
        <div className="min-h-screen bg-gray-900/20 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-7xl bg-black overflow-hidden shadow-2xl relative">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent 70%),
                                         linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent 70%)`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16">
                    {/* Left Section */}
                    <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                        {/* Brand Name */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent animate-pulse">
                            BROWN CODE
                        </h1>

                        {/* Tagline */}
                        <p className="text-2xl md:text-3xl text-white/90 font-light">
                            Full-Stack Web Developer
                        </p>

                        {/* Services Tags */}
                         <div className="overflow-x-auto lg:overflow-visible scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
                            <div className="flex gap-3 lg:flex-wrap lg:justify-start min-w-max lg:min-w-0">
                                {[
                                    '💻 Web Development',
                                    '🎨 UI/UX Design',
                                    '📱 Responsive Design',
                                    '⚡ Performance',
                                    '🔧 API Integration',
                                    '☁️ Firebase & Vercel'
                                ].map((service, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-sm border border-white/20 hover:bg-white/25 transition-all duration-300 hover:-translate-y-1 cursor-default whitespace-nowrap flex-shrink-0"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center border border-white/20">
                                <div className="text-3xl md:text-4xl font-bold text-yellow-300">5+</div>
                                <div className="text-sm text-white/80 mt-1">Projects</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center border border-white/20">
                                <div className="text-3xl md:text-4xl font-bold text-yellow-300">2+</div>
                                <div className="text-sm text-white/80 mt-1">Years Exp</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center border border-white/20">
                                <div className="text-3xl md:text-4xl font-bold text-yellow-300">70%</div>
                                <div className="text-sm text-white/80 mt-1">Satisfied</div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex gap-5">
                        <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/10 backdrop-blur-md lg:px-3 lg:py-2 max-md:px-2 rounded-full border-2 border-white/20 w-fit mx-auto lg:mx-0">
                            <svg className="w-4 h-4 fill-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                            </svg>
                            <a href="tel:07013725529" className="text-sm md:text-xl font-semibold text-white tracking-wide hover:text-yellow-300 transition-colors">
                                07013725529
                            </a>
                        </div>

                        {/* CTA Button */}
                        <a
                            href="contact"
                            className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-purple-800 lg:px-4 lg:py-2 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-yellow-400/50 w-fit mx-auto lg:mx-0"
                        >
                            Let's Work Together
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                        </div>
                    </div>

                    {/* Right Section - Image */}
                    <div className="flex items-center justify-center relative">
                        <div className="relative w-full max-w-md">
                            {/* Main Image */}
                            <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                                <Image
                                    src="/cod2.png"
                                    alt="Brown Code - Web Developer"
                                    width={400}
                                    height={500}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 animate-bounce">
                                <span className="text-4xl">⚡</span>
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 animate-bounce" style={{animationDelay: '1s'}}>
                                <span className="text-4xl">🚀</span>
                            </div>

                            {/* Code Symbol Decoration */}
                            <div className="absolute top-1/2 -right-8 hidden lg:block">
                                <div className="text-6xl text-white/20 font-mono animate-pulse">
                                    {'</>'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Tech Stack */}
                <div className="relative z-10 px-8 md:px-12 lg:px-16 pb-8">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <p className="text-white/70 text-center mb-4 text-sm font-semibold uppercase tracking-wider">
                            Tech Stack
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['HTML','CSS','JavaScript','React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Firebase',].map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
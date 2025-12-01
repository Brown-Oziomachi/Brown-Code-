"use client"
import React, { useState } from 'react';
import {
    ArrowLeft,
    Code,
    Award,
    Briefcase,
    GraduationCap,
    Heart,
    Coffee,
    Lightbulb,
    Target,
    Zap,
    Users,
    TrendingUp,
    Github,
    Linkedin,
    Mail,
    Download
} from 'lucide-react';

export default function AboutMePage() {
    const [activeTab, setActiveTab] = useState('story');

    const skills = [
        { name: 'React & Next.js', level: 70, color: 'from-blue-500 to-cyan-500' },
        { name: 'Node.js & Vercel', level: 50, color: 'from-green-500 to-emerald-500' },
        { name: 'JavaScript', level: 45, color: 'from-yellow-500 to-orange-500' },
        { name: 'Database Management', level: 70, color: 'from-purple-500 to-pink-500' },
    ];

    const timeline = [
        {
            year: '2022',
            title: 'Full Stack Developer',
            description: 'Specialized in React and Node.js development',
            icon: <Award size={20} />
        },
        {
            year: '2021',
            title: 'Started Programming Journey',
            description: 'Began learning web development and software engineering',
            icon: <GraduationCap size={20} />
        },
    ];

    const values = [
        {
            icon: <Heart size={32} />,
            title: 'Passion',
            description: 'I love what I do and put my heart into every project'
        },
        {
            icon: <Lightbulb size={32} />,
            title: 'Innovation',
            description: 'Always seeking creative solutions to complex problems'
        },
        {
            icon: <Users size={32} />,
            title: 'Collaboration',
            description: 'Working together to achieve extraordinary results'
        },
        {
            icon: <TrendingUp size={32} />,
            title: 'Growth',
            description: 'Continuously learning and improving my craft'
        },
    ];

    const interests = [
        { icon: <Code size={24} />, text: 'Coding' },
        { icon: <Coffee size={24} />, text: 'Coffee' },
        { icon: <Zap size={24} />, text: 'Tech Innovation' },
        { icon: <Target size={24} />, text: 'Problem Solving' },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-purple-500/5 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <nav className="relative z-10 border-b border-purple-500/20 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-xl font-bold  bg-gradient-to-r from-cyan-600 to-cyan-600 bg-clip-text text-transparent">
                            {"<Brown Code />"}
                        </div>
                        <a
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border border-cyan-500/30 rounded-xl  hover:bg-purple-500/30 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Home</span>
                        </a>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    {/* Image Section */}
                    <div className="relative order-1 md:order-1">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-cyan-600 to-cyan-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
                            <div className="relative bg-slate-800/50 backdrop-blur-xl p-4 border border-purple-500/20 overflow-hidden">
                                <img
                                    src="/brown.jpg"
                                    alt="Brown Oziomachi"
                                    className="w-full h-auto object-cover"
                                />
                                {/* Overlay badge */}
                                <div className="absolute bottom-8 left-8 right-8 bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg">Brown Oziomachi</h3>
                                            <p className="text-cyan-400 text-sm">Full Stack Developer</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <a href="https://github.com/Brown-Oziomachi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors">
                                                <Github size={18} />
                                            </a>
                                            <a href="https://www.linkedin.com/in/brownoziomachi72a5a3229" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors">
                                                <Linkedin size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/20 text-center">
                                <div className="text-2xl font-bold text-cyan-400">2+</div>
                                <div className="text-xs text-gray-400 mt-1">Years Exp</div>
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 border border-pink-500/20 text-center">
                                <div className="text-2xl font-bold text-cyan-400">5+</div>
                                <div className="text-xs text-gray-400 mt-1">Projects</div>
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/20 text-center">
                                <div className="text-2xl font-bold text-cyan-400">100%</div>
                                <div className="text-xs text-gray-400 mt-1">Satisfied</div>
                            </div>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="order-2 md:order-2">
                        <span className="text-cyan-400 font-semibold text-sm tracking-wider uppercase">
                            About Me
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
                            Passionate
                            <br />
                            <span className=" bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
                                Developer
                            </span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                            Hello! I'm Brown Oziomachi, a full stack web developer passionate about creating exceptional digital experiences. With over 2 years of experience in the field, I specialize in building modern, responsive, and user-friendly web applications.
                        </p>
                        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                            I specialize in JavaScript ecosystems (React, Next.js) and
                            backend services (Node.js, Firebase). I enjoy combining
                            design-first thinking with engineering rigor to make products
                            that feel delightful and perform well.
                        </p>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            I believe in the power of technology to transform ideas into reality. My approach combines technical expertise with creative problem-solving to deliver solutions that not only meet but exceed expectations.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4 flex-wrap">
                            <a
                                href="/contact"
                                className="px-8 py-4  bg-gradient-to-r from-cyan-600 to-cyan-800-600 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                            >
                                Get In Touch
                            </a>
                            <a
                                href="/cv"
                                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-cyan-400/50 rounded-2xl font-semibold hover:bg-purple-400/10 hover:border-purple-400 transition-all"
                            >
                                <Download size={20} />
                                Download CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-12">
                    <div className="flex gap-4 border-b border-cyan-500/20 mb-8 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`px-6 py-3 font-semibold whitespace-nowrap transition-all ${activeTab === 'story'
                                    ? 'text-cyan-400 border-b-2 border-cyan-900'
                                    : 'text-gray-400 hover:text-purple-300'
                                }`}
                        >
                            My Story
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`px-6 py-3 font-semibold whitespace-nowrap transition-all ${activeTab === 'skills'
                                    ? 'text-cyan-400 border-b-2 border-cyan-900'
                                    : 'text-gray-400 hover:text-purple-300'
                                }`}
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => setActiveTab('journey')}
                            className={`px-6 py-3 font-semibold whitespace-nowrap transition-all ${activeTab === 'journey'
                                    ? 'text-cyan-400 border-b-2 border-cyan-900'
                                    : 'text-gray-400 hover:text-purple-300'
                                }`}
                        >
                            Journey
                        </button>
                        <button
                            onClick={() => setActiveTab('values')}
                            className={`px-6 py-3 font-semibold whitespace-nowrap transition-all ${activeTab === 'values'
                                    ? 'text-cyan-400 border-b-2 border-cyan-900'
                                    : 'text-gray-400 hover:text-purple-300'
                                }`}
                        >
                            Values
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-96">
                        {/* My Story Tab */}
                        {activeTab === 'story' && (
                            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <div className="w-1 h-8 bg-gradient-to-t from-cyan-400 to-cyan-800 rounded-full"></div>
                                        The Beginning
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        My journey into web development started with curiosity and a laptop. I was fascinated by how websites worked and decided to learn how to build them myself. What started as a hobby quickly became a passion.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        I spent countless hours learning, experimenting, and building projects. Each line of code was a step forward in my journey, and each project taught me something new.
                                    </p>
                                </div>

                                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-cyan-900 rounded-full"></div>
                                        Today
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        Today, I'm a full stack developer with expertise in modern web technologies. I specialize in React, Next.js, Node.js, and database management. I've worked on numerous projects ranging from e-commerce platforms to news websites.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        My goal is to continue growing as a developer while helping businesses and individuals bring their digital visions to life through clean, efficient, and scalable code.
                                    </p>
                                </div>

                                <div className="md:col-span-2 bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border border-cyan-500/30 rounded-3xl p-8">
                                    <h3 className="text-2xl font-bold mb-4">What Drives Me</h3>
                                    <p className="text-gray-300 leading-relaxed mb-6">
                                        I'm driven by the challenge of solving complex problems and the satisfaction of seeing a project come to life. There's something magical about turning an idea into a functional, beautiful web application that people can use and enjoy.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {interests.map((interest, index) => (
                                            <div key={index} className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-3 border border-purple-500/20">
                                                <div className="text-cyan-400">{interest.icon}</div>
                                                <span className="text-sm font-medium">{interest.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Skills Tab */}
                        {activeTab === 'skills' && (
                            <div className="animate-fade-in">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">Technical Expertise</h3>
                                    <p className="text-gray-400">
                                        A comprehensive overview of my technical skills and proficiency levels
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {skills.map((skill, index) => (
                                        <div key={index} className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-6">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-semibold">{skill.name}</span>
                                                <span className="text-purple-400 font-bold">{skill.level}%</span>
                                            </div>
                                            <div className="w-full h-3 bg-slate-900/50 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 mt-8">
                                    <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-6  text-center">
                                        <Code size={40} className="text-cyan-400 mx-auto mb-3" />
                                        <h4 className="font-bold mb-2">Frontend</h4>
                                        <p className="text-sm text-gray-400">React, Next.js, Tailwind CSS, HTML, CSS, JavaScript</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-6 text-center">
                                        <Briefcase size={40} className="text-cyan-400 mx-auto mb-3" />
                                        <h4 className="font-bold mb-2">Backend</h4>
                                        <div className='flex gap-1 items-center justify-center'>
                                        <p className="text-sm text-gray-400">Node.js,</p>
                                        <p className="text-sm text-gray-400">Vercel</p>
                                        </div>

                                    </div>
                                    <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-6 text-center">
                                        <Award size={40} className="text-cyan-400 mx-auto mb-3" />
                                        <h4 className="font-bold mb-2">Database</h4>
                                        <p className="text-sm text-gray-400">MongoDB, Firebase, MySQL</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Journey Tab */}
                        {activeTab === 'journey' && (
                            <div className="animate-fade-in">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">My Professional Journey</h3>
                                    <p className="text-gray-400">
                                        Key milestones and achievements throughout my career
                                    </p>
                                </div>

                                <div className="relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-8 top-0 bottom-0 w-0.5  bg-gradient-to-r from-cyan-600 to-cyan-800-600 border-1 border-cyan-400"></div>

                                    <div className="space-y-8">
                                        {timeline.map((item, index) => (
                                            <div key={index} className="relative pl-20">
                                                {/* Timeline dot */}
                                                <div className="absolute left-6 top-6 w-5 h-5 bg-gradient-to-br from-can-500 to-cyan-800 rounded-full border-4 border-cyan-700"></div>
                                                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="text-cyan-400 font-bold text-sm mb-1">{item.year}</div>
                                                            <h4 className="text-xl font-bold">{item.title}</h4>
                                                        </div>
                                                        <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-300">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Values Tab */}
                        {activeTab === 'values' && (
                            <div className="animate-fade-in">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">Core Values</h3>
                                    <p className="text-gray-400">
                                        The principles that guide my work and approach to development
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {values.map((value, index) => (
                                        <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                {value.icon}
                                            </div>
                                            <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                                            <p className="text-gray-300 leading-relaxed">{value.description}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-500/20">
                                    <h4 className="text-xl font-bold mb-4">Let's Create Something Amazing</h4>
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        I'm always excited to take on new challenges and collaborate on interesting projects. Whether you have a specific project in mind or just want to discuss ideas, I'd love to hear from you.
                                    </p>
                                    <div className="flex gap-4 flex-wrap">
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center gap-2 px-6 py-3  bg-gradient-to-r from-cyan-600 to-cyan-800-600 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                                        >
                                            <Mail size={20} />
                                            Contact Me
                                        </a>
                                        <a
                                            href="https://github.com/Brown-Oziomachi"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-cyan-400/50 rounded-xl font-semibold hover:bg-purple-400/10 hover:border-purple-400 transition-all"
                                        >
                                            <Github size={20} />
                                            View GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800 py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Brown Code. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
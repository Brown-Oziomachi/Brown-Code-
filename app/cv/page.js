"use client"
import React from 'react';
import { Printer } from 'lucide-react';

export default function CVResume() {
    const handlePrint = () => {
        window.print();
    };

    const skills = [
        { name: 'HTML & CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React.js', level: 88 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Node.js', level: 75 },
        { name: 'Firebase', level: 80 },
    ];

    const experiences = [
        {
            title: 'THE CYCLOPEDIA',
            period: '2025 - NOW',
            description: 'Modern digital media and knowledge platform designed to inform, educate, and inspire global audiences. Brings together news, articles, blogs, and videos across multiple categories including politics, business, technology, science, entertainment, and culture. Built with React, Next.js, Tailwind CSS, and Firebase for fast, interactive, and visually engaging experiences. Delivers real-time content to readers worldwide with optimized performance, SEO, and responsive design.'
        },
        {
            title: 'PERSONAL PORTFOLIO WEBSITE',
            period: '2025',
            description: 'Showcases innovative projects and demonstrates proficiency in modern web technologies. Features responsive design and interactive elements using React.js, Next.js, and Tailwind CSS. Highlights technical skills, project work, and professional experience with clean UI/UX design. Demonstrates ability to create scalable solutions with strong design principles and maintainable code.'
        },
        {
            title: 'WEB DEVELOPMENT TRAINING',
            period: '2024 - 2025',
            description: 'Completed comprehensive training in modern frontend development at EarlyCode Institute. Specialized in React.js and Next.js frameworks. Gained hands-on experience in building production-ready web applications, implementing best practices, and working with modern development tools and workflows.'
        },
    ];

    const education = [
        {
            title: 'CERTIFICATE IN WEB DEVELOPMENT',
            period: '2024 - 2025',
            description: 'EarlyCode Institute - Specialized in React.js & Next.js. Comprehensive training in modern frontend development technologies, frameworks, and best practices for building production-ready web applications.'
        },
        {
            title: 'SENIOR SECONDARY CERTIFICATE',
            period: '2009 - 2014',
            description: 'Star Brain Secondary School - WAEC/NECO Certification'
        },
        {
            title: 'PRIMARY SCHOOL CERTIFICATE',
            period: '2003 - 2008',
            description: 'Star Brain Primary School - First School Leaving Certificate'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <style jsx global>{`
        @media print {
          body {
            padding: 0;
            background: white;
          }
          .print-button {
            display: none !important;
          }
          .resume-container {
            box-shadow: none !important;
            max-width: 100% !important;
          }
        }
      `}</style>

            {/* Print Button */}
            <button
                onClick={handlePrint}
                className="print-button fixed top-5 right-5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg shadow-lg transition-all hover:-translate-y-1 z-50 flex items-center gap-2"
            >
                <Printer size={20} />
                PRINT TO PDF
            </button>

            {/* Resume Container */}
            <div className="resume-container max-w-6xl mx-auto bg-white shadow-2xl flex flex-col md:flex-row min-h-screen">
                {/* Left Column */}
                <div className="md:w-[35%] bg-gray-800 text-white">
                    {/* Profile Image Section */}
                    <div className="w-full bg-gray-300">
                        <img
                            src="/man.png"
                            alt="Profile"
                            className="w-full h-80 object-cover"
                        />
                    </div>

                    {/* Left Content */}
                    <div className="px-10 py-12">
                        {/* About Me Section */}
                        <h2 className="text-2xl tracking-[6px] uppercase text-gray-500 mb-8">
                            ABOUT ME
                        </h2>
                        <p className="text-gray-400 leading-7 text-sm mb-5">
                            A passionate and detail-oriented Frontend Developer skilled in building responsive, user-focused web applications.
                            Proficient in React.js, Next.js, and Tailwind CSS.
                        </p>
                        <p className="text-gray-400 leading-7 text-sm mb-8">
                            Committed to writing clean, maintainable code and implementing modern UI design principles. Experienced in creating
                            scalable solutions that combine strong UI/UX design with robust code architecture.
                        </p>

                        {/* Skills Section */}
                        <h2 className="text-2xl tracking-[6px] uppercase text-gray-500 mb-8 mt-12">
                            SKILLS
                        </h2>
                        <div className="space-y-5">
                            {skills.map((skill, index) => (
                                <div key={index}>
                                    <div className="text-sm text-gray-400 mb-2.5">{skill.name}</div>
                                    <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gray-400 rounded-full"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="md:w-[65%] px-12 py-14">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-wider uppercase">
                            <span className="inline-block px-4 py-1 -ml-4">
                                BROWN OZIOMACHI
                            </span>
                        </h1>
                        <div className="text-gray-600 text-sm leading-7">
                            <div className="mb-1">Block 81, Jaji Street, Kubwa, Abuja, Nigeria</div>
                            <div className="mb-1">phone: 07013725529</div>
                            <div>email: browncemmanuel@gmail.com</div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <h2 className="text-3xl tracking-[8px] uppercase text-gray-500 mb-8">
                        EXPERIENCE
                    </h2>
                    <div className="space-y-10">
                        {experiences.map((exp, index) => (
                            <div key={index}>
                                <div className="text-base tracking-[3px] uppercase text-gray-600 mb-3">
                                    {exp.title} {exp.period && `(${exp.period})`}
                                </div>
                                <p className="text-gray-600 leading-7 text-sm">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Education Section */}
                    <h2 className="text-3xl tracking-[8px] uppercase text-gray-500 mb-8 mt-12">
                        EDUCATION
                    </h2>
                    <div className="space-y-9">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="text-base tracking-[3px] uppercase text-gray-600 mb-3">
                                    {edu.title} {edu.period && `(${edu.period})`}
                                </div>
                                <p className="text-gray-600 leading-7 text-sm">
                                    {edu.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
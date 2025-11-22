"use client"
import React, { useState } from 'react';
import {
    Mail,
    User,
    MessageSquare,
    Phone,
    Send,
    ArrowLeft,
    CheckCircle
} from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    // Replace with your WhatsApp number (include country code without +)
    const WHATSAPP_NUMBER = '2347013725529'; // Example: Nigerian number

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Format the message for WhatsApp
            const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}
      `.trim();

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');

            // Optional: Reset form after submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-purple-500/5 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Navigation Bar */}
            <nav className="relative z-10 border-b border-purple-500/20 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Brown Code
                        </div>
                        <a
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-xl border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Home</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Info */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">
                                Get In Touch
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                                Let's Work
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                    Together
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300">
                                Have a project in mind? Fill out the form and I'll get back to you via WhatsApp as soon as possible.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail size={24} className="text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Email</h3>
                                        <p className="text-gray-400">browncemmanuel@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone size={24} className="text-pink-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">WhatsApp</h3>
                                        <p className="text-gray-400">Available 24/7 for urgent inquiries</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <CheckCircle size={24} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Response Time</h3>
                                        <p className="text-gray-400">Usually within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature List */}
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                            <h3 className="font-bold mb-4">Why Contact Me?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span className="text-gray-300">Custom web solutions tailored to your needs</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                    <span className="text-gray-300">Professional and timely communication</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span className="text-gray-300">Competitive pricing and quality work</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                    <span className="text-gray-300">Long-term support and maintenance</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20"></div>
                        <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
                            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

                            <div className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Full Name <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                                            <User size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${errors.name ? 'border-red-500' : 'border-purple-500/30'
                                                } rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email Address <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${errors.email ? 'border-red-500' : 'border-purple-500/30'
                                                } rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Phone Number <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                                            <Phone size={20} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${errors.phone ? 'border-red-500' : 'border-purple-500/30'
                                                } rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500`}
                                            placeholder="+234 801 234 5678"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Subject <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                                            <MessageSquare size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${errors.subject ? 'border-red-500' : 'border-purple-500/30'
                                                } rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500`}
                                            placeholder="Project Inquiry"
                                        />
                                    </div>
                                    {errors.subject && (
                                        <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Message <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.message ? 'border-red-500' : 'border-purple-500/30'
                                            } rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-500 resize-none`}
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                    {errors.message && (
                                        <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
                                >
                                    <span>Send via WhatsApp</span>
                                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-center text-sm text-gray-400">
                                    By submitting this form, you'll be redirected to WhatsApp with your message pre-filled
                                </p>
                            </div>
                        </div>
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
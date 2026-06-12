"use client"
import React, { useState } from 'react';
import {
    Mail,
    User,
    MessageSquare,
    Phone,
    Send,
    ArrowLeft,
    CheckCircle,
    Terminal,
    ShieldAlert,
    Network
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

    // WhatsApp infrastructure endpoint matching your profile number
    const WHATSAPP_NUMBER = '2347013725529';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            newErrors.name = 'Data parsing fail: Name string required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Data parsing fail: Email string required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format exception: Invalid email schema';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Data parsing fail: Telecom pointer required';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Data parsing fail: Subject payload required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Data parsing fail: Core message array required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const whatsappMessage = `
[SYS_SUBMISSION // PORTFOLIO_CONTACT]
-----------------------------------------
*Sender Identity:* ${formData.name}
*Network Pointer:* ${formData.email}
*Telecom Routing:* ${formData.phone}
*Stream Subject:* ${formData.subject}
-----------------------------------------
*Payload Array:*
${formData.message}
            `.trim();

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');

            // Resetting data layers inside current runtime state
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
        <div className="min-h-screen bg-[#090d16] text-slate-300 font-mono antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
            {/* Engineering Grid Layer Underlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

            {/* Top Navigation Frame */}
            <nav className="relative z-10 border-b border-slate-800 bg-[#090d16]/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-cyan-400" />
                        <span className="text-sm font-bold text-white tracking-wider uppercase">
                            BROWN_CODE_SYS // COMMS_GATEWAY
                        </span>
                    </div>
                    <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                    >
                        <ArrowLeft size={14} />
                        <span>SYS.RETURN()</span>
                    </a>
                </div>
            </nav>

            {/* Main Segment Wrapper */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
                <div className="grid md:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Routing Metrics & Info */}
                    <div className="md:col-span-5 space-y-6">
                        <div>
                            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                <span className="w-2 h-2 bg-cyan-500 animate-pulse rounded-none"></span>
                                SOCKET_OPEN // CONNECT_INTERFACE
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase leading-none">
                                Request System <br />
                                <span className="text-slate-500 font-light text-2xl md:text-3xl">Integration</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed border-l-2 border-slate-800 pl-4">
                                Pipe your project dependencies, timeline frameworks, or structural queries directly into my operational workspace. Form submissions are verified and serialized over encrypted WhatsApp protocols.
                            </p>
                        </div>

                        {/* Static Diagnostics Cards */}
                        <div className="space-y-3">
                            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-none">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-slate-950 border border-slate-850 text-cyan-400 shrink-0">
                                        <Mail size={16} />
                                    </div>
                                    <div className="text-xs font-mono">
                                        <div className="font-bold text-white uppercase tracking-wider mb-0.5">SMTP_LINK_POINTER</div>
                                        <div className="text-slate-400">browncemmanuel@gmail.com</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-none">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-slate-950 border border-slate-850 text-cyan-400 shrink-0">
                                        <Network size={16} />
                                    </div>
                                    <div className="text-xs font-mono">
                                        <div className="font-bold text-white uppercase tracking-wider mb-0.5">TELECOM_PROTOCOL</div>
                                        <div className="text-emerald-400">WHATSAPP_HANDSHAKE_24_7</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-none">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-slate-950 border border-slate-850 text-cyan-400 shrink-0">
                                        <CheckCircle size={16} />
                                    </div>
                                    <div className="text-xs font-mono">
                                        <div className="font-bold text-white uppercase tracking-wider mb-0.5">AVERAGE_LATENCY</div>
                                        <div className="text-slate-400">Response loops drop within &lt; 24Hrs</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Architectural Validation Constraints */}
                        <div className="bg-slate-950/60 border border-slate-800 p-4 font-mono">
                            <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">SYSTEM_INTEGRITY_SPECS</h3>
                            <ul className="space-y-2 text-[11px] text-slate-500">
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-cyan-500"></span> [01] Modular component structures optimized for performance
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-cyan-500"></span> [02] Clean asynchronous state routing architectures
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-cyan-500"></span> [03] Strict type checks and scalable schema validations
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Code-Terminal Form Interface */}
                    <div className="md:col-span-7 relative">
                        <div className="border border-slate-800 bg-slate-900/20 backdrop-blur-sm">

                            {/* Terminal Pseudo Control Bar Header */}
                            <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Terminal size={12} className="text-cyan-500" />
                                    COMMS_INPUT_BUFFER.SH
                                </div>
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 rounded-none bg-slate-800"></span>
                                    <span className="w-2 h-2 rounded-none bg-slate-800"></span>
                                    <span className="w-2 h-2 rounded-none bg-cyan-500/40"></span>
                                </div>
                            </div>

                            <div className="p-6 space-y-5">

                                {/* Name Input segment */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        SENDER_IDENTITY_STRING <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-600">
                                            <User size={14} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${errors.name ? 'border-red-500/70 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500/50'} rounded-none text-xs text-white placeholder-slate-700 font-mono focus:outline-none transition-all`}
                                            placeholder="e.g., John Doe"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-400 text-[10px] mt-1.5 font-bold flex items-center gap-1">
                                            <ShieldAlert size={10} /> {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email Input segment */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        NETWORK_SMTP_ADDRESS <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-600">
                                            <Mail size={14} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${errors.email ? 'border-red-500/70 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500/50'} rounded-none text-xs text-white placeholder-slate-700 font-mono focus:outline-none transition-all`}
                                            placeholder="e.g., dev@network.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-400 text-[10px] mt-1.5 font-bold flex items-center gap-1">
                                            <ShieldAlert size={10} /> {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Input segment */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        TELECOM_ROUTING_POINTER <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-600">
                                            <Phone size={14} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${errors.phone ? 'border-red-500/70 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500/50'} rounded-none text-xs text-white placeholder-slate-700 font-mono focus:outline-none transition-all`}
                                            placeholder="e.g., +234 7010000000"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-400 text-[10px] mt-1.5 font-bold flex items-center gap-1">
                                            <ShieldAlert size={10} /> {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Subject Input segment */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        STREAM_SUBJECT_HEADER <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-600">
                                            <MessageSquare size={14} />
                                        </div>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${errors.subject ? 'border-red-500/70 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500/50'} rounded-none text-xs text-white placeholder-slate-700 font-mono focus:outline-none transition-all`}
                                            placeholder="e.g., Architecture Optimization Pipeline"
                                        />
                                    </div>
                                    {errors.subject && (
                                        <p className="text-red-400 text-[10px] mt-1.5 font-bold flex items-center gap-1">
                                            <ShieldAlert size={10} /> {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Message Input segment */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        CORE_PAYLOAD_ARRAY (MESSAGE) <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full px-3.5 py-2.5 bg-slate-950 border ${errors.message ? 'border-red-500/70 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500/50'} rounded-none text-xs text-white placeholder-slate-700 font-mono focus:outline-none transition-all resize-none`}
                                        placeholder="Enter architectural specs, project directives, or system conditions..."
                                    ></textarea>
                                    {errors.message && (
                                        <p className="text-red-400 text-[10px] mt-1.5 font-bold flex items-center gap-1">
                                            <ShieldAlert size={10} /> {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Core Redirection Action Engine Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-none transition-all tracking-wider uppercase flex items-center justify-center gap-2 group"
                                >
                                    <span>INITIATE_REDIRECT(WHATSAPP)</span>
                                    <Send size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>

                                <div className="text-center text-[10px] text-slate-500 leading-normal border-t border-slate-900 pt-3">
                                    [NOTICE] Runtime submission constructs text payloads and redirects execution blocks directly into safe external communication matrices.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer Console Out block */}
            <footer className="relative z-10 border-t border-slate-900 bg-slate-950/60 py-6 mt-16">
                <div className="max-w-6xl mx-auto px-6 text-center text-[10px] font-bold text-slate-600 tracking-widest uppercase font-mono">
                    <p>&copy; {new Date().getFullYear()} BROWN_CODE.SYS. ALL RIGHTS RESERVED. SECURE_BUILD_V2.0.6</p>
                </div>
            </footer>
        </div>
    );
}
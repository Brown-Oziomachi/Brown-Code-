"use client";

const projects = [
    {
        id: 1,
        title: "Cyclopedia News Website",
        description: "A modern news platform with categories, videos, reels and filtering.",
        image: "/the.jpg",
        link: "https://www.thecyclopedia.com.ng",
    },
    {
        id: 2,
        title: "E-Commerce Store/Yotapoint",
        description: "A fully responsive online store with cart, checkout, and admin panel.",
        image: "/yota.jpg",
        link: "https://yotapoint.com/feeds",
    },
    {
        id: 3,
        title: "IJ Stitches Portfolio",
        description: "A clean and animated developer portfolio.",
        image: "/ijs.jpg",
        link: "https://ij-stitches.vercel.app/main",
    },
    {
        id: 3,
        title: "Portfolio Website",
        description: "A clean and animated developer portfolio.",
        image: "/cd.jpg",
        link: "https://browncode.name.ng",
    },
    {
        id: 1,
        title: "Cyclopedia Editor App",
        description: "A modern news platform with categories, videos, reels and filtering.",
        image: "/ed.jpg",
        // link: "https://www.thecyclopedia.com.ng",
    },
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-black px-6 py-20">
            <h1 className="text-4xl font-bold text-center text-white mb-12">
                My Projects
            </h1>

            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-white mb-2">{project.title}</h2>
                            <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                            <a
                                href={project.link}
                                target="_blank"
                                className="inline-block px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition"
                            >
                                Visit Website
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

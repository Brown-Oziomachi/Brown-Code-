"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
} from "firebase/firestore";
import ViewMoreSearchPopup from "../view/page";
import { db2 } from "@/config/firebase.config2";
import Navbar from "@/components/Navbar";

const TechnologyPage = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("blog");

    const createSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const createFullSlug = (title, id) => `${createSlug(title)}--${id}`;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBack = () => {
        router.push("/");
    };

    const scrollToSection = (sectionId) => {
        router.push(`/#${sectionId}`);
    };

    useEffect(() => {
        const fetchTechnologyPosts = async () => {
            try {
                const postsRef = collection(db2, "blogs");

                let q = query(
                    postsRef,
                    where("category", "==", "technology"),
                    orderBy("createdAt", "desc"),
                    limit(6)
                );

                let querySnapshot;

                try {
                    querySnapshot = await getDocs(q);
                } catch (err) {
                    console.warn("Fallback: missing index.");

                    q = query(postsRef, orderBy("createdAt", "desc"), limit(6));
                    querySnapshot = await getDocs(q);
                }

                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTechnologyPosts();
    }, []);

    return (
        <>
           <Navbar
                isScrolled={isScrolled}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
     
        <main className="w-full">
            {/* ===== HERO SECTION (Portfolio Style, No Image) ===== */}
            <section className="w-full py-32 text-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
                <p className="uppercase tracking-wider text-xs font-semibold text-blue-300 mb-3">
                    Tech Insights
                </p>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Tomorrow’s World, Built Today
                </h1>

                <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-lg leading-relaxed">
                    Explore ideas, innovation, and deep-tech insights that shape the digital future.
                    Thoughtfully curated articles covering AI, software engineering, web development,
                    clean energy tech, and the technologies transforming our world.
                </p>
            </section>

            {/* ===== POSTS ===== */}
            <div className="max-w-5xl mx-auto py-14 px-4">
                {loading ? (
                    <p className="text-center py-10">Loading latest articles...</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-500">No posts found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/news/${createFullSlug(post.title, post.id)}`}
                                className="group p-6 border border-gray-200
                                hover:border-gray-300 hover:shadow-md bg-white transition"
                            >
                                <p className="text-xs text-blue-600 font-semibold mb-2 uppercase">
                                    Tech
                                </p>

                                <h2 className="text-xl font-bold mb-3 group-hover:text-blue-700 transition text-black">
                                    {post.title}
                                </h2>

                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                    {post.subtitle}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {post.createdAt?.toDate
                                        ? post.createdAt.toDate().toDateString()
                                        : ""}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}

            </div>
            </main>
        </>
    );
};

export default TechnologyPage;

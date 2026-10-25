import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/app/data/gallery";
import GalleryClient from "./GalleryClient";
import Footer from "@/components/footer";
import styles from "./gallery.module.css";

export const metadata = {
    title: "Gallery | Why Sir Brown AD Teaches Fraud and Scam Awareness",
    description:
        "Photos from Sir Brown AD with the story behind each one: why he teaches fraud and scam awareness in Nigeria.",
    alternates: { canonical: "https://sirbrownad.name.ng/gallery" },
};

export default function GalleryPage() {
    return (
        <div className={styles.page}>
            <main>
                <section className={styles.wrap}>
                    <div className={styles.kicker}>
                        <b>Gallery</b>
                    </div>
                    <h1 className={styles.h1}>
                        <span>Why I teach</span> fraud and scam awareness
                    </h1>
                    <p className={styles.dek}>
                        Every picture here has a story. Tap one to read why I do this work and what I
                        want you to take away from it.
                    </p>

                    <div className={styles.head}>
                        <div>
                            <div className={styles.kicker}>The pictures</div>
                            <h2 className={styles.h2}>{gallery.length} stories</h2>
                        </div>
                        <p className={styles.headNote}>Tap any picture to open its write-up.</p>
                    </div>

                    <GalleryClient items={gallery} />

                    <div className={styles.cta}>
                        <div>
                            <p className={styles.ctaKicker}>Keep learning</p>
                            <h2 className={styles.ctaTitle}>Read the guides behind these pictures</h2>
                        </div>
                        <Link href="/blog" className={`${styles.btn} ${styles.btnSolid}`}>
                            Read all articles <ArrowRight size={13} />
                        </Link>
                    </div>
                    <div className={styles.end} />
                </section>
            </main>
            <Footer />
        </div>
    );
}
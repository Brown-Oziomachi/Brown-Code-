// app/services/[slug]/page.jsx
import { notFound } from "next/navigation";
import { getAllServiceSlugs, getServiceBySlug } from "@/app/data/services";
import ServiceDetail from "@/components/services/ServiceDetail";

export function generateStaticParams() {
    return getAllServiceSlugs().map((slug) => ({ slug }));
}

// NOTE: in Next.js 15+, `params` is a Promise and must be awaited —
// reading `params.slug` directly (without awaiting) silently returns
// `undefined`, which is why every service page was 404-ing.
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) return {};
    return {
        title: `${service.title} | Sir Brown AD`,
        description: service.tagline,
    };
}

export default async function ServiceSlugPage({ params }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) notFound();

    return (
        <main>
            <ServiceDetail service={service} />
        </main>
    );
}
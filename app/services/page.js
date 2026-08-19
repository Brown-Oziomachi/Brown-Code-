// app/services/page.jsx
import ServicesSection from "@/components/services/ServicesSection";

export const metadata = {
    title: "Services | Sir Brown AD",
    description:
        "Web development, redesigns, SEO, e-commerce, custom web applications and the infrastructure behind them.",
};

export default function ServicesPage() {
    return (
        <main>
            <ServicesSection mode="full" />
        </main>
    );
}
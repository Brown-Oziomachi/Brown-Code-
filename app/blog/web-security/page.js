import WebSecurityClient from "./WebSecurityClient";
import { webSecurityArticles } from "@/app/data/webSecurityArticles";

export const metadata = {
    title: "Web Application Security | Sir-AD Blog",
    description:
        "Plain-language guides to web application security: XSS, CSRF, injection, authentication, sessions and API security, with examples you can practise safely.",
    alternates: { canonical: "/blog/web-security" },
    openGraph: {
        title: "Web Application Security | Sir-AD Blog",
        description:
            "How web apps get attacked and how to build them to resist it, explained in plain language by Sir Brown AD.",
        url: "/blog/web-security",
        type: "website",
    },
};

export default function WebSecurityPage() {
    return <WebSecurityClient articles={webSecurityArticles} />;
}
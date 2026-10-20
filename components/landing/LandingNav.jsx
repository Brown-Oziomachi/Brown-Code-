import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingNav() {
  return (
    <header className="lp-nav">
      <div className="lp-nav__inner">
        <Link href="/" className="lp-nav__brand">
          brown<em>.</em>dev
        </Link>
        <nav className="lp-nav__links" aria-label="Main">
          <Link
            href="/brown-code/hire-web-developer-abuja"
            className="lp-nav__link lp-nav__hide"
          >
            Pricing
          </Link>
          <Link href="/portfolio" className="lp-nav__link lp-nav__hide">
            Portfolio
          </Link>
          <Link href="/services" className="lp-nav__link lp-nav__hide">
            Services
          </Link>
          <Link href="/faq" className="lp-nav__link lp-nav__hide">
            FAQ
          </Link>
          <Link href="/terms" className="lp-nav__link lp-nav__hide">
            Terms
          </Link>
          <Link href="/bc/contact" className="lp-btn lp-btn--solid lp-btn--sm">
            Start a project <ArrowRight size={12} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

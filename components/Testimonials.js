"use client";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    feedback: "Working with Brown was a fantastic experience. The platform is smooth, responsive, and professional.",
    initial: "SJ",
  },
  {
    name: "Victor Erukpe",
    role: "Furniture · DrWood",
    feedback: "I loved the attention to detail and clean design. Highly recommend Brown for web development projects.",
    initial: "VE",
  },
  {
    name: "Joel Onyi",
    role: "IJ Stitches",
    feedback: "He really understood the vision of IJ Stitches and delivered a website that perfectly represents my brand.",
    initial: "JO",
  },
];

export default function Testimonials() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

                .tm-section {
                    --tm-ink: #111111; --tm-ink-2: #3f3f3f; --tm-ink-3: #6f6f6f;
                    --tm-rule: #e4e2da; --tm-paper-2: #f6f5f0;
                    --tm-accent: #e8ff47; --tm-on: #0a0a0b;
                    --tm-serif: 'Playfair Display', Georgia, serif;
                    --tm-sans: 'Inter', system-ui, sans-serif;
                    --tm-mono: 'JetBrains Mono', 'Fira Code', monospace;
                    font-family: var(--tm-sans); color: var(--tm-ink);
                    scroll-margin-top: 80px;
                }
                .tm-section *, .tm-section *::before, .tm-section *::after { box-sizing: border-box; }
                .tm-section h2, .tm-section p { margin: 0; }
                .tm-inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

                .tm-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 12px; border-top: 3px solid var(--tm-ink); margin-bottom: 30px; }
                .tm-kicker { font-family: var(--tm-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--tm-ink-3); margin-bottom: 10px; }
                .tm-kicker b { background: var(--tm-accent); color: var(--tm-on); padding: 2px 7px; font-weight: 500; }
                .tm-heading { font-family: var(--tm-serif); font-weight: 800; font-size: clamp(28px, 4vw, 42px); line-height: 1.1; letter-spacing: -0.01em; }
                .tm-note { font-size: 14px; line-height: 1.6; color: var(--tm-ink-2); max-width: 340px; }

                .tm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                @media (max-width: 860px) { .tm-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 560px) { .tm-grid { grid-template-columns: 1fr; } }

                .tm-card { background: #fff; border: 1px solid var(--tm-ink); padding: 24px; display: flex; flex-direction: column; gap: 18px; transition: transform 0.2s, box-shadow 0.2s; }
                .tm-card:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--tm-accent); }
                .tm-mark { font-family: var(--tm-serif); font-weight: 800; font-size: 56px; line-height: 0.6; height: 28px; background: linear-gradient(transparent 62%, var(--tm-accent) 62%); width: fit-content; padding-right: 6px; }
                .tm-quote { font-size: 15px; color: var(--tm-ink-2); line-height: 1.75; flex: 1; }
                .tm-author { display: flex; align-items: center; gap: 12px; padding-top: 16px; border-top: 1px solid var(--tm-rule); }
                .tm-avatar { width: 40px; height: 40px; background: var(--tm-accent); border: 1.5px solid var(--tm-ink); display: flex; align-items: center; justify-content: center; font-family: var(--tm-mono); font-size: 11px; font-weight: 600; color: var(--tm-on); flex-shrink: 0; }
                .tm-name { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
                .tm-role { font-family: var(--tm-mono); font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--tm-ink-3); }

                @media (max-width: 640px) { .tm-inner { padding: 0 18px; } }
                @media (prefers-reduced-motion: reduce) { .tm-section * { transition: none !important; } }
            `}</style>

      <section id="testimonials" className="tm-section">
        <div className="tm-inner">
          <div className="tm-head">
            <div>
              <div className="tm-kicker"><b>Client feedback</b></div>
              <h2 className="tm-heading">What people say</h2>
            </div>
            <p className="tm-note">Kind words from people I have built websites and platforms for.</p>
          </div>

          <div className="tm-grid">
            {testimonials.map((t) => (
              <figure key={t.name} className="tm-card" style={{ margin: 0 }}>
                <span className="tm-mark" aria-hidden="true">&ldquo;</span>
                <blockquote className="tm-quote" style={{ margin: 0 }}>{t.feedback}</blockquote>
                <figcaption className="tm-author">
                  <div className="tm-avatar">{t.initial}</div>
                  <div>
                    <div className="tm-name">{t.name}</div>
                    <div className="tm-role">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
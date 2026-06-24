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
        .tm-section {
          padding: 72px 24px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .tm-inner { max-width: 1120px; margin: 0 auto; }
        .tm-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--text-3); margin-bottom: 20px;
        }
        .tm-eyebrow__dot {
          width: 5px; height: 5px;
          background: var(--accent); border-radius: 50%;
        }
        .tm-heading {
          font-family: var(--serif);
          font-size: clamp(26px, 3.5vw, 40px);
          color: var(--text-1); margin-bottom: 40px; line-height: 1.1;
        }
        .tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 860px) { .tm-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .tm-grid { grid-template-columns: 1fr; } }

        .tm-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 24px;
          display: flex; flex-direction: column; gap: 16px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .tm-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }

        .tm-quote {
          font-size: 13px; color: var(--text-2); line-height: 1.75;
          font-weight: 300; flex: 1;
          border-left: 2px solid var(--accent-bdr, rgba(232,255,71,0.25));
          padding-left: 14px;
        }
        .tm-author { display: flex; align-items: center; gap: 12px; }
        .tm-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--accent-dim, rgba(232,255,71,0.08));
          border: 1px solid rgba(232,255,71,0.25);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono); font-size: 10px; font-weight: 600;
          color: var(--accent); flex-shrink: 0;
        }
        .tm-name {
          font-size: 13px; font-weight: 600; color: var(--text-1);
          margin-bottom: 2px;
        }
        .tm-role {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-3);
        }
      `}</style>

      <section id="testimonials" className="tm-section">
        <div className="tm-inner">
          <div className="tm-eyebrow">
            <span className="tm-eyebrow__dot" />
            Client feedback
          </div>
          <h2 className="tm-heading">What people say</h2>
          <div className="tm-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="tm-card">
                <p className="tm-quote">"{t.feedback}"</p>
                <div className="tm-author">
                  <div className="tm-avatar">{t.initial}</div>
                  <div>
                    <div className="tm-name">{t.name}</div>
                    <div className="tm-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
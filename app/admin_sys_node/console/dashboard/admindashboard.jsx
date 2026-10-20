"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from "react";
import {
  LogOut,
  Download,
  Copy,
  Mail,
  BookOpen,
  Newspaper,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth1, db1 } from "@/config/firebase.config1";
import AdminCommentsPanel from "@/components/AdminCommentsPanel";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

// ── Helpers ──
const toDate = (v) => {
  if (!v) return null;
  if (typeof v.toDate === "function") return v.toDate();
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

const normalizeSub = (d, source) => {
  const data = d.data();
  return {
    id: `${source}-${d.id}`,
    source,
    email: (data.email || "").trim().toLowerCase(),
    categories: Array.isArray(data.categories) ? data.categories : [],
    sourceArticles: Array.isArray(data.sourceArticles)
      ? data.sourceArticles
      : [],
    lastSubscribedAt: toDate(
      data.lastSubscribedAt ||
        data.subscribedAt ||
        data.createdAt ||
        data.timestamp,
    ),
  };
};

const formatDate = (d) =>
  d
    ? d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

export default function AdminDashboardClient() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogSubs, setBlogSubs] = useState([]);
  const [newsletterSubs, setNewsletterSubs] = useState([]);
  const [subTab, setSubTab] = useState("all"); // all | blog | newsletter
  const [subSearch, setSubSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Auth guard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth1, (user) => {
      if (user && ADMIN_EMAIL && user.email === ADMIN_EMAIL) setAdmin(user);
      else {
        setAdmin(null);
        router.push("/admin_sys_node/console/dashboard");
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  // Subscribers listeners (blogSubscribers + newsletter)
  useEffect(() => {
    if (!admin) return;
    const unsubBlog = onSnapshot(
      collection(db1, "blogSubscribers"),
      (snap) => setBlogSubs(snap.docs.map((d) => normalizeSub(d, "blog"))),
      (err) => console.error("Blog subscribers load failed:", err),
    );
    const unsubNews = onSnapshot(
      collection(db1, "newsletter"),
      (snap) =>
        setNewsletterSubs(snap.docs.map((d) => normalizeSub(d, "newsletter"))),
      (err) => console.error("Newsletter load failed:", err),
    );
    return () => {
      unsubBlog();
      unsubNews();
    };
  }, [admin]);

  const handleLogout = async () => {
    await signOut(auth1);
    router.push("/admin_sys_node");
  };

  // ── Derived data ──
  const allSubs = [...blogSubs, ...newsletterSubs].sort(
    (a, b) =>
      (b.lastSubscribedAt?.getTime() || 0) -
      (a.lastSubscribedAt?.getTime() || 0),
  );

  const tabSubs =
    subTab === "all" ? allSubs : allSubs.filter((s) => s.source === subTab);

  const uniqueEmails = () => [
    ...new Set(tabSubs.map((s) => s.email).filter(Boolean)),
  ];

  const totalUniqueSubs = new Set(allSubs.map((s) => s.email).filter(Boolean))
    .size;

  const filteredSubscribers = tabSubs.filter((s) => {
    const term = subSearch.trim().toLowerCase();
    if (!term) return true;
    return (
      s.email.includes(term) ||
      s.categories.some((c) => String(c).toLowerCase().includes(term))
    );
  });

  // ── Export ──
  const handleDownloadCSV = () => {
    const emails = uniqueEmails();
    if (!emails.length) return;
    const csv = ["email", ...emails].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${subTab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyEmails = async () => {
    try {
      await navigator.clipboard.writeText(uniqueEmails().join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { label: "Blog", value: blogSubs.length, icon: <BookOpen size={14} /> },
    {
      label: "Newsletter",
      value: newsletterSubs.length,
      icon: <Newspaper size={14} />,
    },
    {
      label: "Unique emails",
      value: totalUniqueSubs,
      icon: <Mail size={14} />,
    },
  ];

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "2px solid #1e1e22",
            borderTopColor: "#e8ff47",
            borderRadius: "50%",
            animation: "ad-spin 0.8s linear infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#52525b",
          }}
        >
          Authenticating…
        </span>
        <style>{`@keyframes ad-spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  if (!admin) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0a0a0b; --surface: #111113; --border: #1e1e22; --border-hi: #2e2e34;
          --text-1: #f4f4f5; --text-2: #a1a1aa; --text-3: #52525b;
          --accent: #e8ff47; --accent-dim: rgba(232,255,71,0.08);
          --radius: 6px;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
          --mono: 'JetBrains Mono', 'Fira Code', monospace;
        }
        @keyframes ad-spin { to { transform: rotate(360deg); } }
        @keyframes ad-pulse { 0%,100%{opacity:1}50%{opacity:0.3} }

        .ad-page { min-height: 100vh; background: var(--bg); color: var(--text-2); font-family: var(--sans); display: flex; flex-direction: column; }

        /* Header */
        .ad-header {
          position: sticky; top: 0; z-index: 50;
          background: rgba(10,10,11,0.95); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          height: 56px; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ad-header__brand { font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; color: var(--text-1); display: flex; align-items: center; gap: 8px; }
        .ad-header__brand-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); animation: ad-pulse 2s ease-out infinite; }
        .ad-header__actions { display: flex; align-items: center; gap: 8px; }
        .ad-logout {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
          padding: 6px 12px; border: 1px solid var(--border); border-radius: var(--radius);
          background: var(--surface); color: var(--text-2); cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .ad-logout:hover { color: #f87171; border-color: rgba(248,113,113,0.3); }

        /* Stats */
        .ad-stats { padding: 16px 24px; border-bottom: 1px solid var(--border); display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
        @media (max-width: 640px) { .ad-stats { grid-template-columns: 1fr; } }
        .ad-stat { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; display: flex; align-items: flex-end; justify-content: space-between; }
        .ad-stat__label { font-family: var(--mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 6px; }
        .ad-stat__val { font-family: var(--serif); font-size: 28px; color: var(--text-1); line-height: 1; }
        .ad-stat__icon { color: var(--accent); }

        /* Main */
        .ad-main { padding: 20px 24px; flex: 1; display: flex; flex-direction: column; gap: 16px; max-width: 1200px; width: 100%; margin: 0 auto; }

        /* Subscribers */
        .ad-subs { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .ad-subs__header {
          padding: 12px 16px; border-bottom: 1px solid var(--border); background: var(--bg);
          display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
        }
        .ad-subs__title { display: flex; align-items: center; gap: 7px; font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
        .ad-subs__title svg { color: var(--accent); }
        .ad-subs__tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .ad-subs__tab {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
          padding: 5px 10px; border-radius: 4px; cursor: pointer;
          border: 1px solid var(--border); background: none; color: var(--text-3);
          transition: color 0.15s, border-color 0.15s;
        }
        .ad-subs__tab:hover { color: var(--text-1); }
        .ad-subs__tab--active { color: var(--accent); border-color: rgba(232,255,71,0.3); background: var(--accent-dim); }
        .ad-subs__actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .ad-subs__search {
          background: var(--surface); border: 1px solid var(--border); border-radius: 4px;
          padding: 5px 10px; font-family: var(--mono); font-size: 10px; color: var(--text-1);
          outline: none; width: 180px; transition: border-color 0.15s;
        }
        .ad-subs__search:focus { border-color: rgba(232,255,71,0.3); }
        .ad-subs__search::placeholder { color: var(--text-3); }
        .ad-subs__btn {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
          padding: 5px 12px; border-radius: 4px; cursor: pointer;
          border: 1px solid var(--border); background: var(--surface); color: var(--text-2);
          transition: opacity 0.15s, color 0.15s, border-color 0.15s;
        }
        .ad-subs__btn:hover:not(:disabled) { color: var(--text-1); border-color: var(--border-hi); }
        .ad-subs__btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .ad-subs__btn--primary { background: var(--accent); border-color: var(--accent); color: #0a0a0b; font-weight: 600; }
        .ad-subs__btn--primary:hover:not(:disabled) { color: #0a0a0b; border-color: var(--accent); opacity: 0.88; }

        .ad-subs__scroll { max-height: 520px; overflow: auto; }
        .ad-subs__table { width: 100%; border-collapse: collapse; min-width: 640px; }
        .ad-subs__table th {
          position: sticky; top: 0; background: var(--bg);
          text-align: left; padding: 9px 16px; border-bottom: 1px solid var(--border);
          font-family: var(--mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); font-weight: 400;
        }
        .ad-subs__table td { padding: 10px 16px; border-bottom: 1px solid var(--border); font-size: 12px; color: var(--text-2); vertical-align: top; }
        .ad-subs__table tr:last-child td { border-bottom: none; }
        .ad-subs__email { color: var(--text-1); font-family: var(--mono); font-size: 11px; word-break: break-all; }
        .ad-subs__cats { display: flex; flex-wrap: wrap; gap: 4px; }
        .ad-subs__cat { font-family: var(--mono); font-size: 9px; padding: 1px 6px; border-radius: 2px; background: var(--accent-dim); border: 1px solid rgba(232,255,71,0.2); color: var(--accent); }
        .ad-subs__date { font-family: var(--mono); font-size: 10px; color: var(--text-3); white-space: nowrap; }
        .ad-subs__src { font-family: var(--mono); font-size: 9px; padding: 1px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.06em; border: 1px solid var(--border-hi); color: var(--text-2); }
        .ad-subs__src--newsletter { color: #4ade80; border-color: rgba(74,222,128,0.25); background: rgba(74,222,128,0.07); }
        .ad-subs__empty { padding: 32px; text-align: center; font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); }
      `}</style>

      <div className="ad-page">
        {/* Header */}
        <header className="ad-header">
          <div className="ad-header__brand">
            <span className="ad-header__brand-dot" />
            brown.dev · admin
          </div>
          <div className="ad-header__actions">
            <button className="ad-logout" onClick={handleLogout}>
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="ad-stats">
          {stats.map((s) => (
            <div key={s.label} className="ad-stat">
              <div>
                <div className="ad-stat__label">{s.label}</div>
                <div className="ad-stat__val">{s.value}</div>
              </div>
              <div className="ad-stat__icon">{s.icon}</div>
            </div>
          ))}
        </div>

        <main className="ad-main">
          {/* Subscribers */}
          <div className="ad-subs">
            <div className="ad-subs__header">
              <div className="ad-subs__title">
                <Mail size={12} /> Subscribers · {allSubs.length}
              </div>

              <div className="ad-subs__tabs">
                {[
                  ["all", `All (${allSubs.length})`],
                  ["blog", `Blog (${blogSubs.length})`],
                  ["newsletter", `Newsletter (${newsletterSubs.length})`],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    className={`ad-subs__tab${subTab === key ? " ad-subs__tab--active" : ""}`}
                    onClick={() => setSubTab(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="ad-subs__actions">
                <input
                  type="text"
                  className="ad-subs__search"
                  placeholder="Search email or category…"
                  value={subSearch}
                  onChange={(e) => setSubSearch(e.target.value)}
                />
                <button
                  className="ad-subs__btn"
                  onClick={handleCopyEmails}
                  disabled={!tabSubs.length}
                >
                  <Copy size={11} /> {copied ? "Copied" : "Copy emails"}
                </button>
                <button
                  className="ad-subs__btn ad-subs__btn--primary"
                  onClick={handleDownloadCSV}
                  disabled={!tabSubs.length}
                >
                  <Download size={11} /> Download CSV
                </button>
              </div>
            </div>

            {filteredSubscribers.length === 0 ? (
              <div className="ad-subs__empty">
                {tabSubs.length === 0 ? "No subscribers yet" : "No matches"}
              </div>
            ) : (
              <div className="ad-subs__scroll">
                <table className="ad-subs__table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Source</th>
                      <th>Categories</th>
                      <th>Articles</th>
                      <th>Last subscribed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscribers.map((s) => (
                      <tr key={s.id}>
                        <td className="ad-subs__email">{s.email}</td>
                        <td>
                          <span
                            className={`ad-subs__src ad-subs__src--${s.source}`}
                          >
                            {s.source}
                          </span>
                        </td>
                        <td>
                          <div className="ad-subs__cats">
                            {s.categories.length === 0 ? (
                              <span className="ad-subs__date">-</span>
                            ) : (
                              s.categories.map((c) => (
                                <span key={c} className="ad-subs__cat">
                                  {c}
                                </span>
                              ))
                            )}
                          </div>
                        </td>
                        <td className="ad-subs__date">
                          {s.sourceArticles.length || "-"}
                        </td>
                        <td className="ad-subs__date">
                          {formatDate(s.lastSubscribedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <AdminCommentsPanel />
        </main>
      </div>
    </>
  );
}

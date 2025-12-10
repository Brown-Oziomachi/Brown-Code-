"use client";
import dynamic from "next/dynamic";

// Import from components folder
const AdminDashboard = dynamic(() => import("@/components/AdminDashboard"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  ),
});

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}

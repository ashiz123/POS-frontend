import React, { useState } from "react";
import {
  ArrowLeft,
  Book,
  ShieldCheck,
  MonitorPlay,
  Package,
  Users,
  TerminalSquare,
  AlertTriangle,
} from "lucide-react";

const documentationData = [
  {
    id: "introduction",
    title: "Introduction",
    icon: <Book className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
          System Overview
        </h2>
        <p className="text-lg text-slate-400 leading-relaxed">
          Welcome to the official system manual for Nodal POS POS. This platform
          is a cloud-native, multi-tenant Point of Sale system built on the MERN
          stack. It is designed to handle high-volume retail transactions,
          secure terminal access, and real-time inventory synchronization.
        </p>
        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mt-8">
          <h4 className="text-blue-400 font-semibold mb-2">
            Current Version: v1 Demo
          </h4>
          <p className="text-slate-400 text-sm">
            This documentation covers the core workflows currently active in the
            v1 deployment. AI-integrated analytics and predictive stock
            forecasting modules are currently in development.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "admin-setup",
    title: "Admin & Business Setup",
    icon: <ShieldCheck className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Admin Workflow & Security
        </h2>
        <p className="text-slate-400 leading-relaxed">
          The administrative dashboard is the control center for your entire
          retail operation. Due to our multi-tenant architecture, security and
          isolation are prioritized.
        </p>
        <div className="space-y-8 mt-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              1. Registration & OTP
            </h3>
            <p className="text-slate-400 leading-relaxed">
              New business owners must register and verify their email
              addresses. Upon successful email verification, access to the
              platform requires OTP (One-Time Password) authentication to
              prevent unauthorized access to financial data.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              2. Business Approval Pipeline
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Creating a business profile does not instantly grant platform
              access. To ensure multi-tenant security, the system super-admin
              must manually review and approve your business entity before your
              dashboard becomes fully active.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "employees",
    title: "Employee Management",
    icon: <Users className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Managing Your Team
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Staff management is Nodal POSd to ensure cashiers can get to work
          quickly without compromising system security.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-slate-400 mt-6">
          <li>
            <strong className="text-slate-200">Adding Employees:</strong> Admins
            can invite employees via the dashboard.
          </li>
          <li>
            <strong className="text-slate-200">Password Setup:</strong>{" "}
            Employees receive an automated email link to securely set their own
            personal passwords. Admins never see employee passwords.
          </li>
          <li>
            <strong className="text-slate-200">Role-Based Access:</strong>{" "}
            Employees are restricted to Kiosk/Terminal operations and cannot
            access global business settings or raw financial reports.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "kiosk",
    title: "Kiosk & Terminal Operations",
    icon: <TerminalSquare className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Terminal (Kiosk) Setup
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Terminals are physical devices (tablets, registers) authorized to
          process sales. They operate on a strict PIN-based system for
          high-speed shift changes.
        </p>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl mt-6">
          <h4 className="text-white font-semibold mb-4">
            The Terminal Authorization Flow:
          </h4>
          <ol className="list-decimal pl-5 space-y-3 text-slate-400">
            <li>
              Admin initiates a "Terminal Request" from the main dashboard.
            </li>
            <li>
              The system generates a secure, unique{" "}
              <span className="text-blue-400 font-mono">PIN Code</span> for that
              specific register.
            </li>
            <li>
              On the physical device, the employee inputs the PIN to lock that
              browser to your business.
            </li>
            <li>
              Only registered employees of your business can log into that
              specific terminal.
            </li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    id: "pos",
    title: "Point of Sale (POS)",
    icon: <MonitorPlay className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Processing Sales
        </h2>
        <p className="text-slate-400 leading-relaxed">
          The POS interface is stripped down and optimized for speed. It is
          designed to minimize clicks and maximize transaction throughput.
        </p>
        <ul className="space-y-4 text-slate-400 mt-6">
          <li className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 text-sm mt-0.5">
              1
            </div>
            <p>
              <strong className="text-slate-200">Real-Time Search:</strong>{" "}
              Instantly search products by name or SKU barcode scanning.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 text-sm mt-0.5">
              2
            </div>
            <p>
              <strong className="text-slate-200">Cart Management:</strong> Add
              items, adjust quantities, and apply line-item discounts on the
              fly.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 text-sm mt-0.5">
              3
            </div>
            <p>
              <strong className="text-slate-200">Checkout:</strong> Process
              payments. The system immediately communicates with the central
              database to update stock levels globally.
            </p>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "inventory",
    title: "Inventory Tracking",
    icon: <Package className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Stock Management
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Keep your shelves stocked and never miss a sale with real-time global
          inventory tracking.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h4 className="text-white font-semibold mb-2">Stock Addition</h4>
            <p className="text-sm text-slate-400">
              Add new products via the intuitive form. Define SKUs, pricing,
              categories, and initial stock levels.
            </p>
          </div>
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h4 className="text-white font-semibold mb-2">Live Sync</h4>
            <p className="text-sm text-slate-400">
              When an item is sold on Terminal A, Terminal B instantly reflects
              the new lowered stock level.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

const Docs = () => {
  const [activeSection, setActiveSection] = useState(documentationData[0].id);

  // Find the currently active content
  const currentContent = documentationData.find(
    (sec) => sec.id === activeSection,
  )?.content;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
        <div className="text-xl font-bold tracking-tighter text-blue-500">
          Nodal POS Docs.
        </div>
      </nav>

      {/* Under Construction Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-4 px-6 text-center backdrop-blur-sm">
        <h1 className="text-lg md:text-xl font-black text-amber-500 tracking-widest uppercase flex items-center justify-center gap-3">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
          WORKING ON IT, ITS NOT READY
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </h1>
      </div>

      {/* Centered & Bold Main Page Title */}
      <header className="pt-12 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Full System Documentation
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
          Everything you need to know to set up, manage, and scale your business
          using Nodal POS POS.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 md:sticky top-24">
          <div className="mb-6 px-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Table of Contents
            </h3>
            <nav className="space-y-1">
              {documentationData.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <span
                    className={`${activeSection === section.id ? "text-blue-500" : "text-slate-500"}`}
                  >
                    {section.icon}
                  </span>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Need Help Box */}
          <div className="mt-8 mx-3 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
            <h4 className="text-white text-sm font-semibold mb-2">
              Need direct help?
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Our support team is available for setup assistance.
            </p>
            <a
              href="mailto:support@Nodal POSpos.com"
              className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact Support &rarr;
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 lg:p-12 min-h-[600px]">
          {/* Animation wrapper for smooth transitions between sections */}
          <div
            key={activeSection}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {currentContent}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;

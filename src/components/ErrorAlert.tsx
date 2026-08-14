import React from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorAlert({ children }) {
  return (
    <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200/80 text-red-700 p-3.5 rounded-xl text-xs font-medium animate-in fade-in duration-200">
      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
      <span className="flex-1 mt-0.5">{children}</span>
    </div>
  );
}

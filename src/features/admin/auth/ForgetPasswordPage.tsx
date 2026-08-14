import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Mail,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { forgetPassword } from "../../../services/admin/user";
import Logo from "../../../components/Logo";
import ErrorAlert from "../../../components/ErrorAlert";

/**
 * ForgotPasswordPage Component for Nodal POS
 * Allows users to request a password reset email link.
 */
export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Call backend route to trigger email with reset token
      const response = await forgetPassword(email);
      setSuccessMessage(
        response.data?.message ||
          "If an account exists with that email, a reset link has been sent.",
      );
      setEmail("");
    } catch (err: any) {
      const serverMessage =
        err.response?.data?.message ||
        "Failed to send reset link. Please try again later.";
      setError(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
        {/* Nodal POS Branding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-50 border border-cyan-100 rounded-2xl text-cyan-600 mb-3 shadow-sm">
            <Logo />
          </div>
          <div className="text-xl font-bold tracking-tight text-slate-900">
            Nodal <span className="text-cyan-600">POS</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            Forgot Password?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your account's email address and we'll send you a password
            reset link.
          </p>
        </div>

        {error && <ErrorAlert>{error}</ErrorAlert>}

        {successMessage && (
          <div className="mb-5 flex items-start gap-2.5 bg-emerald-50 border border-emerald-200/80 text-emerald-700 p-3.5 rounded-xl text-xs font-medium animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="flex-1">{successMessage}</span>
          </div>
        )}

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="name@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-cyan-600 hover:bg-cyan-700 active:scale-[0.99] disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-cyan-600/20 transition-all text-sm flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Send Reset Link</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center">
          <Link
            to="/business/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-cyan-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-400">
          Nodal POS • Multi-tenant Retail Authentication
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

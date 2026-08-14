import { useState } from "react";
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Home,
} from "lucide-react";
import Logo from "./Logo";

/**
 * Enhanced Reset Password Form Component for Nodal POS
 */
export const ResetPasswordForm = ({
  onSubmit,
  error: externalError,
  success: externalSuccess,
  isLoading = false,
  onGoLogin,
  homeUrl = "/",
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const error = externalError || localError;
  const success = externalSuccess;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (newPassword.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (onSubmit) {
      onSubmit({ newPassword, confirmPassword });
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
            Set New Password
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Please enter and confirm your new secure password below.
          </p>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200/80 text-red-700 p-3.5 rounded-xl text-xs font-medium animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        {/* Successful Reset State: Shows confirmation & Main Page action button */}
        {success ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200/80 text-emerald-700 p-3.5 rounded-xl text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="flex-1">{success}</span>
            </div>

            {onGoLogin ? (
              <button
                type="button"
                onClick={onGoLogin}
                className="w-full bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go to Login page
              </button>
            ) : (
              <a
                href={homeUrl}
                className="w-full bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go to Main Page
              </a>
            )}
          </div>
        ) : (
          /* Form Fields */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                New Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-cyan-600 hover:bg-cyan-700 active:scale-[0.99] disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-cyan-600/20 transition-all text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Navigation Link Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Nodal POS Authentication</span>

          <a
            href={homeUrl}
            className="text-cyan-600 hover:text-cyan-700 font-semibold inline-flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Home Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

import { useState } from "react";
import {
  loginValidation,
  type LoginData,
} from "../../validations/loginValidations";
import useForm from "../../hooks/useForm";
import { loginKiosk } from "../../services/kiosk";
import { useNavigate } from "react-router-dom";
import { useKioskDevice } from "../../hooks/useKioskDevice";

const KioskLogin = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { formData, setFormData, setErrors, handleChange, handleSubmit } =
    useForm<LoginData>(
      {
        email: "",
        password: "",
      },
      loginValidation,
    );

  const { terminal } = useKioskDevice();
  const navigate = useNavigate();

  const submitLoginForm = async (request) => {
    setStatus("loading");
    try {
      const loggedInuser = await loginKiosk(request.data);
      console.log("loggedInuser", loggedInuser);
      if (loggedInuser) {
        setStatus("success");
        setFormData({ email: "", password: "" });
        navigate("/customer/kiosk/main");
      } else {
        setStatus("error");
        setErrors({ root: "Invalid user data received" });
      }
    } catch (err) {
      setStatus("error");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-cyan-50/50">
      <div className="max-w-8xl w-full mx-auto grid justify-items-center">
        {/* Balanced Card Size: Reduced max-width to max-w-md and padding to p-8 */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
          <div className="text-center mb-6">
            {/* Terminal Name Display */}
            {terminal?.name && (
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                {terminal.name}
              </h3>
            )}
            <h1 className="text-2xl font-bold text-slate-900 mb-1.5 tracking-tight">
              Staff Sign In
            </h1>
            <p className="text-sm text-slate-500">
              Login and your session is recording
            </p>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e, submitLoginForm)}
            className="space-y-4"
          >
            {/* Email Input Group */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider pl-0.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full text-left text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none transition-all"
                placeholder="name@business.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Input Group */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider pl-0.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full text-left text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Adjusted Button Size */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-md shadow-cyan-600/10 active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {status === "loading"
                ? "Verifying Account..."
                : "Authorize & Launch"}
            </button>
          </form>

          {status === "success" && (
            <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 rounded-lg text-sm font-semibold border border-emerald-200 text-center">
              Success! Loading POS Dashboard...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KioskLogin;

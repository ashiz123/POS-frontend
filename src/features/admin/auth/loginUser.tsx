import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  loginValidation,
  type LoginData,
} from "../../../validations/loginValidations";
import useForm from "../../../hooks/useForm";
import { loginUser } from "../../../services/admin/user";
import { useEffect } from "react";
import Logo from "../../../components/Logo";

const LoginUser = () => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  } = useForm<LoginData>(
    {
      email: "",
      password: "",
    },
    loginValidation,
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("location", location);
  }, [location.pathname]);

  const submitLoginForm = async (request) => {
    try {
      console.log("login attempted");
      const result = await loginUser(request.data);

      if (result) {
        setFormData({ email: "", password: "" });
        navigate("/business/user/verify-otp", { replace: true });
      } else {
        setErrors({ root: "Invalid user data received" });
      }
    } catch (err: any) {
      console.log("err", err);
      setErrors({ root: err.response?.data?.message || err.message });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-sans text-slate-800">
      {/* Logo Section */}
      <div className="mb-12 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-widest text-slate-900 leading-none">
              Nodal POS
            </h1>
            <p className="text-sm tracking-[0.3em] font-light text-slate-500 uppercase mt-1">
              Solutions
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-1 gap-8 max-w-xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col">
          <h2 className="text-center font-bold text-slate-700 uppercase tracking-wide mb-6">
            {location.pathname === "/"
              ? " Business & Staff Access"
              : "Kiosk Login"}
          </h2>
          <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 space-y-4">
            <form
              className="space-y-6 w-full"
              onSubmit={(e) => handleSubmit(e, submitLoginForm)}
            >
              {/* Error Header */}
              {errors.root && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded-r-md">
                  <p className="font-bold">Authentication Error</p>
                  <p className="text-sm">{errors.root}</p>
                </div>
              )}

              {/* Email/Username Field */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Email or Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none bg-white transition-all shadow-sm"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 rounded-md border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none bg-white transition-all shadow-sm"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn-primary w-full py-3.5 shadow-lg shadow-cyan-100 font-bold tracking-wide hover:opacity-90 transition-opacity"
              >
                LOGIN
              </button>

              {/* Registration Footer */}
              <div className="text-center text-sm text-slate-600 mt-4">
                Don't have an account?{" "}
                <Link
                  to="/business/user/register"
                  className="text-cyan-600 font-semibold hover:underline"
                >
                  Register now
                </Link>
              </div>
            </form>
          </div>

          {/* {location.pathname === "/" ? (
        <div className="flex flex-col items-center ">
          <span className="italic text-gray-400 text-sm select-none -mb-5">
            User need to register first to create the business account
          </span>
          <Link
            to="/business/user/register"
            className="mt-6 w-full py-3 rounded-md border-2 border-slate-300 text-slate-600 font-bold hover:bg-slate-100 transition-all uppercase text-sm tracking-tighter block text-center"
          >
            Register User
          </Link>
        </div>
      ) : (
        ""
      )} */}
        </div>
      </div>

      <footer className="mt-12 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
        Version 1.0.1 (c) 2026 Nodal POS
      </footer>
    </div>
  );
};

export default LoginUser;

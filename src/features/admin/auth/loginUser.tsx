import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  loginValidation,
  type LoginData,
} from "../../../validations/loginValidations";
import useForm from "../../../hooks/useForm";
import { loginUser } from "../../../services/admin/user";
import { useEffect } from "react";

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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col">
      <h2 className="text-center font-bold text-slate-700 uppercase tracking-wide mb-6">
        {location.pathname === "/" ? " Business & Staff Access" : "Kiosk Login"}
      </h2>
      <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 space-y-4">
        <form
          className="space-y-4"
          onSubmit={(e) => handleSubmit(e, submitLoginForm)}
        >
          {errors.root && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700">
              <p className="font-bold">Error</p>
              <p>{errors.root}</p>
            </div>
          )}

          <div className="relative pb-6">
            <input
              type="text"
              placeholder="Username/Email"
              className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none bg-white transition-all"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
            {errors.email && (
              <span className="absolute error-text">{errors.email}</span>
            )}
          </div>

          <div className="relative pb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none bg-white transition-all"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
            {errors.password && (
              <span className="absolute error-text">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-4 shadow-lg shadow-cyan-100 "
          >
            LOGIN
          </button>
        </form>
      </div>

      {location.pathname === "/" ? (
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
      )}
    </div>
  );
};

export default LoginUser;

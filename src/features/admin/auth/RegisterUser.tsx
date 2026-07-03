import { Link, useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { registerValidation } from "../../../validations/registerValidations";
import { registerUser } from "../../../services/admin/user";
import { type RegisterData } from "../../../validations/registerValidations";
import { ValidationError } from "../../../components/Message";
import Logo from "../../../components/Logo";

const RegisterUser = () => {
  const { formData, setFormData, errors, handleChange, handleSubmit } =
    useForm<RegisterData>(
      {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
      registerValidation,
    );
  const navigate = useNavigate();

  const formSubmit = async (request) => {
    const result = await registerUser(request.data);

    if (result) {
      console.log("Registration successful!", result);
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
      });
      navigate("/business/login");
    } else {
      console.log("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <Logo />
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Start managing your business with Nodal POS
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
          <form
            className="space-y-5"
            onSubmit={(e) => handleSubmit(e, formSubmit)}
          >
            <div className="grid ">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full"
                  className="input-field"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
                {errors.name && (
                  <ValidationError> {errors.name}</ValidationError>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Phone
              </label>
              <input
                type="text"
                placeholder="Phone number"
                className="input-field"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="input-field"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full py-4 shadow-lg shadow-cyan-100 "
              >
                Get Started Free
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-sm text-slate-500">
              Already using Nodal?{" "}
              <Link
                to="/business/login"
                className="font-bold text-cyan-700 hover:text-cyan-800 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Social Proof/Footer */}
        <p className="mt-8 text-center text-[11px] text-slate-400 uppercase tracking-widest leading-loose">
          Trusted by businesses in{" "}
          <span className="text-slate-600 font-bold">Folkestone</span> & Beyond
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessMessage } from "../../../components/Message";
import useForm from "../../../hooks/useForm";
import { activateKiosk } from "../../../services/kiosk/kiosk";
import {
  kioskActivationValidation,
  type KioskActivationType,
} from "../../../validations/kioskActivationValidation";

const KioskActivation = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { handleChange, handleSubmit, formData, setSuccess, success, errors } =
    useForm<KioskActivationType>(
      {
        activationCode: "",
      },
      kioskActivationValidation,
    );

  const navigate = useNavigate();

  const submitForm = async (request) => {
    setStatus("loading");
    const activate = await activateKiosk(request.data);
    console.log("activate", activate);
    if (activate.success === true) {
      setStatus("success");
      setSuccess(true);
      navigate("/customer/kiosk/login");
      return;
    }
    setStatus("error");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Terminal Activation
        </h1>
        <p className="text-slate-500 mb-6 text-sm">
          Enter the 6-character code from your POS device.
        </p>

        <form
          onSubmit={(e) => handleSubmit(e, submitForm)}
          className="space-y-4"
        >
          {success && (
            <SuccessMessage onClose={() => setSuccess(false)}>
              Terminal activated successfully!
            </SuccessMessage>
          )}
          <input
            type="text"
            className="w-full text-center text-black text-2xl tracking-widest p-4 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors uppercase placeholder:text-slate-300"
            placeholder="ABC123"
            name="activationCode"
            value={formData.activationCode}
            onChange={handleChange}
            required
          />
          {errors.activationCode && (
            <span className="error-text">{errors.activationCode}</span>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {status === "loading" ? "Authenticating..." : "Activate Terminal"}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium text-center border border-green-200">
            Terminal activated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default KioskActivation;

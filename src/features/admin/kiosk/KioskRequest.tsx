import { useState } from "react";
import {
  type KioskCreateData,
  kioskCreateValidation,
} from "../../../validations/kioskCreateValidation";

import {
  ArrowLeft,
  Monitor,
  Smartphone,
  Clock,
  Fingerprint,
} from "lucide-react";
import useForm from "../../../hooks/useForm";
import Master from "../../../components/Master";
import { SuccessMessage } from "../../../components/Message";
import { addKiosk } from "../../../services/admin/kiosk";

const KioskRequest = () => {
  const [terminalType, setTerminalType] = useState("desktop");
  const {
    formData,
    setFormData,
    errors,
    handleChange,
    handleSubmit,
    setSuccess,
    success,
  } = useForm<KioskCreateData>(
    {
      name: "",
      note: "",
    },
    kioskCreateValidation,
  );

  const formSubmit = async (request) => {
    try {
      const response = await addKiosk(request.data);
      if (response.success) {
        setFormData({
          name: "",
          note: "",
        });
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Master>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-xl w-full bg-white shadow-xl rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Back Button */}
            <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 font-medium text-sm">
              <ArrowLeft size={16} /> Back to Terminals
            </button>

            {/* Page Title */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-primary-700 tracking-tight">
                Request Kiosk Terminal
              </h2>
              <p className="text-slate-500 mt-2">
                Add a new billing terminal for this business location
              </p>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e, formSubmit)}
              className="space-y-6"
            >
              {success && (
                <SuccessMessage onClose={() => setSuccess(false)}>
                  New kiosk terminal is requested.
                </SuccessMessage>
              )}
              {/* Terminal Name Input */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  Terminal Name *
                </label>
                <div className="relative mt-2">
                  <Monitor
                    className="absolute left-4 top-3.5 text-slate-300"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                    placeholder="e.g., Counter 01"
                  />
                </div>
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  Note
                </label>
                <div className="relative mt-2">
                  <Monitor
                    className="absolute left-4 top-3.5 text-slate-300"
                    size={18}
                  />
                  <input
                    name="note"
                    onChange={handleChange}
                    value={formData.note}
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                    placeholder="e.g., Any note"
                  />
                </div>
              </div>

              {/* Terminal Type Selection */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  Terminal Type
                </label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* Desktop POS */}
                  <div
                    onClick={() => setTerminalType("desktop")}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-2 ${
                      terminalType === "desktop"
                        ? "border-primary-600 bg-blue-50/30 text-primary-600"
                        : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <Monitor
                      size={22}
                      strokeWidth={terminalType === "desktop" ? 2.5 : 2}
                    />
                    <div>
                      <p className="font-bold text-sm text-slate-800">
                        Standard POS
                      </p>
                      <span className="text-xs text-slate-400">
                        For counter desktops & tablets
                      </span>
                    </div>
                  </div>

                  {/* Mobile POS */}
                  <div
                    onClick={() => setTerminalType("mobile")}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-2 ${
                      terminalType === "mobile"
                        ? "border-primary-600 bg-blue-50/30 text-primary-600"
                        : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <Smartphone
                      size={22}
                      strokeWidth={terminalType === "mobile" ? 2.5 : 2}
                    />
                    <div>
                      <p className="font-bold text-sm text-slate-800">
                        Mobile POS
                      </p>
                      <span className="text-xs text-slate-400">
                        For handheld devices & phones
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Approval Workflow Notice */}
              <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl flex items-start gap-3">
                <Clock className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-bold text-amber-900">
                    Requires Admin Activation
                  </p>
                  <p className="text-xs text-amber-700/80 mt-0.5 leading-relaxed">
                    This terminal will remain **Inactive** upon submission. Once
                    the administrator approves the request, a unique **Terminal
                    ID** and secure **Access Key** will be generated
                    automatically.
                  </p>
                </div>
              </div>

              {/* Cookie / Context Notice */}
              <div className="flex items-start gap-2.5 px-2 text-xs text-slate-400 leading-relaxed">
                <Fingerprint
                  size={14}
                  className="text-primary-500 shrink-0 mt-0.5"
                />
                <span>
                  Current session parameters (Business ID) are securely captured
                  via backend context.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-800 shadow-xl shadow-slate-100 active:scale-[0.99] transition-all mt-4"
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* Bottom Footer */}
          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Swift POS • Context-Aware Terminal Setup
            </p>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default KioskRequest;

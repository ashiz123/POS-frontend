import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, BuildingIcon } from "lucide-react";
import useForm from "../../hooks/useForm";
import { registerBusiness } from "../../services/business";
import {
  registerBusinessValidation,
  type BusinessRegisterData,
} from "../../validations/registerBusinessValidation";

const BusinessRegister = () => {
  const navigate = useNavigate();

  const { formData, setFormData, errors, handleChange, handleSubmit } =
    useForm<BusinessRegisterData>(
      {
        name: "",
        address: "",
        businessType: "",
      },
      registerBusinessValidation,
    );

  const formSubmit = async (request) => {
    const createBusiness = await registerBusiness(request.data);
    if (!createBusiness) {
      console.log("Business registration failed.");
      return;
    }
    setFormData({
      name: "",
      address: "",
      businessType: "",
    });
    navigate("/business/select");
  };

  return (
    <div className="min-h-screen bg-white lg:bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white lg:shadow-2xl lg:rounded-[2.5rem] overflow-hidden">
        <div className="p-8 lg:p-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 font-medium text-sm"
          >
            <ArrowLeft size={16} /> Back to selection
          </button>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-primary-700 tracking-tight">
              Register Business
            </h2>
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => handleSubmit(e, formSubmit)}
          >
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                Business Name *
              </label>
              <div className="relative mt-2">
                <Building2
                  className="absolute left-4 top-3.5 text-slate-300"
                  size={18}
                />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-800"
                  placeholder="Nodal Mart"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  Location
                </label>
                <div className="relative mt-2">
                  <MapPin
                    className="absolute left-4 top-3.5 text-slate-500"
                    size={18}
                  />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-800"
                    placeholder="Business location"
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                  />
                  {errors.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  Business Type
                </label>
                <div className="relative mt-2">
                  <BuildingIcon
                    className="absolute left-4 top-3.5 text-slate-300"
                    size={18}
                  />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-800"
                    placeholder="Business type"
                    name="businessType"
                    onChange={handleChange}
                    value={formData.businessType}
                  />
                  {errors.businessType && (
                    <span className="error-text">{errors.businessType}</span>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className="w-full  btn-primary">
              Setup Workspace
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">
            By registering, you agree to Nodal POS Terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegister;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Store, LogOut, PlusCircle, MapPin } from "lucide-react";
import { getBusinessOfAuthUser } from "../../../services/admin/business";
import {
  loginUserWithBusiness,
  logoutUser,
} from "../../../services/admin/user";
import { useAuth } from "../../../hooks/useAuth";

export interface BusinessPropsLean {
  _id: string;
  name: string;
  address: string;
  status: "pending" | "active" | "disabled";
  currency?: string;
  activationToken?: string;
  website?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  deletedAt?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

const SelectBusiness = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [businesses, setBusinesses] = useState<BusinessPropsLean[] | null>([]);
  const { setUser, setBusiness } = useAuth();

  useEffect(() => {
    //userId is not required to get businesses as businessId is coming through accessToken stored in cookies
    const getBusinesses = async () => {
      try {
        const businesses = await getBusinessOfAuthUser();
        setBusinesses(businesses.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBusinesses();
  }, []);

  const successMessage = location.state?.successMessage;

  const selectBusiness = async (biz) => {
    try {
      await loginUserWithBusiness(biz._id);
      setBusiness(biz);

      if (biz) {
        console.log("Navigating with business:", biz._id);
        navigate("/business/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    const data = await logoutUser();

    if (data.success === true) {
      setUser(null);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-end mb-8 px-2">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Nodal<span className="text-primary-600">POS</span>
            </h1>
            <p className="text-slate-500 mt-1">Select your business</p>
          </div>
          <button
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
            onClick={() => logout()}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {successMessage && (
          <div className="alert-success">{successMessage}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Existing Business Cards */}
          {businesses &&
            businesses.map((biz) => (
              <div
                key={biz._id}
                onClick={() => selectBusiness(biz)}
                className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="p-3 w-fit bg-blue-50 rounded-2xl group-hover:bg-primary-600 transition-colors mb-4">
                  <Store
                    className="w-6 h-6 text-primary-600 group-hover:text-white"
                    strokeWidth={2}
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1 group-primary-600 hover:text-primary-600">
                  {biz.name}
                </h3>
                <div className="flex items-center text-slate-400 text-sm mb-6">
                  <MapPin size={14} className="mr-1" />
                  {biz.address}
                </div>
              </div>
            ))}

          {/* Add New Business - Redirects to Register Page */}
          <button
            onClick={() => navigate("/business/add")}
            className="flex flex-col items-center justify-center gap-4 bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl p-6 hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
          >
            <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
              <PlusCircle
                className="w-8 h-8 text-primary-600"
                strokeWidth={1.5}
              />
            </div>
            <div className="text-center">
              <span className="block font-bold text-slate-700">
                Add New Business
              </span>
              <span className="text-xs text-slate-400">
                Register new business
              </span>
            </div>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-12 flex justify-center items-center gap-4 text-slate-300 text-xs font-bold uppercase tracking-widest">
          <span>Secure</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>Cloud Based</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>Nodal Engine</span>
        </div>
      </div>
    </div>
  );
};

export default SelectBusiness;

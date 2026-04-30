import React, { useState } from "react";
import { Building2, ArrowRight, LogOut, Search } from "lucide-react";

// Mock Data: ब्याकेन्डबाट यस्तै डेटा आउँछ
const businesses = [
  {
    id: "1",
    name: "Swift POS - Main Branch",
    role: "Admin",
    location: "Folkestone",
  },
  { id: "2", name: "Hamal Grocery Store", role: "Staff", location: "London" },
  { id: "3", name: "Kathmandu Tech Hub", role: "Manager", location: "Reading" },
];

const BusinessLogin = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (id: string) => {
    console.log("Selected Business ID:", id);
    localStorage.setItem("activeBusinessId", id);
  };

  const filteredBusinesses = businesses.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="p-8  bg-primary-700 text-white text-center">
          <h2 className="text-2xl font-bold">Welcome, Ashiz!</h2>
          <p className="text-blue-100 mt-2">Login your business</p>
        </div>

        <div className="p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Search business..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Business List */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
            {filteredBusinesses.map((biz) => (
              <button
                key={biz.id}
                onClick={() => handleSelect(biz.id)}
                className="w-full group flex items-center p-4 border border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left shadow-sm"
              >
                <div className="bg-gray-100 group-hover:bg-blue-100 p-3 rounded-lg transition-colors">
                  <Building2 className="text-gray-600 group-hover:text-blue-600 size-6" />
                </div>

                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-700">
                    {biz.name}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className="bg-gray-200 px-2 py-0.5 rounded mr-2 uppercase tracking-wider">
                      {biz.role}
                    </span>
                    <span>{biz.location}</span>
                  </div>
                </div>

                <ArrowRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all size-5" />
              </button>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="flex items-center text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              <LogOut className="size-4 mr-2" />
              Switch Account
            </button>
            <p className="text-xs text-gray-400">Swift POS v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;

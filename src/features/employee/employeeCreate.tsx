import { EmployeeService } from "../../services/employee";
import {
  CreateEmployeeValidation,
  type CreateEmployeeData,
  EMPLOYEE_ROLES,
} from "../../validations/employeeValidation";
import useForm from "../../hooks/useForm";
import { SuccessMessage, ValidationError } from "../../components/Message";
import Master from "../../components/Master";

const EmployeeCreate = () => {
  const {
    handleSubmit,
    errors,
    handleChange,
    formData,
    setFormData,
    loading,
    success,
    setSuccess,
  } = useForm<CreateEmployeeData>(
    {
      name: "",
      email: "",
      address: "",
      phone: "",
      role: EMPLOYEE_ROLES[2],
    },
    CreateEmployeeValidation,
  );

  const formSubmit = async (request) => {
    try {
      console.log(request.data);
      const response = await EmployeeService.create(request.data);
      if (response) {
        setFormData({
          name: "",
          email: "",
          address: "",
          phone: "",
          role: EMPLOYEE_ROLES[2],
        });
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Master>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        {/* <div className="mb-6">
          <button
            type="button"
            title="Go back"
            className="text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center gap-2 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Categories
          </button>
        </div> */}

        <div className="text-center mb-10">
          <h1 className="text-2xl font-black tracking-tight text-primary-600">
            Add New Employee
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Add employee with role. Employee must accept the role.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <form
              className="space-y-8"
              onSubmit={(e) => handleSubmit(e, formSubmit)}
            >
              {success && (
                <SuccessMessage onClose={() => setSuccess(false)}>
                  Send request successfully!
                </SuccessMessage>
              )}
              <div className="space-y-6">
                {/* 1. Category Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                    Employee name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter employee name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                {errors.name && (
                  <ValidationError> {errors.name}</ValidationError>
                )}

                {/* 2. Category slug */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                    Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    placeholder="Write the existing email of user"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  {errors.email && (
                    <ValidationError> {errors.email}</ValidationError>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                    Contact
                  </label>
                  <input
                    name="phone"
                    type="text"
                    placeholder="e.g. 07890048881"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  {errors.phone && (
                    <ValidationError> {errors.phone}</ValidationError>
                  )}
                </div>

                {/* 4. Description */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                    Address
                  </label>
                  <input
                    name="address"
                    placeholder="Write full address"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
                    onChange={handleChange}
                    value={formData.address}
                  />
                </div>

                <div className="gap-5">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                      User Role
                    </label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        title="select role"
                        className="input-field appearance-none cursor-pointer pr-10"
                        onChange={handleChange}
                        value={formData.role}
                      >
                        {EMPLOYEE_ROLES.map((role, index) => (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>

                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display on Menu Toggle */}

              {/* Action Buttons */}
              <div className="pt-8 flex gap-4">
                <button
                  type="submit"
                  title="Create Category"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition active:scale-[0.98]"
                >
                  Create Employee
                </button>
                <button
                  type="button"
                  title="Discard"
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default EmployeeCreate;

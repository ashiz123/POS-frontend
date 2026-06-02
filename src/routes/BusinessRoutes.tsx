import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";

import Dashboard from "../features/business/Dashboard";
import ProductList from "../features/products/ProductList";
import ProductCreate from "../features/products/ProductCreate";
import CategoryList from "../features/category/CategoryList";
import OrderList from "../features/Orders/OrderList";
import CategoryCreate from "../features/category/CategoryCreate";
import EmployeeCreate from "../features/employee/employeeCreate";
import ErrorPage from "../components/ErrorPage";
import KioskRequest from "../features/kiosk/KioskRequest";
import SelectBusiness from "../features/business/SelectBusiness";
import BusinessProtectedRoute from "../features/auth/BusinessProtectedRoute";
import AddBusiness from "../features/business/AddBusiness";
import VerifyOTP from "../features/auth/verifyOTP";

const BusinessRoutes = () => {
  return (
    <Routes>
      {/* <Route path="" element={<LandingPage />} />
      <Route path="/user/register" element={<RegisterUser />} /> */}
      <Route path="/user/verify-otp" element={<VerifyOTP />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/select" element={<SelectBusiness />} />
        <Route path="/add" element={<AddBusiness />} />

        {/* Business protected Route */}
        <Route element={<BusinessProtectedRoute />}>
          {/* Resolves to: /dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* product paths resolve to: /product/list etc. */}
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/product/create" element={<ProductCreate />} />

          {/* category paths resolve to: /category/list etc. */}
          <Route path="/category/list" element={<CategoryList />} />
          <Route path="/category/create" element={<CategoryCreate />} />

          {/* orders path resolves to: /orders */}
          <Route path="/orders" element={<OrderList />} />

          {/* employee path resolves to: /employee/create */}
          <Route path="/employee/create" element={<EmployeeCreate />} />
          <Route path="/settings/kiosk/request" element={<KioskRequest />} />
        </Route>
      </Route>

      <Route
        path="/*"
        element={
          <ErrorPage
            title="Page not found"
            code="404"
            message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
          />
        }
      />
    </Routes>
  );
};
export default BusinessRoutes;

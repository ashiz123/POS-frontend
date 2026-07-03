import { Route, Routes } from "react-router-dom";
import Dashboard from "../features/admin/business/Dashboard";
import ProductList from "../features/admin/products/ProductList";
import ProductCreate from "../features/admin/products/ProductCreate";
import CategoryList from "../features/admin/category/CategoryList";
import OrderList from "../features/admin/Orders/OrderList";
import CategoryCreate from "../features/admin/category/CategoryCreate";
import EmployeeCreate from "../features/admin/employee/employeeCreate";
import ErrorPage from "../components/ErrorPage";
import KioskRequest from "../features/admin/kiosk/KioskRequest";
import SelectBusiness from "../features/admin/business/SelectBusiness";
import BusinessProtectedRoute from "../features/admin/auth/BusinessProtectedRoute";
import AddBusiness from "../features/admin/business/AddBusiness";
import VerifyOTP from "../features/admin/auth/verifyOTP";
import ProtectedRoute from "../features/admin/auth/ProtectedRoute";
import Stocks from "../features/admin/products/Stock";
import LoginPage from "../features/admin/LandingPage";
import { PublicRoute } from "../features/admin/auth/PublicRoute";
import RegisterUser from "../features/admin/auth/RegisterUser";

const BusinessRoutes = () => {
  return (
    <Routes>
      {/* <Route path="" element={<LandingPage />} />
      <Route path="/user/register" element={<RegisterUser />} /> */}
      <Route element={<PublicRoute />}>
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

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
          <Route path="/product/:productId/stock" element={<Stocks />} />

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

import { Route, Routes } from "react-router-dom";
import RegisterUser from "../features/auth/RegisterUser";
import LandingPage from "../features/LandingPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";
// import KioskMain from "../features/kiosk/KioskMain";
// import PaymentPage from "../features/kiosk/PaymentPage";
// import ProfilePage from "../features/business/Profile";

import BusinessLogin from "../features/business/BusinessLogin";
import SelectBusiness from "../features/business/SelectBusiness";
import BusinessRegister from "../features/business/BusinessRegister";
import Dashboard from "../features/business/Dashboard";
import BusinessRoute from "../features/auth/BusinessRoute";
import ProductList from "../features/products/ProductList";
import ProductCreate from "../features/products/ProductCreate";
import NotFound from "../features/NotFound";
import CategoryList from "../features/category/CategoryList";
import CategoryCreate from "../features/category/CategoryCreate";

const AppRouter = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<RegisterUser />} />

      <Route element={<ProtectedRoute />}>
        {/* this should allow to create the business account */}
        {/* Kiosk Section */}
        {/* <Route path="/kiosk/main" element={<KioskMain />} />
        <Route path="/kiosk/payment" element={<PaymentPage />} /> */}
        {/* Business  */}
        {/* <Route path="/business/dashboard" element={<Dashboard />} /> */}
        <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/business/select" element={<SelectBusiness />} />
        <Route path="/business/register" element={<BusinessRegister />} />

        {/* <Route path="/business/profile" element={<ProfilePage />} /> */}

        <Route element={<BusinessRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/product/create" element={<ProductCreate />} />

          <Route path="category/list" element={<CategoryList />} />
          <Route path="category/create" element={<CategoryCreate />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;

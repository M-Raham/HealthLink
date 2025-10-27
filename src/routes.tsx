import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "@pages/landing/Home";
import About from "@pages/landing/About";
import Services from "@pages/landing/Services";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import DashboardHome from "@pages/dashboard/home/Page";
import DashboardLayout from "./layouts/DashboardLayout";
import PatientsPage from "@pages/dashboard/patients/Page";
import DoctorsPage from "@pages/dashboard/doctors/Page";
import ReportsPage from "@pages/dashboard/reports/Page";
import BillingPage from "@pages/dashboard/billing/Page";

// A simple ProtectedRoute wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true; // TODO: replace with real auth check (JWT/localStorage/context)

  if (!isAuthenticated) {
    return <Login />; // redirect or render login
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Pages */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/services"
        element={
          <Layout>
            <Services />
          </Layout>
        }
      />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard (Protected) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="billing" element={<BillingPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

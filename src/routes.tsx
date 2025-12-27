import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "@pages/landing/Home";
import About from "@pages/landing/About";
import Services from "@pages/landing/services/Services";
import Cardiology from "@pages/landing/services/Cardiology";
import Neurology from "@pages/landing/services/Neurology";
import Orthopedics from "@pages/landing/services/Orthopedics";
import Pediatrics from "@pages/landing/services/Pediatrics";
import Oncology from "@pages/landing/services/Oncology";
import Diagnostics from "@pages/landing/services/Diagnostics";

import Login from "./auth/Login";
import { useAuth } from "./contexts/useAuth";
import { LoadingSpinner } from "./components/common/LoadingSpinner";

import DashboardHome from "@pages/dashboard/home/Page";
import DashboardLayout from "./layouts/DashboardLayout";
import PatientsPage from "@pages/dashboard/patients/Page";
import DoctorsPage from "@pages/dashboard/doctors/Page";
import ReportsPage from "@pages/dashboard/reports/Page";
import BillingPage from "@pages/dashboard/billing/Page";
import AppointmentsPage from "@pages/dashboard/appointments/Page";
import AvailabilityPage from "@pages/dashboard/availability/Page";
import { AppointmentBookingForm } from "@components/forms/AppointmentBookingForm";

// Protected Route wrapper with proper authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
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
      <Route
        path="/appointment"
        element={
          <Layout>
            <AppointmentBookingForm />
          </Layout>
        }
      />
      {/* Service Details */}
      <Route
        path="/services/cardiology"
        element={
          <Layout>
            <Cardiology />
          </Layout>
        }
      />
      <Route
        path="/services/neurology"
        element={
          <Layout>
            <Neurology />
          </Layout>
        }
      />
      <Route
        path="/services/orthopedics"
        element={
          <Layout>
            <Orthopedics />
          </Layout>
        }
      />
      <Route
        path="/services/pediatrics"
        element={
          <Layout>
            <Pediatrics />
          </Layout>
        }
      />
      <Route
        path="/services/oncology"
        element={
          <Layout>
            <Oncology />
          </Layout>
        }
      />
      <Route
        path="/services/diagnostics"
        element={
          <Layout>
            <Diagnostics />
          </Layout>
        }
      />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />

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
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="billing" element={<BillingPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "@pages/landing/Home";
import About from "@pages/landing/About";
import Services from "@pages/landing/Services";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import DashboardHome from "@pages/dashboard/home/Page";

// A simple ProtectedRoute wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false; // TODO: replace with real auth check (JWT/localStorage/context)

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
      <Route
        path="/login"
        element={
          <Login />
        }
      />
      <Route
        path="/signup"
        element={
          <Signup />
        }
      />

      {/* Dashboard (Protected) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

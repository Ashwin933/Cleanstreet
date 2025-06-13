import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import CleanStreetLandingPage from "pages/clean-street-landing-page";
import AboutUs from "pages/about-us";
import Login from "pages/login";
import Register from "pages/register";
import ReportIssue from "pages/report-issue";
import Feedback from "pages/feedback";
import UserDashboard from "./pages/user-dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; 

const Routes = () => {
  return (
    <BrowserRouter>
        <ScrollToTop />
        <RouterRoutes>
          
          <Route path="/" element={<CleanStreetLandingPage />} />
          <Route path="/clean-street-landing-page" element={<CleanStreetLandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route element={<ProtectedRoute />}>
             <Route path="/report-issue/:id" element={<ReportIssue />} />   
             <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>
           <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
             <Route path="/admin/dashboard" element={<AdminDashboard />} />
           </Route>
        </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all your landing page components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TailoredSolutions from "./components/TailoredSolutions";
import CoreFeatures from "./components/CoreFeatures";
import Testimonials from "./components/Testimonials";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

// Import your pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentPage from "./pages/StudentPage";
import ProfessionalPage from "./pages/ProfessionalPage";
import SeniorCitizenPage from "./pages/SeniorCitizenPage";
import HomemakerPage from "./pages/HomemakerPage";
import RuralUserPage from "../src/pages/RuralPage.jsx";
import CyberShieldFeed from "./components/CyberShieldFeed.jsx";
import Anonymous from "./components/Anonymous.jsx";

import CommunityReputationPage from "./components/CommunityReputation.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Route for the full landing page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <TailoredSolutions />
              <CoreFeatures />
              <Testimonials />
              <FinalCta />
            </>
          }
        />

        {/* Route for the Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the Signup page */}
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/cybershield-feed" element={<CyberShieldFeed />} />
        <Route path="/anonymous" element={<Anonymous />} />
        <Route
          path="/community-reputation"
          element={<CommunityReputationPage />}
        />

        {/* Routes for demographic-based dashboards */}
        <Route path="/student-dashboard" element={<StudentPage />} />
        <Route path="/professional-dashboard" element={<ProfessionalPage />} />
        <Route
          path="/senior-citizen-dashboard"
          element={<SeniorCitizenPage />}
        />
        <Route path="/homemaker-dashboard" element={<HomemakerPage />} />
        <Route path="/rural-user-dashboard" element={<RuralUserPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

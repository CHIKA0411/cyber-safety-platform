import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TailoredSolutions from "./components/TailoredSolutions";
import CoreFeatures from "./components/CoreFeatures";
import Testimonials from "./components/Testimonials";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

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
import CybersecurityChatbot from "./pages/CyberSecurityChatBot.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import APIToolPage from "./pages/APIToolPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cybershield-feed" element={<CyberShieldFeed />} />
        <Route path="/anonymous" element={<Anonymous />} />
        <Route
          path="/community-reputation"
          element={<CommunityReputationPage />}
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professional-dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <ProfessionalPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/senior-citizen-dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <SeniorCitizenPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/homemaker-dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <HomemakerPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/rural-user-dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <RuralUserPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/chatbot" element={<CybersecurityChatbot />} />
        <Route path="/api-tool" element={<APIToolPage />} />.
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

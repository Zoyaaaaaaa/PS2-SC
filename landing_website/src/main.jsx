import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ServiceForm from "./components/ServiceForm";
import { Navbar } from "./components";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import CreateJourney from "./components/CreateJourney";
import UserEnrollment from "./components/UserEnrollment";
import RequestService from "./components/RequestService";
import AccessibleYatrasAndAssistance from "./components/AccessibleYatrasAndAssistance";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-rryae32neledobto.us.auth0.com"
    clientId="e2sUroLKF8dfzQTUHF3QQVaDUzunZRZH"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Router>
      {/* Define the routing here */}
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/service" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-journey" element={<CreateJourney />} />
        <Route path="/enroll" element={<UserEnrollment />} />
        <Route path="/request-service" element={<RequestService />} />
        <Route path="/yatras" element={<AccessibleYatrasAndAssistance />} />
      </Routes>
    </Router>
  </Auth0Provider>
);

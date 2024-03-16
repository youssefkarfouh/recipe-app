import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SharedData } from "./context/SharedData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SharedData>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </SharedData>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);

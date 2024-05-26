import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SharedData } from "./context/SharedData.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <SharedData>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </SharedData>
        </AuthProvider>
      </Router>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>,
);

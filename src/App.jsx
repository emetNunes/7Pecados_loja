import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import "@/styles/globals.css";

import { AnimatePresence } from "framer-motion";
import { Provider } from "./provider.tsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login.jsx";
import StockPage from "./pages/stock.jsx";
import ProductionPage from "./pages/production.jsx";
import ServicePage from "./pages/service.jsx";

function AppWrapper() {
  return (
    <BrowserRouter>
      <Provider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Provider>
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();

  const pagesRoutes = [
    {
      path: "/login",
      routePage: <LoginPage />,
    },
    {
      path: "/",
      routePage: <IndexPage />,
    },
    {
      path: "stock",
      routePage: <StockPage />,
    },
    {
      path: "/production",
      routePage: <ProductionPage />,
    },
    {
      path: "/service",
      routePage: <ServicePage />,
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {pagesRoutes.map((routes) => (
          <Route
            id={routes.routePage}
            element={<ProtectedRoute>{routes.routePage}</ProtectedRoute>}
            path={routes.path}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);

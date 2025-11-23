import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login";
import StockPage from "./pages/stock";
import ProductionPage from "./pages/production";
import ServicePage from "./pages/service.jsx";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<LoginPage />} path="/login" />
        <Route
          element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          }
          path="/"
        />
        <Route
          element={
            <ProtectedRoute>
              <StockPage />
            </ProtectedRoute>
          }
          path="/stock"
        />
        <Route
          element={
            <ProtectedRoute>
              <ProductionPage />
            </ProtectedRoute>
          }
          path="/production"
        />
        <Route
          element={
            <ProtectedRoute>
              <ServicePage />
            </ProtectedRoute>
          }
          path="/service"
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

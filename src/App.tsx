import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login";
import StockPage from "./pages/stock";
import ProductionPage from "./pages/production";
import ServicePage from "./pages/service";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<StockPage />} path="/stock" />
        <Route element={<ProductionPage />} path="/production" />
        <Route element={<ServicePage />} path="/service" />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

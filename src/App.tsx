import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import StockPage from "./pages/stock";
import ProductionPage from "./pages/production";
import ServicePage from "./pages/service";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<StockPage />} path="/stock" />
      <Route element={<ProductionPage />} path="/production" />
      <Route element={<ServicePage />} path="/service" />
    </Routes>
  );
}

export default App;

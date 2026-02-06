import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { Provider } from "./provider.tsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

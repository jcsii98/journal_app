import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// ... (Your existing code remains unchanged)

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* Render other components here, if needed */}
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import App from "./App.jsx";
import "./app.css"; // Jeśli masz tu dodatkowe style

createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);
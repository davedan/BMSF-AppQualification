import { createElement, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AssetsPage } from "./features/assets/AssetsPage";

const rootElement = document.querySelector<HTMLDivElement>("#app");

if (!rootElement) {
  throw new Error("Application root #app was not found");
}

createRoot(rootElement).render(
  createElement(StrictMode, null, createElement(AssetsPage))
);

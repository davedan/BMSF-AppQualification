import { applicationRegistration } from "./app/registration";

const root = document.querySelector<HTMLDivElement>("#app");
if (root) {
  root.textContent =
    applicationRegistration.manifest.identity.name + " satellite bootstrap ready";
}

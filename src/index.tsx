import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { PrimeReactProvider } from "primereact/api";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
);

reportWebVitals();

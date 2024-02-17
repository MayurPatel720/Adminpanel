import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from "primereact/api";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
);

reportWebVitals();

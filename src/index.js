import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BrowserRouter from 'react-router-dom/BrowserRouter'
import App from './App';
import { ThemeProvider } from "@material-tailwind/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	  <ThemeProvider>
		  <BrowserRouter basename={process.env.PUBLIC_URL}>
			  <App />
		  </BrowserRouter>
	  </ThemeProvider>
  </React.StrictMode>
);


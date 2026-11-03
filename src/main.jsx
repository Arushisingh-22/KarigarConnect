import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { FundingProvider } from './context/FundingContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FundingProvider>
          <App />
        </FundingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

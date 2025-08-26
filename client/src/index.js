import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { WordProvider } from './context/WordContext';
import { StatsProvider } from './context/StatsContext';
import { NotificationProvider } from './context/Notification/Notification';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NotificationProvider>
    <AuthProvider>
      <StatsProvider>
        <WordProvider>
          <App />
        </WordProvider>
      </StatsProvider>
    </AuthProvider>
    </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

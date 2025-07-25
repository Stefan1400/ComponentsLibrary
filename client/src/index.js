import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { WordProvider } from './context/WordContext';
import { StatsProvider } from './context/StatsContext';
import { NotificationProvider } from './context/Notification/Notification';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider>
    <AuthProvider>
      <StatsProvider>
        <WordProvider>
          <App />
        </WordProvider>
      </StatsProvider>
    </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>
);

reportWebVitals();

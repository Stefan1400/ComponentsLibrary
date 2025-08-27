import { useState, useEffect, createContext, useContext } from "react";
// const API_URL = process.env.REACT_APP_API_URL;
import { NotificationContext } from "./Notification/Notification";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
   const [user, setUser] = useState(!!localStorage.getItem('user'));

   const { showNotification } = useContext(NotificationContext);

   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
         setIsLoggedIn(true);
         setUser(storedUser);
      }
   }, []);


   const register = async (username, password) => {
      if (!username || !password) return;
      
      try {

         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
         });

         const data = await response.json();

         if (!response.ok) {
            showNotification("Registration failed. Please try again.");
            return;
         }

         if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.user.username);
            localStorage.setItem('userId', data.user.id);
            setUser(username);
            setIsLoggedIn(true);
            showNotification('account successfully created');
            return true;
         }


      } catch (err) {
         console.error("Registration error:", err);
         showNotification("Something went wrong. Please try again later.");
      }
   }

   const login = async (username, password) => {
      
      try {

         const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password })
         });

         if (!res.ok) {
            showNotification("Invalid email or password.");
            return;
         }

         const data = await res.json();

         if (data.token) {
            localStorage.setItem('user', username);
            localStorage.setItem('userId', data.loggedinUser.id);
            localStorage.setItem('token', data.token);
            setUser(username);
            setIsLoggedIn(true);
            return true;
         }

      } catch (err) {
         console.error("Login error:", err);
         showNotification("Login failed. Please try again later.");
      }
   }

   const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setUser('');
      setIsLoggedIn(false);
      return true;
   }

   const deleteAccount = async (password) => {

      const token = localStorage.getItem('token');

      if (!token) {
         showNotification("Unauthorized action.");
         return;
      }

      try {

         const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/deleteAccount`, {
            method: 'DELETE',
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
         });

         if (!res.ok) {
            showNotification("Failed to delete account. Please check your password.");
            return;
         }

         showNotification('account successfully deleted');
         logout();
         return true;

      } catch (err) {
         console.error("Delete account error:", err);
         showNotification("Something went wrong. Try again later.");
      }
   }

   return (
      <AuthContext.Provider value={{ isLoggedIn, user, register, login, logout, deleteAccount }}>
         {children}
      </AuthContext.Provider>
   )
}
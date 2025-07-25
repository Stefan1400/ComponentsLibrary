import { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./Notification/Notification";
// const API_URL = process.env.REACT_APP_API_URL;

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {

   const [myStats, setMyStats] = useState({});

   const { isLoggedIn, user } = useContext(AuthContext);
   const { showNotification } = useContext(NotificationContext);

   // Guest stats - same key as WordContext
   const LOCAL_STORAGE_KEY = 'guest_words';

   const calculateLocalStats = () => {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) {
         setMyStats({
            total_words: 0,
            known_words: 0,
            learning_words: 0
         });
         return;
      }

      const localWords = JSON.parse(stored);

      // Calculate total words
      const totalWords = localWords.length;

      // Calculate known words (where known === true)
      const knownWords = localWords.filter(word => word.known === true).length;

      // Calculate learning words (where known === false)
      const learningWords = localWords.filter(word => word.known === false).length;

      const stats = {
         total_words: totalWords,
         known_words: knownWords,
         learning_words: learningWords
      };

      setMyStats(stats);
   };



   useEffect(() => {
      if (isLoggedIn && user) {
         getAllStats();
      } else {
         calculateLocalStats();
      }
   }, [isLoggedIn, user]);

   const getAllStats = async () => {
      try {
         const userId = localStorage.getItem('userId');

         if (!userId) return;

         const res = await fetch(`${process.env.REACT_APP_API_URL}/api/stats/${userId}`);

         if (!res.ok) {
            showNotification("Failed to fetch stats. Please try again later.");
            throw new Error(`Failed to fetch stats: status ${res.status}`);
         }

         const data = await res.json();
         
         if (data) {
            setMyStats(data);
         }

      } catch (err) {
         console.error("Error fetching stats:", err);
         showNotification("An error occurred while loading stats.");
      }
   }

   const refreshStats = () => {
      if (isLoggedIn && user) {
         getAllStats();
      } else {
         calculateLocalStats();
      }
   };

   // Function to refresh local stats (call this when words are added/updated/deleted)
   const refreshLocalStats = () => {
      if (!isLoggedIn) {
         calculateLocalStats();
      }
   };

   return (
      <StatsContext.Provider value={{
         myStats, 
         setMyStats, 
         getAllStats, 
         refreshLocalStats,
         refreshStats
      }}>
         {children}
      </StatsContext.Provider>
   )
}

export {StatsContext};
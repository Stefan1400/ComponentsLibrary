import react, { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./Notification/Notification";
import { StatsContext } from "./StatsContext";

const WordContext = createContext();

export const WordProvider = ({ children }) => {

   const [myWords, setMyWords] = useState([]);
   const [dueWords, setDueWords] = useState([]);

   const { isLoggedIn, user } = useContext(AuthContext);
   const { showNotification } = useContext(NotificationContext);
   const { myStats, setMyStats, getAllStats, refreshLocalStats, refreshStats } = useContext(StatsContext);

   useEffect(() => {
      let didCancel = false;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      fetch(`${process.env.REACT_APP_API_URL}/api/ping`, {
         method: 'GET',
         cache: 'no-store',
         signal: controller.signal,
      })
         .then(res => {
            clearTimeout(timeout);
            if (!res.ok) {
            console.warn('ping non-ok', res.status);
            return null;
            }
            return res.json().catch(()=>null);
         })
         .then(data => {
            if (didCancel) return;
            if (data) console.log('woke server:', data);
         })
         .catch(err => {
            console.debug('ping failed or aborted (likely still waking):', err?.name || err);
         });

      return () => {
         didCancel = true;
         clearTimeout(timeout);
         controller.abort();
      };
   }, []);


   // GUEST WORDS
   const LOCAL_STORAGE_KEY = 'guest_words';

   const addLocalWordsToLocalStorage = (words) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(words))
   }

   const loadWordsFromLocalStorage = () => {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
   }

   // const clearGuestWords = () => {
   //    localStorage.removeItem(LOCAL_STORAGE_KEY);
   // }

   const setDueWordsFromLocal = (allWords) => {
      const dueWords = allWords.filter(w => {
         if (!w.next_review_at) return false;
         const nextReview = new Date(w.next_review_at).getTime();
         const now = Date.now();
         return nextReview <= now;
      });
      setDueWords(dueWords);
   };

   // const migrateGuestData = async () => {
   // const guestWords = loadWordsFromLocalStorage();
   // if (guestWords.length > 0) {
   //    try {
   //       const response = await fetchWithAuth(`http://localhost:5000/api/words/bulk`, {
   //          method: 'POST',
   //          body: JSON.stringify({ words: guestWords })
   //       });
         
   //       if (response.duplicates > 0) {
   //          // showNotification(`${response.inserted} words migrated, ${response.duplicates} duplicates skipped`);
   //       } else {
   //          // showNotification(`${response.inserted} words successfully migrated to your account`);
   //       }

   //       getAllStats();
         
         
   //       // clearGuestWords(); // Clear local storage after successful migration
         
   //    } catch (err) {
   //       console.error('Failed to migrate guest data:', err);
   //       showNotification('Failed to migrate your guest words. They will remain in local storage.');
   //    }
   // }
   // };

   //CHECKING IF LOGGED IN ? BACKEND AUTH : LOCAL STORAGE

   useEffect(() => {
      if (isLoggedIn && user) {
         // migrateGuestData().then(() => {
         getMyWords();
         getDue();
         // });
      } else {
         const localWords = loadWordsFromLocalStorage();
         setMyWords(localWords);
         setDueWordsFromLocal(localWords);
      }
   }, [isLoggedIn, user]);

   useEffect(() => {
      // console.log('due words array: ', dueWords);
   }, [dueWords]);

   const fetchWithAuth = async (url, options = {}) => {
      const token = localStorage.getItem('token');

      if (!token) throw new Error('token is missing');

      const res = await fetch(url, {
         ...options,
         headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
         }
      });

      if (!res.ok) {
         showNotification('error. please try again later');
         throw new Error('error. please try again later');
      }

      return res.json();
   }

   const getMyWords = async () => {
      try {
         const data = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/api/words`, {
            method: 'GET',
         });

         setMyWords(data);
      } catch (err) {
         // showNotification('could not get words. please try again later');
         // console.log('could not fetch words. please try again later');
      }
   }

   const addNewWord = async (word, meaning, known) => {

      const wordExists = myWords.some(w => w.word.trim().toLowerCase() === word.trim().toLowerCase());
      if (wordExists) {
         showNotification('That word already exists!');
         return false;
      }

      if (isLoggedIn && user) {
         try {
            const data = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/api/words`, {
               method: 'POST',
               body: JSON.stringify({ word, meaning, known })
            });

            // showNotification('word successfully added');
            setMyWords(prev => [...prev, data]);
            await getDue();
            await getAllStats();
            return true;

         } catch (err) {
            showNotification('could not add word. please try again later');
            console.log('could not add word. please try again later');
         }
      }

      const newLocalWord = {
         id: Date.now(),
         srs_stage: 1,
         next_review_at: new Date().toISOString(), // ← Use ISO string
         last_reviewed_at: null,
         created_at: new Date().toISOString(),     // ← Use ISO string
         word: word,
         meaning: meaning,
         known: known
      }

      const updatedWords = [...myWords, newLocalWord];
      setMyWords(updatedWords);
      setDueWordsFromLocal(updatedWords);
      addLocalWordsToLocalStorage(updatedWords);
      refreshLocalStats();
      showNotification('word added');
      return true;
   }

   const editWord = async (wordId, word, meaning, known) => {
      if (isLoggedIn && user) {
         try {
            await fetchWithAuth(`${process.env.REACT_APP_API_URL}/api/words/${wordId}`, {
               method: "PATCH",
               body: JSON.stringify({ word, meaning, known })
            });

            // showNotification('Successfully edited word');
            return true;

         } catch (err) {
            showNotification('could not edit word. please try again later');
            console.log('could not edit word. please try again later');
         }
      }



      //EDIT WORDS LOCALLY

      const wordExists = myWords.some(w =>
      w.word.trim().toLowerCase() === word.trim().toLowerCase() &&
      w.id !== wordId
      );

      if (wordExists) {
         showNotification('That word already exists!');
         return false;
      }

      const updatedWords = myWords.map(w => {
         if (w.id === wordId) {
            return {
               ...w,
               word: word.trim(),
               meaning: meaning.trim(),
               known
            };
         }
         return w;
      });

      setMyWords(updatedWords);
      refreshLocalStats();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWords));
      refreshLocalStats();
      showNotification('Successfully edited word');
      return true;
      
   }

   const deleteWord = async (wordId) => {
      if (isLoggedIn && user) {
         try {
            await fetchWithAuth(`${process.env.REACT_APP_API_URL}/api/words/${wordId}`, {
               method: 'DELETE',
            });

            showNotification('word deleted');
            setMyWords(prev => prev.filter(w => w.id !== wordId));
            setDueWords(prev => prev.filter(w => w.id !== wordId));
            await getAllStats();
            return true;

         } catch (err) {
            showNotification('could not delete word. please try again later');
            console.log('could not delete word. please try again later');
         }
      }

      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return;

      let myWords = JSON.parse(stored);

      const updatedWords = myWords.filter(w => w.id !== wordId);
      setMyWords(updatedWords);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWords));
      setDueWords(prev => prev.filter(w => w.id !== wordId));
      refreshLocalStats();
      showNotification('Word deleted');
      return true;
   }

   const search = async (query) => {
      if (isLoggedIn && user) {
         try {
            const data = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/api/words/search?query=${encodeURIComponent(query)}`);
            return Array.isArray(data) ? data : [];

         } catch (err) {
            showNotification('could not search for word. please try again later');
            console.log('could not search for word. please try again later');
         }
      }

      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return [];

      const localWords = JSON.parse(stored);
      const results = localWords.filter(w =>
         w.word.toLowerCase().includes(query.toLowerCase()) ||
         (w.meaning && w.meaning.toLowerCase().includes(query.toLowerCase()))
      );

      return results;


   
   }

   const getDue = async () => {
      if (isLoggedIn && user) {
         try {
            const data = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/api/review/due`, {
               method: 'GET'
            });

            // console.log('fetched due (getDue wordContext): ', data);
            setDueWords(data);
            
            return;

         } catch (err) {
            showNotification('could not get words. please try again later');
            console.error('could not get words. please try again later');
         }
      }

      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return;

      const allWords = JSON.parse(stored);

      const dueWords = allWords.filter(w => {
         if (!w.next_review_at) return false;

         const nextReview = new Date(w.next_review_at).getTime();
         const now = Date.now();
         return nextReview <= now;
      });

      // Don't overwrite full localStorage here!
      // Just update dueWords in state
      setDueWords(dueWords);
      return true;


   }

   const updateSRS = async (wordId, answer) => {

      if (isLoggedIn && user) {
         try {
            const data = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/api/review/${wordId}`, {
               method: "PATCH",
               body: JSON.stringify({ answer })
            });

            console.log('returned updatedSRS: ', data);

            if (answer === 'correct') {
               setDueWords(prev => prev.filter(w => w.id !== wordId));
            }

            return true;

         } catch (err) {
            showNotification('could not update word. please try again later')
            console.log('could not update word. please try again later');
         }
      }

      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return false;

      const localWords = JSON.parse(stored);

      const srsIntervals = {
         1: 1,
         2: 2,
         3: 4,
         4: 7,
         5: 14,
         6: 30,
         7: 60,
         8: 120,
         9: 180
      };

      const updatedWords = localWords.map(w => {
         if (w.id !== wordId) return w;

         const now = new Date();

         if (answer === 'wrong') {
            return {
               ...w,
               srs_stage: 1,
               next_review_at: now.toISOString()
            };
         }

         const currentStage = w.srs_stage || 1;
         const nextStage = Math.min(currentStage + 1, 9);
         const interval = srsIntervals[nextStage];

         const nextReview = new Date();
         nextReview.setDate(now.getDate() + interval);

         return {
            ...w,
            srs_stage: nextStage,
            next_review_at: nextReview.toISOString()
         };
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWords));
      setMyWords(updatedWords); // if you want the UI to reflect immediately

      if (answer === 'correct') {
         setDueWords(prev => prev.filter(w => w.id !== wordId));
      }

      return true;



   }

   return (
      <WordContext.Provider value={{
         myWords, setMyWords, addNewWord, getMyWords, editWord, deleteWord,
         search, getDue, updateSRS, dueWords, setDueWords
      }}>
         {children}
      </WordContext.Provider>
   )
}

export { WordContext };

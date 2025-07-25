import { useState, useEffect, createContext } from "react";
import './Notification.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
   const [ message, setMessage ] = useState('');
   const [ error, setError ] = useState('');
   const [ isVisible, setIsVisible ] = useState(false);

   const showNotification = (message) => {
      setMessage(message);
      setIsVisible(true);
      setTimeout(() => {
         setIsVisible(false);
         setMessage('');
      }, 3000);
   }

   return (
      <NotificationContext.Provider value={{ message, showNotification }}>
         {children}
         {isVisible && (
            <div className='popup-div'>
               {/* <svg className='popup-svg' width="20" height="20" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                  d="M12 7C12 10.5899 9.31372 13.5 6 13.5C2.68628 13.5 0 10.5899 0 7C0 3.41014 2.68628 0.5 6 0.5C9.31372 0.5 12 3.41014 12 7ZM5.30598 10.4417L9.7576 5.61912C9.90876 5.45536 9.90876 5.18983 9.7576 5.02607L9.21017 4.43302C9.05901 4.26924 8.8139 4.26924 8.66272 4.43302L5.03226 8.366L3.33728 6.52977C3.18612 6.36601 2.94102 6.36601 2.78983 6.52977L2.2424 7.12282C2.09124 7.28658 2.09124 7.55211 2.2424 7.71586L4.75853 10.4417C4.90972 10.6055 5.1548 10.6055 5.30598 10.4417Z" 
                  fill={error ? "#FF0000" : "#09FF00"}/>
               </svg> */}
               <span className='popup-text'>{message}</span>
            </div>
         )}
      </NotificationContext.Provider>
   );
}

export {NotificationContext};







// import React from 'react'
// import './Notification.css'

// function Notification({ message, error }) {
//   return (
//     
//   )
// }

// export default Notification;
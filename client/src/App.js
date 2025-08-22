import './App.css';
import Login from '../src/features/auth/Login/Login.jsx';
import Register from '../src/features/auth/Register/Register.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Grid from './components/Grid/Grid.jsx';
import AccountPage from './pages/AccountPage/AccountPage.jsx';
import AddWordsPanel from './components/AddWordsPanel/AddWordsPanel.jsx';
import ReviewPanel from './components/ReviewPanel/ReviewPanel.jsx';
import MyWordsPanel from './components/MyWordsPanel/MyWordsPanel.jsx';
import MenuSlider from './components/MenuSlider/MenuSlider.jsx';

function App() {

  
  //toggle 3 main pages
  const [addWordVisible, setAddWordVisible] = useState(true);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [myWordsVisible, setMyWordsVisible] = useState(false);
  const [menuSliderVisible, setMenuSliderVisible] = useState(false);

  const toggleAddWord = () => {
    resetAllPages();

    setAddWordVisible(true);
  }

  const toggleReview = () => {
    resetAllPages();

    setReviewVisible(true);
  }

  const toggleMyWords = () => {
    resetAllPages();

    setMyWordsVisible(true);
  }

  const toggleMenuSlider = () => {
    console.log('clicked')
    setMenuSliderVisible(prev => !prev);
  }








  const { isLoggedIn } = useContext(AuthContext);
  
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [accountPageVisible, setAccountPageVisible] = useState(false);
  

  useEffect(() => {
  if (isLoggedIn) {
    setAddWordVisible(true);
    setLoginVisible(false);
    setRegisterVisible(false);
  }
}, [isLoggedIn]);


  const toggle = () => {
    setLoginVisible(prev => !prev);
    setRegisterVisible(prev => !prev);
  }

  const toggleAccountPage = () => {
    resetAllPages();

    setAccountPageVisible(true);
  }

  const toggleLoginPage = () => {
    resetAllPages();

    setLoginVisible(true);
  } 

  const toggleRegisterPage = () => {
    resetAllPages();

    setRegisterVisible(true);
  } 

  const resetAllPages = () => {
    setMenuSliderVisible(false)
    setAddWordVisible(false)
    setReviewVisible(false)
    setMyWordsVisible(false)
    setLoginVisible(false)
    setRegisterVisible(false)
    setAccountPageVisible(false);

  }

  const [guestMessageVisible, setGuestMessageVisible] = useState(
    localStorage.getItem('guestMessage') !== 'false'
  );

  const closeGuestMessage = () => {
    if (guestMessageVisible) {
      localStorage.setItem('guestMessage', 'false');
      setGuestMessageVisible(false);
    }
  }

  // const toggleForm = () => {

  //   if (!loginVisible && !registerVisible) {
  //     setLoginVisible(true);
  //     return;
  //   }
    
  //   if (loginVisible || registerVisible) {
  //     setLoginVisible(false);
  //     setRegisterVisible(false);
  //     return;
  //   }
    
    
  // }



  return (
    <div className="App">
      <Navbar 
        toggleAddWord={toggleAddWord} 
        toggleReview={toggleReview} 
        toggleMyWords={toggleMyWords} 
        toggleAccountPage={toggleAccountPage} 
        // toggleLogin={toggleForm} 
        addWordVisible={addWordVisible}
        reviewVisible={reviewVisible}
        myWordsVisible={myWordsVisible}
        accountVisible={accountPageVisible}
      />

      <MenuSlider 
          goToLogin={toggleLoginPage} 
          goToRegister={toggleRegisterPage} 
          toggleMenuSlider={toggleMenuSlider} 
          menuSliderVisible={menuSliderVisible}
      />

      {!isLoggedIn && guestMessageVisible && (
        <div className='guest-message-div'>
          <span className='guest-message-info'>currently logged in as guest</span>
          <span className='guest-message-cta'>login</span>
          
          <svg onClick={closeGuestMessage} className='guest-message-close' width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.823223" y1="12.8232" x2="12.8232" y2="0.823224" stroke="#000" strokeWidth="0.75"/>
            <line x1="1.17678" y1="0.823223" x2="13.1768" y2="12.8232" stroke="#000" strokeWidth="0.75"/>
          </svg>
        </div>
      )}

      {!menuSliderVisible && (
        <svg onClick={toggleMenuSlider} className='menu-slider-btn' width="42" height="18" viewBox="0 0 42 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="0.5" x2="42" y2="0.5" stroke="black"/>
          <line y1="17.5" x2="42" y2="17.5" stroke="black"/>
        </svg>
      )}

      {addWordVisible && (
        <AddWordsPanel />
      )}

      {reviewVisible && (
        <ReviewPanel />
      )}

      {myWordsVisible && (
        <MyWordsPanel />
      )}
    
      {accountPageVisible && <AccountPage 
        goToLogin={toggleLoginPage} 
        goToRegister={toggleRegisterPage} 
      />}

      {loginVisible && !isLoggedIn && <Login goToRegister={toggleRegisterPage} />}
      {registerVisible && !isLoggedIn && <Register goToLogin={toggleLoginPage} toggleMenuSlider={toggleMenuSlider} />}
      {/* {loginVisible && <Login hideBothForms={toggleForm} />} */}
      {/* {registerVisible && <Register hideBothForms={toggleForm} />} */}
      
      {!addWordVisible && !reviewVisible && !myWordsVisible && !loginVisible && !registerVisible && (
        <AddWordsPanel />
      )}
      
    </div>
  );
}

export default App;

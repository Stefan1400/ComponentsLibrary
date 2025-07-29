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
    setAccountPageVisible(prev => !prev);
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
      />

      <MenuSlider 
          goToLogin={toggleLoginPage} 
          goToRegister={toggleRegisterPage} 
          toggleMenuSlider={toggleMenuSlider} 
          menuSliderVisible={menuSliderVisible}
      />

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
    
      {accountPageVisible && <AccountPage />}

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

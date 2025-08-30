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
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { MenuBurgerIcon, XIcon } from './assets/Icons/Icons.jsx';

function App() {

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

  const { isLoggedIn } = useContext(AuthContext);
  
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [accountPageVisible, setAccountPageVisible] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [desktopNavbarVisible, setDesktopNavbarVisible] = useState(true);

  const toggleMenuSlider = () => {
    setMenuSliderVisible(prev => !prev);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDesktopNavbarVisible(false);
        setIsMobile(true);
      } else {
        setDesktopNavbarVisible(true);
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);

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

  const guestToLogin = () => {
    closeGuestMessage();
    setLoginVisible(true);
  }

  const toggleDesktopNavbar = () => {
    setDesktopNavbarVisible(prev => !prev);
  }



  return (
    <div className="App">
        <Navbar 
          toggleAddWord={toggleAddWord} 
          toggleReview={toggleReview} 
          toggleMyWords={toggleMyWords} 
          toggleAccountPage={toggleAccountPage} 
          addWordVisible={addWordVisible}
          reviewVisible={reviewVisible}
          myWordsVisible={myWordsVisible}
          accountVisible={accountPageVisible}
          toggleDesktopNavbar={toggleDesktopNavbar}
        />

      {isMobile && (
        <MenuSlider 
          goToLogin={toggleLoginPage} 
          goToRegister={toggleRegisterPage} 
          toggleMenuSlider={toggleMenuSlider} 
          menuSliderVisible={menuSliderVisible}
        />
      )}


      {!isLoggedIn && guestMessageVisible && (
        <div className='guest-message-div'>
          <span className='guest-message-info'>currently logged in as guest</span>
          <span onClick={guestToLogin} className='guest-message-cta'>login</span>
          
          <XIcon onClick={closeGuestMessage} className='guest-message-close' width="14" height="13" />
        </div>
      )}

      {!menuSliderVisible && (
        <MenuBurgerIcon onClick={toggleMenuSlider} className='menu-slider-btn' />
      )}

      {/* {addWordVisible && (
        <AddWordsPanel />
      )} */}

      {/* {reviewVisible && (
        <ReviewPanel />
      )}

      {myWordsVisible && (
        <MyWordsPanel />
      )} */}
    
      {/* {accountPageVisible && !isMobile && <AccountPage 
        goToLogin={toggleLoginPage} 
        goToRegister={toggleRegisterPage} 
      />} */}

      {/* {loginVisible && !isLoggedIn && <Login goToRegister={toggleRegisterPage} />} */}
      {/* {registerVisible && !isLoggedIn && <Register goToLogin={toggleLoginPage} toggleMenuSlider={toggleMenuSlider} />} */}
      {/* {loginVisible && <Login hideBothForms={toggleForm} />} */}
      {/* {registerVisible && <Register hideBothForms={toggleForm} />} */}
      
      {/* {!addWordVisible && !reviewVisible && !myWordsVisible && !loginVisible && !registerVisible && (
        <AddWordsPanel />
      )} */}

      {/* const location = useLocation(); */}
      
      <Routes>
        <Route path='/' element={<AddWordsPanel />} />
        <Route path='/add' element={<AddWordsPanel />} />
        <Route path='/review' element={<ReviewPanel />} />
        <Route path='/my-words' element={<MyWordsPanel />} />
        <Route path='/account' element={!isMobile ? <AccountPage /> : <Navigate to='/' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      
    </div>
  );
}

export default App;

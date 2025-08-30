import '../../auth/Auth.css';
import { useState, useEffect, useContext, useRef } from 'react';
// import Notification from '../../../components/Notification/Notification';
import { AuthContext } from '../../../context/AuthContext';
import { NotificationContext } from '../../../context/Notification/Notification';
import { Link, useNavigate } from 'react-router-dom';
import { EyeSlashIcon, EyeOpenIcon } from '../../../assets/Icons/Icons';


function Login({ toggle, hideBothForms, goToRegister  }) {

   const navigate = useNavigate();

   const { user, isLoggedIn, login, logout } = useContext(AuthContext);
   const { message, showNotification } = useContext(NotificationContext);

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const [usernameValid, setUsernameValid] = useState(true);
   const [passwordValid, setPasswordValid] = useState(true);
   const [bothValid, setBothValid] = useState(null);

   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');

   const [passwordVisible, setPasswordVisible] = useState(false);

  const isValidEmail = () => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
   };

   const checkIfValid = () => {
   const emailIsValid = isValidEmail();
   const usernameIsValid = username && username.length >= 6 && username.length <= 128 && emailIsValid;
   const passwordIsValid = password && password.length >= 8 && password.length <= 64;

   setUsernameValid(usernameIsValid);
   setPasswordValid(passwordIsValid);

   if (!usernameIsValid) {
      showNotification('username invalid');
      setEmailError('please enter a valid email address');
   }

   if (!passwordIsValid) {
      showNotification('password invalid');
      setPasswordError('invalid password (must be between 8 and 64 characters long)');
   }

   if (usernameIsValid && passwordIsValid) {
      handleLogin();
   }
};

   const handleLogin = async () => {
      
      const loggedIn = await login(username, password);

      if (loggedIn) {
         setUsername('');
         setPassword('');


         navigate('/');

         showNotification('successfully logged in');

         setBothValid(false);
         setUsernameValid(true);
         setPasswordValid(true);
      } else {
         showNotification('invalid email or password');
         setEmailError('');
         setPasswordError('invalid email or password');
         setUsernameValid(false);
         setPasswordValid(false);

         
      }
   }

   const togglePasswordVisible = () => {
      setPasswordVisible(prev => !prev);
   }
  
  return ( 
   <>
      {!isLoggedIn && (
         <div className='page auth-login-page'>
            <h2 className='auth-header login'>Sign In</h2>

            {/* email input */}
            <div className="auth-input-fields">
               <label className='auth-input-fields-container' htmlFor="">
                  <input onChange={(e) => setUsername(e.target.value)} value={username} type='text' className={`auth-input default ${!usernameValid ? 'invalid' : ''}`} placeholder='Email' />
               </label>
               {!usernameValid && (
                  <span className='auth-email-error'>{emailError}</span>
               )}


               {/* password input */}
               <label className='auth-input-fields-container' htmlFor="#">
                  <input onChange={(e) => setPassword(e.target.value)} value={password} type={passwordVisible ? 'text' : 'password'} className={`auth-input default ${!passwordValid ? 'invalid' : ''}`} placeholder='Password' />
                  
                  {!passwordVisible && (
                     <EyeSlashIcon onClick={togglePasswordVisible} className='auth-input-hide-password pw-toggle-icon' />
                  )}
                  {passwordVisible && (
                     <EyeOpenIcon  onClick={togglePasswordVisible} className='auth-input-show-password pw-toggle-icon' />
                  )}
               </label>
               {!passwordValid && (
                  <span className='auth-email-error'>{passwordError}</span>
               )}
               
               {/* <span className='auth-link-small auth-forgot-pw underlined'>Forgot password?</span> */}
            </div>
               
            <button onClick={checkIfValid} className="auth-submit-btn enabled">Sign In</button>
            <div className="auth-switch-div">
               <span className="auth-link-small auth-switch-link">Don't have an account?</span> 
               <Link to='/register'>
                  <span onClick={goToRegister} className='underlined'>Create an account</span>
               </Link>
            </div>
         </div>
      )}
   </>
   )
}

export default Login;
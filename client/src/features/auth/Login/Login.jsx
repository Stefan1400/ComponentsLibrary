import '../../auth/Auth.css';
import { useState, useEffect, useContext } from 'react';
// import Notification from '../../../components/Notification/Notification';
import { AuthContext } from '../../../context/AuthContext';
import { NotificationContext } from '../../../context/Notification/Notification';

function Login({ toggle, hideBothForms, goToRegister  }) {

   const { user, isLoggedIn, login, logout } = useContext(AuthContext);
   const { message, showNotification } = useContext(NotificationContext);

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const [usernameValid, setUsernameValid] = useState(true);
   const [passwordValid, setPasswordValid] = useState(true);
   const [bothValid, setBothValid] = useState(null);

   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');

   

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
      showNotification('username and password are valid');
      handleLogin();
   }
};

   const handleLogin = async () => {
      
      const loggedIn = await login(username, password);

      if (loggedIn) {
         setUsername('');
         setPassword('');

         // hideBothForms();

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
  
  return ( 
   <>
      {!isLoggedIn && (
         <div className='page auth-login-page'>
            <h2 className='auth-header login'>Sign In</h2>

            <div className="auth-input-fields">
               <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className={`auth-input default ${!usernameValid ? 'invalid' : ''}`} placeholder='Email' />
               {!usernameValid && (
                  <span className='auth-email-error'>{emailError}</span>
               )}
               <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className={`auth-input default ${!passwordValid ? 'invalid' : ''}`} placeholder='Password' />
               {!passwordValid && (
                  <span className='auth-email-error'>{passwordError}</span>
               )}
               
               {/* <span className='auth-link-small auth-forgot-pw underlined'>Forgot password?</span> */}
            </div>
         
            <button onClick={checkIfValid} className="auth-submit-btn enabled">Sign In</button>
            <div className="auth-switch-div">
               <span className="auth-link-small auth-switch-link">Don't have an account?</span> 
               <span onClick={goToRegister} className='underlined'>Create an account</span>
            </div>
         </div>
      )}
   </>
   )
}

export default Login;
import '../../auth/Auth.css';
import { useState, useEffect, useContext, useRef } from 'react';
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
      // showNotification('username and password are valid');
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
                  
                  {passwordVisible && (
                     <svg onClick={togglePasswordVisible} className='auth-input-hide-password pw-toggle-icon' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.28047 0.220312C0.986719 -0.0734375 0.511719 -0.0734375 0.221094 0.220312C-0.0695313 0.514062 -0.0726563 0.989062 0.217969 1.28281L16.718 17.7828C17.0117 18.0766 17.4867 18.0766 17.7773 17.7828C18.068 17.4891 18.0711 17.0141 17.7773 16.7234L14.7648 13.7109C14.8492 13.6359 14.9336 13.5609 15.0148 13.4859C16.4773 12.1266 17.4555 10.5047 17.9211 9.38906C18.0242 9.14219 18.0242 8.86719 17.9211 8.62031C17.4555 7.50469 16.4773 5.87969 15.0148 4.52344C13.543 3.15781 11.5211 2.00469 8.99609 2.00469C7.22109 2.00469 5.69609 2.57344 4.43359 3.38594L1.28047 0.220312ZM6.38984 5.33281C7.12422 4.80781 8.02734 4.49844 8.99922 4.49844C11.4836 4.49844 13.4992 6.51406 13.4992 8.99844C13.4992 9.97031 13.1898 10.8703 12.6648 11.6078L11.5805 10.5234C11.9773 9.85469 12.1117 9.03281 11.8961 8.22031C11.468 6.62031 9.82109 5.67031 8.22109 6.09844C7.95234 6.17031 7.69922 6.27656 7.47109 6.41094L6.38672 5.32656L6.38984 5.33281ZM10.1648 13.3453C9.79297 13.4453 9.40234 13.4984 8.99922 13.4984C6.51484 13.4984 4.49922 11.4828 4.49922 8.99844C4.49922 8.59531 4.55234 8.20469 4.65234 7.83281L2.16797 5.34844C1.14922 6.49844 0.449219 7.71719 0.0773437 8.61406C-0.0257813 8.86094 -0.0257813 9.13594 0.0773437 9.38281C0.542969 10.4984 1.52109 12.1234 2.98359 13.4797C4.45547 14.8453 6.47734 15.9984 9.00234 15.9984C10.168 15.9984 11.2273 15.7516 12.1742 15.3547L10.168 13.3484L10.1648 13.3453Z" fill="black"/>
                     </svg>
                  )}
                  {!passwordVisible && (
                     <svg onClick={togglePasswordVisible} className='auth-input-show-password pw-toggle-icon' width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00234 0C6.47734 0 4.45547 1.15 2.98359 2.51875C1.52109 3.87812 0.542969 5.5 0.0773437 6.61562C-0.0257813 6.8625 -0.0257813 7.1375 0.0773437 7.38437C0.542969 8.5 1.52109 10.125 2.98359 11.4812C4.45547 12.8469 6.47734 14 9.00234 14C11.5273 14 13.5492 12.85 15.0211 11.4812C16.4836 10.1219 17.4617 8.5 17.9273 7.38437C18.0305 7.1375 18.0305 6.8625 17.9273 6.61562C17.4617 5.5 16.4836 3.875 15.0211 2.51875C13.5492 1.15312 11.5273 0 9.00234 0ZM4.50234 7C4.50234 5.80653 4.97645 4.66193 5.82036 3.81802C6.66428 2.97411 7.80887 2.5 9.00234 2.5C10.1958 2.5 11.3404 2.97411 12.1843 3.81802C13.0282 4.66193 13.5023 5.80653 13.5023 7C13.5023 8.19347 13.0282 9.33807 12.1843 10.182C11.3404 11.0259 10.1958 11.5 9.00234 11.5C7.80887 11.5 6.66428 11.0259 5.82036 10.182C4.97645 9.33807 4.50234 8.19347 4.50234 7ZM9.00234 5C9.00234 6.10312 8.10547 7 7.00234 7C6.64297 7 6.30547 6.90625 6.01172 6.7375C5.98047 7.07813 6.00859 7.42812 6.10234 7.775C6.53047 9.375 8.17734 10.325 9.77734 9.89688C11.3773 9.46875 12.3273 7.82188 11.8992 6.22188C11.518 4.79375 10.1648 3.88438 8.73984 4.00938C8.90547 4.3 9.00234 4.6375 9.00234 5Z" fill="black"/>
                     </svg>
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
               <span onClick={goToRegister} className='underlined'>Create an account</span>
            </div>
         </div>
      )}
   </>
   )
}

export default Login;
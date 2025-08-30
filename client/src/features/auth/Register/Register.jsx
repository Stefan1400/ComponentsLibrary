import React from 'react';
import '../../auth/Auth.css';
import { useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../../../context/Notification/Notification';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { EyeOpenIcon, EyeSlashIcon } from '../../../assets/Icons/Icons';

function Register({ toggle, hideBothForms, goToLogin, toggleMenuSlider }) {

   const navigate = useNavigate();

   const { message, showNotification } = useContext(NotificationContext);
   const { register } = useContext(AuthContext);
  
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const [usernameValid, setUsernameValid] = useState(true);
   const [passwordValid, setPasswordValid] = useState(true);
   const [bothValid, setBothValid] = useState(null);
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
   }

   if (!passwordIsValid) {
      showNotification('password invalid');
   }

   if (usernameIsValid && passwordIsValid) {
      handleRegister();
   }
};

   
   const handleRegister = async () => {
      
      const registered = await register(username, password);

      if (registered) {
         navigate('/');
         
         showNotification('account successfully created');
         setUsername('');
         setPassword('');

         setBothValid(false);
         setUsernameValid(true);
         setPasswordValid(true);
      } else {
         showNotification('error creating account');
         setUsernameValid(false);
         setPasswordValid(false);
      }


   }

   const togglePasswordVisible = () => {
      setPasswordVisible(prev => !prev);
   }

   return (
    
    
    <div className='page auth-register-page'>
      
      <h2 className="auth-header register">Create an account</h2>

      <div className="auth-input-fields">
         
         {/* email input */}
         <label className='auth-input-fields-container' htmlFor="#">
            <input onChange={(e) => {setUsername(e.target.value); setUsernameValid(true)}} value={username} type='text' className={`auth-input default ${!usernameValid ? 'invalid' : ''}`} placeholder='Email' />
         </label>
         {!usernameValid && (
            <span className='auth-email-error'>invalid email address (must include @gmail.com)</span>
         )}

         {/* password input */}
         <label className='auth-input-fields-container' htmlFor="#">
            <input onChange={(e) => {setPassword(e.target.value); ; setUsernameValid(true)}} value={password} type={passwordVisible ? 'text' : 'password'} className={`auth-input default ${!passwordValid ? 'invalid' : ''}`} placeholder='Password' />

            {!passwordVisible && (
               <EyeSlashIcon onClick={togglePasswordVisible} className='auth-input-hide-password pw-toggle-icon' />
            )}
            {passwordVisible && (
               <EyeOpenIcon onClick={togglePasswordVisible} className='auth-input-show-password pw-toggle-icon' />
            )}
         </label>
         {!passwordValid && (
            <span className='auth-email-error'>invalid password (must be between 8 and 64 characters long)</span>
         )}
      </div>

      <button onClick={checkIfValid} className='auth-submit-btn enabled'>Sign Up</button>
      
      <div className='auth-switch-div'>
         <span className="auth-link-small auth-switch-link">Already have an account? </span>
         <Link to='/login'>
            <span onClick={goToLogin} className='underlined'>Log in</span>
         </Link>
      </div>
   </div>
  )
}

export default Register;
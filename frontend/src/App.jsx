import React from 'react'
import LoginPage from './pages/LoginPage'
import { GoogleOAuthProvider } from '@react-oauth/google';
// index.js or App.jsx
import './index.css';
import LandingPage from './pages/LandingPage';


const App = () => {
  return (
    <div className=''> 
    <LandingPage/>
    {/* <GoogleOAuthProvider clientId="137347691807-2ehifvqvrlfqvqagvargud88sg13uuvm.apps.googleusercontent.com">
    <div className='bg-gray-100 shadow-xl'>
      <LoginPage />
    </div>
    </GoogleOAuthProvider> */}
    </div>
  )
}

export default App
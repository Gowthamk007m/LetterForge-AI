import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import Layout from './components/ui/Layout';
import CoverLetterPage from './pages/CoverLetterPage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Layout>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cover-letter" element={<CoverLetterPage />} />
    {/* <GoogleOAuthProvider clientId="137347691807-2ehifvqvrlfqvqagvargud88sg13uuvm.apps.googleusercontent.com">
    <div className='bg-gray-100 shadow-xl'>
      <LoginPage />
    </div>
    </GoogleOAuthProvider> */}
    </Routes>
    </Layout>
  </Router>
  )
}

export default App
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoverLetterPage from './pages/CoverLetterPage'
import LandingPage from './pages/LandingPage';
import Layout from './components/ui/Layout';
import './index.css';

const App = () => {
  return (
    <Router>
      <Layout>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cover-letter" element={<CoverLetterPage />} />
    </Routes>
    </Layout>
  </Router>
  )
}

export default App
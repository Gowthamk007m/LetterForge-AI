import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/ui/Layout';
import CoverLetterPage from './pages/CoverLetterPage'
import './index.css';
import LandingPage from './pages/LandingPage';

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
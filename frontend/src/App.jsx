import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/ui/Layout';
import CoverLetterPage from './pages/CoverLetterPage';
import LandingPage from './pages/LandingPage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with Layout (Navbar and Footer) */}
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        {/* Routes without Layout */}
        <Route path="/cover-letter" element={<CoverLetterPage />} />
        {/* You can add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;

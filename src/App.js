import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Features from './pages/Features';
import Documentation from './pages/Documentation';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/features" element={<Features />} />
              <Route path="/docs" element={<Documentation />} />
            </Routes>
          </MainLayout>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

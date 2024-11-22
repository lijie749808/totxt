import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1" as="main" pt="60px" px={4} py={8}> 
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

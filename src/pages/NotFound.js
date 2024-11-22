import React from 'react';
import { Box, Heading, Text, Button, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxW="container.xl" py={32}>
      <Box textAlign="center">
        <Heading
          display="inline-block"
          as="h1"
          fontSize={{ base: '6xl', md: '8xl' }}
          bgGradient="linear(to-r, brand.400, brand.600)"
          backgroundClip="text"
          mb={4}
        >
          404
        </Heading>
        <Text fontSize="2xl" mb={8}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mb={8}>
          The page you're looking for doesn't seem to exist.
        </Text>

        <Button
          colorScheme="brand"
          bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
          color="white"
          variant="solid"
          onClick={() => navigate('/')}
          _hover={{
            bgGradient: 'linear(to-r, brand.500, brand.600, brand.700)',
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}

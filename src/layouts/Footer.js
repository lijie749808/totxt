import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';
  const textColor = colorMode === 'light' ? 'gray.700' : 'gray.200';

  return (
    <Box
      bg={bgColor}
      color={textColor}
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text> 2024 ToTxt. All rights reserved</Text>
        <Stack direction="row" spacing={6}>
          <Link href="https://github.com/lijie749808/totxt" isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              size="md"
              color={textColor}
              variant="ghost"
            />
          </Link>
          <Link href="https://twitter.com" isExternal>
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="md"
              color={textColor}
              variant="ghost"
            />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

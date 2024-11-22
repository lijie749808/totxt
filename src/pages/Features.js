import React from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaFileAlt, FaFileWord, FaFileExcel, FaImage } from 'react-icons/fa';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={6}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _hover={{
        transform: 'translateY(-5px)',
        transition: 'all .2s ease',
      }}
    >
      <Icon as={icon} w={10} h={10} color="brand.500" />
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'} align={'center'}>
        {text}
      </Text>
    </Stack>
  );
};

const features = [
  {
    title: 'PDF Text Extraction',
    text: 'Extract text from PDF files with high accuracy, preserving formatting and structure.',
    icon: FaFileAlt,
  },
  {
    title: 'Word Documents',
    text: 'Convert Microsoft Word documents to plain text while maintaining content organization.',
    icon: FaFileWord,
  },
  {
    title: 'Excel Spreadsheets',
    text: 'Transform Excel spreadsheets into structured text format for easy processing.',
    icon: FaFileExcel,
  },
  {
    title: 'Image OCR',
    text: 'Extract text from images using advanced OCR technology.',
    icon: FaImage,
  },
];

export default function Features() {
  return (
    <Box p={4}>
      <Container maxW={'7xl'} py={16}>
        <VStack spacing={8}>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '4xl' }}
            textAlign="center"
            mb={8}
          >
            Features
          </Heading>
          <Text
            fontSize={'xl'}
            color={'gray.600'}
            textAlign={'center'}
            maxW={'3xl'}
            mb={8}
          >
            ToTxt provides powerful tools for converting various file formats to
            plain text, making your content more accessible and easier to process.
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={10}
            px={{ base: 4, md: 8 }}
          >
            {features.map((feature, index) => (
              <Feature
                key={index}
                title={feature.title}
                text={feature.text}
                icon={feature.icon}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

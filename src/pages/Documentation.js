import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  UnorderedList,
  ListItem,
  Code,
  useColorModeValue,
} from '@chakra-ui/react';

const QuickStart = () => (
  <VStack align="start" spacing={4}>
    <Heading size="md">Quick Start Guide</Heading>
    <Text>Follow these simple steps to get started with ToTxt:</Text>
    <UnorderedList spacing={2}>
      <ListItem>Click the upload button or drag and drop your file</ListItem>
      <ListItem>Select the appropriate conversion options</ListItem>
      <ListItem>Wait for the conversion to complete</ListItem>
      <ListItem>Download or copy the converted text</ListItem>
    </UnorderedList>
  </VStack>
);

const API = () => (
  <VStack align="start" spacing={4}>
    <Heading size="md">API Documentation</Heading>
    <Text>
      ToTxt provides a simple API for programmatic file conversion. Here's how to
      use it:
    </Text>
    <Code p={4} borderRadius="md" width="100%">
      {`const response = await fetch('api/convert', {
  method: 'POST',
  body: formData,
});
const result = await response.json();`}
    </Code>
  </VStack>
);

const FAQ = () => (
  <VStack align="start" spacing={4}>
    <Heading size="md">Frequently Asked Questions</Heading>
    <VStack align="start" spacing={4} width="100%">
      <Box>
        <Text fontWeight="bold">What file types are supported?</Text>
        <Text>
          Currently, we support PDF, Word documents (.docx), Excel spreadsheets
          (.xlsx), and images (with OCR).
        </Text>
      </Box>
      <Box>
        <Text fontWeight="bold">Is there a file size limit?</Text>
        <Text>Yes, the maximum file size is 10MB for optimal performance.</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">How accurate is the text extraction?</Text>
        <Text>
          Our text extraction is highly accurate for properly formatted documents.
          For scanned documents and images, accuracy depends on the quality of the
          source material.
        </Text>
      </Box>
    </VStack>
  </VStack>
);

export default function Documentation() {
  const bgColor = useColorModeValue('white', 'gray.800');

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
            Documentation
          </Heading>
          <Box
            bg={bgColor}
            p={8}
            borderRadius="xl"
            boxShadow="lg"
            width="100%"
          >
            <Tabs variant="enclosed" colorScheme="brand">
              <TabList>
                <Tab>Quick Start</Tab>
                <Tab>API</Tab>
                <Tab>FAQ</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <QuickStart />
                </TabPanel>
                <TabPanel>
                  <API />
                </TabPanel>
                <TabPanel>
                  <FAQ />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

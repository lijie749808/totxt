import React from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';

const stats = [
  { label: 'Total Conversions', number: '150' },
  { label: 'This Month', number: '45' },
  { label: 'Storage Used', number: '2.3 GB' },
];

const recentFiles = [
  {
    name: 'Document.pdf',
    type: 'PDF',
    date: '2024-01-15',
    size: '2.5 MB',
  },
  {
    name: 'Spreadsheet.xlsx',
    type: 'Excel',
    date: '2024-01-14',
    size: '1.2 MB',
  },
  {
    name: 'Report.docx',
    type: 'Word',
    date: '2024-01-13',
    size: '3.1 MB',
  },
];

export default function Dashboard() {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box p={4}>
      <Container maxW={'7xl'} py={16}>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '4xl' }}
          mb={8}
        >
          Dashboard
        </Heading>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              bg={bgColor}
              p={6}
              boxShadow={'lg'}
              borderRadius={'lg'}
            >
              <Stat>
                <StatLabel fontSize={'lg'}>{stat.label}</StatLabel>
                <StatNumber fontSize={'3xl'} color={'brand.500'}>
                  {stat.number}
                </StatNumber>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>

        {/* Recent Files Table */}
        <Box
          bg={bgColor}
          p={6}
          boxShadow={'lg'}
          borderRadius={'lg'}
        >
          <Heading size="md" mb={4}>
            Recent Files
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>File Name</Th>
                <Th>Type</Th>
                <Th>Date</Th>
                <Th>Size</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentFiles.map((file, index) => (
                <Tr key={index}>
                  <Td>{file.name}</Td>
                  <Td>{file.type}</Td>
                  <Td>{file.date}</Td>
                  <Td>{file.size}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
}

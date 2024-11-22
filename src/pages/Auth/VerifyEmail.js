import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  useToast,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  // 获取 gourl 参数（QQ 邮箱安全检查页面会将原始 URL 编码到 gourl 参数中）
  const gourl = searchParams.get('gourl');
  const token = searchParams.get('token') || 
    (gourl ? new URL(decodeURIComponent(gourl)).searchParams.get('token') : null);

  const handleVerify = async () => {
    if (!token) {
      toast({
        title: '验证失败',
        description: '无效的验证链接',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setVerifying(true);
    try {
      await axios.get(`/api/auth/verify-email?token=${token}`);
      setVerified(true);
      toast({
        title: '验证成功',
        description: '您的邮箱已成功验证',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // 3秒后跳转到登录页
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast({
        title: '验证失败',
        description: error.response?.data?.message || '验证链接无效或已过期',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Box
        py={{ base: '8', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg-surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <VStack spacing="6" align="center">
          <Heading size="lg">邮箱验证</Heading>
          {verifying ? (
            <>
              <Spinner size="xl" />
              <Text>正在验证您的邮箱...</Text>
            </>
          ) : verified ? (
            <>
              <Text fontSize="xl" color="green.500">
                邮箱验证成功！
              </Text>
              <Text>即将跳转到登录页面...</Text>
            </>
          ) : (
            <>
              <Text fontSize="xl">
                请点击下方按钮完成邮箱验证
              </Text>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleVerify}
                isLoading={verifying}
              >
                验证邮箱
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default VerifyEmail;

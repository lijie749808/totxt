import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();  // 使用 AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // 登录成功
      toast({
        title: '登录成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // 保存token和用户信息
      localStorage.setItem('token', response.data.token);
      
      // 使用 AuthContext 的 login 方法更新全局状态
      login(response.data.user);

      // 更新 axios 默认请求头
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // 跳转到主页
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || '登录失败，请稍后重试';
      toast({
        title: '错误',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            登录账号
          </Text>

          <FormControl isRequired>
            <FormLabel>邮箱</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>密码</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            mt={4}
            isLoading={loading}
          >
            登录
          </Button>

          <Text>
            没有账号？{' '}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => navigate('/register')}
            >
              去注册
            </Button>
          </Text>

          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => navigate('/forgot-password')}
          >
            忘记密码？
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;

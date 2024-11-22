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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 验证密码匹配
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: '错误',
        description: '两次输入的密码不匹配',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // 验证密码长度
    if (formData.password.length < 6) {
      toast({
        title: '错误',
        description: '密码长度至少为6位',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // 注册成功
      toast({
        title: '注册成功',
        description: '请查收验证邮件',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // 保存token和用户信息
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 跳转到主页
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || '注册失败，请稍后重试';
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
            注册账号
          </Text>
          
          <FormControl isRequired>
            <FormLabel>用户名</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="请输入用户名"
            />
          </FormControl>

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

          <FormControl isRequired>
            <FormLabel>确认密码</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="请再次输入密码"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            mt={4}
            isLoading={loading}
          >
            注册
          </Button>

          <Text>
            已有账号？{' '}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => navigate('/login')}
            >
              去登录
            </Button>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;

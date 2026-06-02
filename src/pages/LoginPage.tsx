import React, { useState } from 'react';
import { Form, Input, Button, Typography, theme, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { authAPI } from '../services/api';

const { Text } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const isAuth = !!localStorage.getItem('token');

  if (isAuth) {
    return <Navigate to="/chat" replace />;
  }

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await authAPI.login(values.email, values.password);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      const user = await authAPI.getMe();
      localStorage.setItem('user_id', user.id.toString());

      message.success('Вход выполнен успешно');
      navigate('/chat');
    } catch (error) {
      console.error(error);
      message.error('Ошибка входа. Проверьте email и пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Вход в систему" subtitle="Чат-бот адаптации КФУ">
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item name="email" rules={[{ required: true, message: 'Пожалуйста, введите почту!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Логин (Email)" size="large" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ background: token.colorPrimary }}>
            Войти
          </Button>
        </Form.Item>

        <div className="auth-footer">
          <Text>Нет аккаунта? <Link to="/register" style={{ color: token.colorPrimary }}>Зарегистрироваться</Link></Text>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
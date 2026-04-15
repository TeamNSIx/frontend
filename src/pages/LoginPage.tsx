import React, { useState } from 'react';
import { Form, Input, Button, Typography, theme } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const { Text } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = theme.useToken(); 

  const onFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/chat');
    }, 1000);
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
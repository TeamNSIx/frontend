import React, { useState } from 'react';
import { Form, Input, Button, Typography, theme } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const { Text } = Typography;

const RegisterPage: React.FC = () => {
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
    <AuthLayout title="Регистрация" subtitle="Создайте аккаунт для доступа к боту">
      <Form name="register" onFinish={onFinish} layout="vertical">
        <Form.Item name="email" rules={[{ required: true, message: 'Пожалуйста, введите почту!' }, { type: 'email', message: 'Введите корректный email!' }]}>
          <Input prefix={<MailOutlined />} placeholder="Почта (Email)" size="large" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста, придумайте пароль!' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
        </Form.Item>

        <Form.Item name="confirm" dependencies={['password']} rules={[{ required: true, message: 'Пожалуйста, повторите пароль!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) return Promise.resolve(); return Promise.reject(new Error('Пароли не совпадают!')); }, })]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Повторите пароль" size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ background: token.colorPrimary }}>
            Зарегистрироваться
          </Button>
        </Form.Item>

        <div className="auth-footer">
          <Text>Уже есть аккаунт? <Link to="/" style={{ color: token.colorPrimary }}>Войти</Link></Text>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default RegisterPage;
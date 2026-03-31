import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: { email?: string; password?: string }) => {
    console.log('Данные формы:', values);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      navigate('/chat');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 12 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: '#005696', margin: 0 }}>Вход в систему</Title>
          <Text type="secondary">Чат-бот адаптации КФУ</Text>
        </div>

        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item 
            name="email" 
            rules={[{ required: true, message: 'Пожалуйста, введите почту!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Логин (Email)" size="large" />
          </Form.Item>

          <Form.Item 
            name="password" 
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ background: '#005696' }}>
              Войти
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text>Нет аккаунта? <Link to="/register" style={{ color: '#005696' }}>Зарегистрироваться</Link></Text>
          </div>
        </Form>

      </Card>
    </div>
  );
};

export default LoginPage;
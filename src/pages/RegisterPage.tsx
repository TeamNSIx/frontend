import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterPage: React.FC = () => {
  // 1. Создаем переменную состояния для кнопки (крутится/не крутится)
  const [loading, setLoading] = useState(false);
  // 2. Достаем функцию для переключения страниц
  const navigate = useNavigate();

  const onFinish = (values: { email?: string; password?: string; confirm?: string }) => {
    console.log('Данные для регистрации:', values);
    
    // 3. Включаем анимацию загрузки
    setLoading(true);
    
    // 4. Запускаем таймер на 1 секунду (1000 миллисекунд)
    setTimeout(() => {
      setLoading(false); // Выключаем загрузку
      navigate('/chat'); // Перекидываем в чат
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 12 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: '#005696', margin: 0 }}>Регистрация</Title>
          <Text type="secondary">Создайте аккаунт для доступа к боту</Text>
        </div>

        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item 
            name="email" 
            rules={[
              { required: true, message: 'Пожалуйста, введите почту!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Почта (Email)" size="large" />
          </Form.Item>

          <Form.Item 
            name="password" 
            rules={[{ required: true, message: 'Пожалуйста, придумайте пароль!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
          </Form.Item>

          <Form.Item 
            name="confirm" 
            dependencies={['password']}
            rules={[
              { required: true, message: 'Пожалуйста, повторите пароль!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Повторите пароль" size="large" />
          </Form.Item>

          <Form.Item>
            {/* 5. Привязываем кнопку к переменной loading */}
            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ background: '#005696' }}>
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text>Уже есть аккаунт? <Link to="/" style={{ color: '#005696' }}>Войти</Link></Text>
          </div>
        </Form>

      </Card>
    </div>
  );
};

export default RegisterPage;
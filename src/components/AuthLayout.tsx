import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 12 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: '#005696', margin: 0 }}>{title}</Title>
          <Text type="secondary">{subtitle}</Text>
        </div>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
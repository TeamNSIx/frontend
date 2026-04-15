import React from 'react';
import { Card, Typography, theme } from 'antd';
import './Auth.css'; 

const { Title, Text } = Typography;

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  const { token } = theme.useToken(); 

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <Title level={3} style={{ color: token.colorPrimary, margin: 0 }}>{title}</Title>
          <Text type="secondary">{subtitle}</Text>
        </div>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
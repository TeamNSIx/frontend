import React from 'react';
import { Typography, theme } from 'antd';
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
    <div className="auth-layout" style={{ 
      background: token.colorBgLayout, 
      position: 'relative', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      width: '100%'
    }}>
      <div style={{ 
        position: 'absolute', 
        top: 20, 
        left: 20, 
        background: token.colorPrimary, 
        color: '#fff', 
        padding: '8px 16px', 
        borderRadius: '6px', 
        fontSize: '16px', 
        fontWeight: 'bold',
        zIndex: 10
      }}>
        KFU BOT
      </div>

      <div className="auth-card" style={{ 
        background: token.colorBgContainer,
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <div className="auth-header" style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>{title}</Title>
          <Text type="secondary">{subtitle}</Text>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
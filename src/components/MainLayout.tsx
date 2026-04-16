import React, { useState } from 'react';
import { Layout, Menu, Button, Input, theme } from 'antd';
import { MessageOutlined, UserOutlined, SettingOutlined, SendOutlined } from '@ant-design/icons';
import './MainLayout.css';

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div className="logo-container" style={{ background: token.colorPrimary, fontSize: collapsed ? '12px' : '18px' }}>
          {collapsed ? 'KFU' : 'KFU BOT'}
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']} items={[
          { key: '1', icon: <MessageOutlined />, label: 'Новый диалог' },
          { key: '2', icon: <UserOutlined />, label: 'Профиль' },
          { key: '3', icon: <SettingOutlined />, label: 'Настройки' },
        ]} />
      </Sider>

      <Layout>
        <Content className="chat-content">
          <div className="chat-header">
            <h2 style={{ margin: 0, color: token.colorPrimary }}>Диалог с ассистентом</h2>
            <span className="chat-subtitle">Готов ответить на ваши вопросы по учебе</span>
          </div>

          <div className="chat-messages-area">
            <div className="bot-message">
              Здравствуйте! Я ваш виртуальный помощник КФУ. Чем могу помочь?
            </div>
          </div>

          <div className="chat-input-area">
            <Input size="large" placeholder="Введите ваш вопрос..." />
            <Button type="primary" size="large" icon={<SendOutlined />}>Отправить</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
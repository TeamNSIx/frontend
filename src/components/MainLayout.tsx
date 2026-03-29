import React, { useState } from 'react';
import { Layout, Menu, Button, Input } from 'antd';
import { MessageOutlined, UserOutlined, SettingOutlined, SendOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Боковая панель */}
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{ borderRight: '1px solid #f0f0f0' }}
      >
        <div style={{ 
          height: 64, 
          margin: 16, 
          background: '#005696', 
          borderRadius: 8, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white', 
          fontWeight: 'bold',
          fontSize: collapsed ? '12px' : '18px',
          transition: 'all 0.2s'
        }}>
          {collapsed ? 'KFU' : 'KFU BOT'}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', icon: <MessageOutlined />, label: 'Новый диалог' },
            { key: '2', icon: <UserOutlined />, label: 'Профиль' },
            { key: '3', icon: <SettingOutlined />, label: 'Настройки' },
          ]}
        />
      </Sider>

      {/* Основная часть с чатом */}
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, display: 'flex', flexDirection: 'column' }}>
          
          {/* Заголовок чата */}
          <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, color: '#005696' }}>Диалог с ассистентом</h2>
            <span style={{ color: 'gray' }}>Готов ответить на ваши вопросы по учебе</span>
          </div>

          {/* Место для сообщений */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#f9f9f9', borderRadius: '8px', marginBottom: '16px' }}>
             {/* Заглушка сообщения от бота */}
             <div style={{ background: '#e6f7ff', padding: '12px', borderRadius: '8px', maxWidth: '70%', marginBottom: '8px', alignSelf: 'flex-start' }}>
                Здравствуйте! Я ваш виртуальный помощник КФУ. Чем могу помочь?
             </div>
          </div>

          {/* Поле ввода */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input size="large" placeholder="Введите ваш вопрос..." />
            <Button type="primary" size="large" icon={<SendOutlined />}>
              Отправить
            </Button>
          </div>

        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { MessageOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import './MainLayout.css';

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      localStorage.removeItem('token');
      navigate('/');
    } else if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'settings') {
      navigate('/settings');
    } else if (key === '1') {
      navigate('/chat');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div className="logo-container" style={{ background: token.colorPrimary, color: '#fff', padding: '16px', textAlign: 'center', fontWeight: 'bold' }}>
          {collapsed ? 'KFU' : 'KFU BOT'}
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']} onClick={handleMenuClick} items={[
          { key: '1', icon: <MessageOutlined />, label: 'Чаты' },
          { key: 'profile', icon: <UserOutlined />, label: 'Профиль' },
          { key: 'settings', icon: <SettingOutlined />, label: 'Настройки' },
          { key: 'logout', icon: <LogoutOutlined />, label: 'Выйти', danger: true },
        ]} />
      </Sider>
      <Layout>
        <Content style={{ background: '#fff', padding: '24px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
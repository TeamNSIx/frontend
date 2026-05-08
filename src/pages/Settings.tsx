import React, { useState } from 'react';
import { Card, Typography, Switch, Divider, Button, message } from 'antd';
import { BellOutlined, MoonOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import './Settings.css';

const { Title, Text } = Typography;

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    message.success('Выход из системы');
  };

  return (
    <div className="settings-page">
      <Card className="settings-card">
        <Title level={3}>Настройки</Title>
        <Divider />

        <div className="setting-item">
          <div className="setting-info">
            <BellOutlined className="setting-icon" />
            <Text strong>Уведомления</Text>
          </div>
          <Switch checked={notifications} onChange={setNotifications} />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <MoonOutlined className="setting-icon" />
            <Text strong>Тёмная тема</Text>
            <Text type="secondary" style={{ marginLeft: 8 }}>(в разработке)</Text>
          </div>
          <Switch checked={darkMode} onChange={setDarkMode} disabled />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <LockOutlined className="setting-icon" />
            <Text strong>Сменить пароль</Text>
          </div>
          <Button type="link" onClick={() => message.info('Функция временно недоступна')}>
            изменить
          </Button>
        </div>

        <Divider />

        <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Выйти из аккаунта
        </Button>
      </Card>
    </div>
  );
};

export default Settings;
import React from 'react';
import { ConfigProvider, Button } from 'antd';

export default function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#005696' } }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#000000' }}>Чат-бот КФУ</h2>
        <Button type="primary" size="large">
          Начать диалог
        </Button>
      </div>
    </ConfigProvider>
  );
}
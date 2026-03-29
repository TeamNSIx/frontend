import React from 'react';
import { ConfigProvider } from 'antd';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#005696' } }}>
      <MainLayout />
    </ConfigProvider>
  );
}

export default App;
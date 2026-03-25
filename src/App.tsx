import React from 'react';
import './App.css'
import { ConfigProvider, Button } from 'antd';

const App: React.FC = () => {
  const kfuTheme = {
    token: {
      colorPrimary: '#005696',
    },
  };

  return (
    <ConfigProvider theme={kfuTheme}>
      <div className='App'>
        <h1>Чат-бот КФУ</h1>
        <div className="card">
          <Button type="primary" size="large">
            Начать диалог
          </Button>
          <p style={{ marginTop: '20px' }}>
            Настройка окружения (Ant Design + KFU Style) завершена успешно.
          </p>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
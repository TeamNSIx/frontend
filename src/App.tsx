import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModeratorLayout from './components/ModeratorLayout';
import AdminDashboard from './pages/AdminDashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import Reviews from './pages/Reviews';
import Documents from './pages/Documents';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#005696' } }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div style={{ padding: 24 }}>Главная. <a href="/moderator">Перейти в админку</a></div>} />
          
          <Route path="/moderator" element={<ModeratorLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="documents" element={<Documents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
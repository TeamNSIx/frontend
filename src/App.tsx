import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/AdminDashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import Reviews from './pages/Reviews';
import Documents from './pages/Documents';
import ModeratorLayout from './components/ModeratorLayout';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#005696' } }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
             <Route index element={<Chat />} />
          </Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/moderator" element={<ProtectedRoute><ModeratorLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="documents" element={<Documents />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
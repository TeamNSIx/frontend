import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, message, Modal, Rate } from 'antd';
import { MessageOutlined, UserOutlined, SettingOutlined, HistoryOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import './MainLayout.css';

interface MessageType {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface DialogType {
  id: number;
  title: string;
  messages: MessageType[];
  lastUpdated: Date;
}

const { Sider, Content } = Layout;
const { TextArea } = Input;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [dialogs, setDialogs] = useState<DialogType[]>([]);
  const [currentDialogId, setCurrentDialogId] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('chat_dialogs');
    if (saved) {
      const parsed = JSON.parse(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDialogs(parsed);
      if (parsed.length) setCurrentDialogId(parsed[0].id);
    } else {
      const newDialog = { id: Date.now(), title: 'Новый диалог', messages: [], lastUpdated: new Date() };
      setDialogs([newDialog]);
      setCurrentDialogId(newDialog.id);
    }
  }, []);

  useEffect(() => {
    if (dialogs.length) localStorage.setItem('chat_dialogs', JSON.stringify(dialogs));
  }, [dialogs]);

  const handleNewDialog = () => {
    const newDialog = { id: Date.now(), title: `Диалог ${dialogs.length + 1}`, messages: [], lastUpdated: new Date() };
    setDialogs(prev => [newDialog, ...prev]);
    setCurrentDialogId(newDialog.id);
    message.success('Новый диалог создан');
    navigate('/chat');
  };

  const handleSelectDialog = (id: number) => {
    setCurrentDialogId(id);
    navigate('/chat');
  };

  const handleSendFeedback = () => {
    if (!feedbackRating) {
      message.warning('Поставьте оценку');
      return;
    }
    const saved = localStorage.getItem('reviews');
    const reviews = saved ? JSON.parse(saved) : [];
    reviews.unshift({
      id: Date.now(),
      user: 'Пользователь',
      rating: feedbackRating,
      comment: feedbackComment,
      date: new Date().toLocaleString(),
      category: 'Чат',
      helpful: true,
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    message.success('Спасибо за отзыв!');
    setFeedbackOpen(false);
    setFeedbackRating(0);
    setFeedbackComment('');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div className="logo-container" style={{ background: '#005696', fontSize: collapsed ? '12px' : '18px' }}>
          {collapsed ? 'KFU' : 'KFU BOT'}
        </div>

        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<MessageOutlined />} onClick={handleNewDialog}>Новый диалог</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate('/profile')}>Профиль</Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>Настройки</Menu.Item>
        </Menu>

        {!collapsed && (
          <div className="history-section">
            <div className="history-header"><HistoryOutlined /> История диалогов</div>
            <div className="history-list">
              {dialogs.map(d => (
                <div key={d.id} className={`history-item ${currentDialogId === d.id ? 'active' : ''}`} onClick={() => handleSelectDialog(d.id)}>
                  <div className="history-title">{d.title}</div>
                  <div className="history-date">{new Date(d.lastUpdated).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Sider>

      <Layout>
        <Content className="chat-content">
          <Outlet />
        </Content>
      </Layout>

      <Modal title="Оставить отзыв" open={feedbackOpen} onOk={handleSendFeedback} onCancel={() => setFeedbackOpen(false)}>
        <Rate onChange={setFeedbackRating} value={feedbackRating} />
        <TextArea rows={3} placeholder="Ваш комментарий..." value={feedbackComment} onChange={e => setFeedbackComment(e.target.value)} style={{ marginTop: 16 }} />
      </Modal>
    </Layout>
  );
};

export default MainLayout;
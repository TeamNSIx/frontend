import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

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

const { TextArea } = Input;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentDialogId, setCurrentDialogId] = useState<number | null>(null);
  const [dialogs, setDialogs] = useState<DialogType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('chat_dialogs');
    if (saved) {
      const parsed = JSON.parse(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDialogs(parsed);
      if (parsed.length) {
        setCurrentDialogId(parsed[0].id);
        setMessages((parsed[0] as DialogType).messages || []);
      }
    }
  }, []);

  useEffect(() => {
    if (currentDialogId && dialogs.length) {
      const updatedDialogs = dialogs.map(d =>
        d.id === currentDialogId ? { ...d, messages, lastUpdated: new Date() } : d
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDialogs(updatedDialogs);
      localStorage.setItem('chat_dialogs', JSON.stringify(updatedDialogs));
    }
  }, [messages, currentDialogId, dialogs]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const userMsg: MessageType = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setTimeout(() => {
      const botMsg: MessageType = {
        id: Date.now() + 1,
        text: 'Спасибо за ваш вопрос! Я обрабатываю информацию и скоро отвечу.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  return (
    <>
      <div className="chat-header">
        <h2>Диалог с ассистентом</h2>
        <span className="chat-subtitle">Готов ответить на ваши вопросы по учебе</span>
      </div>

      <div className="chat-messages-area">
        {messages.length === 0 ? (
          <div className="bot-message">Здравствуйте! Я ваш виртуальный помощник КФУ. Чем могу помочь?</div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className="chat-input-area">
        <TextArea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={e => {
            if (!e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Введите ваш вопрос..."
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={sendMessage}>
          Отправить
        </Button>
      </div>
    </>
  );
};

export default Chat;
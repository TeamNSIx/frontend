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
  const [dialogs] = useState<DialogType[]>(() => {
    const saved = localStorage.getItem('chat_dialogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentDialogId] = useState<number | null>(() => {
    const saved = localStorage.getItem('chat_dialogs');
    if (saved) {
      const parsed: DialogType[] = JSON.parse(saved);
      return parsed.length ? parsed[0].id : null;
    }
    return null;
  });

  const [messages, setMessages] = useState<MessageType[]>(() => {
    const saved = localStorage.getItem('chat_dialogs');
    if (saved) {
      const parsed: DialogType[] = JSON.parse(saved);
      return parsed.length ? parsed[0].messages : [];
    }
    return [];
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (currentDialogId && dialogs.length) {
      const updatedDialogs = dialogs.map(d =>
        d.id === currentDialogId ? { ...d, messages, lastUpdated: new Date() } : d
      );
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
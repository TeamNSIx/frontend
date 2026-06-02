import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface MessageType {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const { TextArea } = Input;
const BASE_URL = 'http://127.0.0.1:8000/api/v1';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [backendChatId, setBackendChatId] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const initChat = async () => {
      if (!token) return;
      
      try {
        const response = await fetch(`${BASE_URL}/conversations/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: "Новый чат",
            is_finished: false
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setBackendChatId(data.id);
        }
      } catch (e) {
        console.error("Ошибка при создании чата:", e);
      }
    };
    
    initChat();
  }, [token]);

  const sendMessage = async () => {
    if (!inputValue.trim() || !backendChatId || !token) return;

    const userMsg: MessageType = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    try {
      const response = await fetch(`${BASE_URL}/conversations/${backendChatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: userMsg.text })
      });

      if (response.ok) {
        const data = await response.json();
        
        const botMsg: MessageType = {
          id: Date.now() + 1,
          text: data.bot_message.content,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (e) {
      console.error("Ошибка при отправке сообщения:", e);
    }
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
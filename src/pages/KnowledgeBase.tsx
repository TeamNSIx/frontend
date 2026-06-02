import React, { useState } from 'react';
import { Input, Button, message } from 'antd';

const { TextArea } = Input;
const BASE_URL = 'http://127.0.0.1:8000/api/v1';

const KnowledgeBase: React.FC = () => {
  const [fragmentText, setFragmentText] = useState('');
  const [urlValue, setUrlValue] = useState('');
  
  // Достаем токен для авторизации админских запросов
  const token = localStorage.getItem('token');

  const handleAddFragment = async () => {
    if (!fragmentText.trim()) {
      message.warning('Введите текст фрагмента');
      return;
    }
    
    try {
      const response = await fetch(`${BASE_URL}/knowledge/fragments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: fragmentText }) 
      });
      
      if (response.ok) {
        message.success('Фрагмент успешно добавлен в базу знаний');
        setFragmentText('');
      } else {
        message.error('Ошибка при добавлении фрагмента');
      }
    } catch (e) {
      console.error(e);
      message.error('Сетевая ошибка');
    }
  };

  const handleAddUrl = async () => {
    if (!urlValue.trim()) {
      message.warning('Введите URL');
      return;
    }
    
    try {
      const response = await fetch(`${BASE_URL}/knowledge/sources/ingest-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url: urlValue })
      });
      
      if (response.ok) {
        message.success('URL успешно загружен и обрабатывается');
        setUrlValue('');
      } else {
        message.error('Ошибка при загрузке URL');
      }
    } catch (e) {
      console.error(e);
      message.error('Сетевая ошибка');
    }
  };

  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>Управление базой знаний (Админка)</h2>
      
      <div style={{ marginBottom: '40px' }}>
        <h3>Добавить текстовый фрагмент</h3>
        <p style={{ color: '#666', marginBottom: '12px' }}>
          Вставьте текст из документов КФУ (правила, расписание, инструкции).
        </p>
        <TextArea 
          rows={6} 
          value={fragmentText} 
          onChange={(e) => setFragmentText(e.target.value)} 
          placeholder="Вставьте текст сюда..."
          style={{ marginBottom: '16px' }}
        />
        <Button type="primary" onClick={handleAddFragment}>
          Добавить фрагмент
        </Button>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '32px' }}>
        <h3>Добавить веб-источник</h3>
        <p style={{ color: '#666', marginBottom: '12px' }}>
          Укажите прямую ссылку на страницу сайта университета, чтобы бот её изучил.
        </p>
        <Input 
          value={urlValue} 
          onChange={(e) => setUrlValue(e.target.value)} 
          placeholder="https://kpfu.ru/..."
          style={{ marginBottom: '16px' }}
        />
        <Button type="primary" onClick={handleAddUrl}>
          Загрузить по ссылке
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeBase;
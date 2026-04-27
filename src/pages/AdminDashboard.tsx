import React from 'react';
import { Typography } from 'antd';
import './AdminDashboard.css';

const { Title, Text } = Typography;

const AdminDashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="page-header">
        <Title level={2} className="page-title">Статистика</Title>
        <Text type="secondary" className="page-subtitle">Обзор активности чат-бота КФУ</Text>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">👥</span>
            <span className="stat-trend up">+12%</span>
          </div>
          <Text type="secondary" className="stat-label">Пользователей</Text>
          <Title level={3} className="stat-value">1 247</Title>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">💬</span>
            <span className="stat-trend up">+8%</span>
          </div>
          <Text type="secondary" className="stat-label">Запросов сегодня</Text>
          <Title level={3} className="stat-value">289</Title>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">⭐</span>
            <span className="stat-trend up">+5%</span>
          </div>
          <Text type="secondary" className="stat-label">Средняя оценка</Text>
          <Title level={3} className="stat-value">4.6</Title>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">🎯</span>
            <span className="stat-trend up">+15%</span>
          </div>
          <Text type="secondary" className="stat-label">Точность ответов</Text>
          <Title level={3} className="stat-value">92%</Title>
        </div>
      </div>
      
      <div className="charts-row">
        <div className="chart-card">
          <Title level={4} className="chart-title">Активность за неделю</Title>
          <div className="activity-chart">
            <div className="bar-item">10.04 <div className="bar" style={{height: '100px'}}></div> 145</div>
            <div className="bar-item">11.04 <div className="bar" style={{height: '120px'}}></div> 178</div>
            <div className="bar-item">12.04 <div className="bar" style={{height: '160px'}}></div> 234</div>
            <div className="bar-item">13.04 <div className="bar" style={{height: '135px'}}></div> 198</div>
            <div className="bar-item">14.04 <div className="bar" style={{height: '180px'}}></div> 267</div>
            <div className="bar-item">15.04 <div className="bar" style={{height: '210px'}}></div> 312</div>
            <div className="bar-item">16.04 <div className="bar" style={{height: '195px'}}></div> 289</div>
          </div>
        </div>
        
        <div className="chart-card">
          <Title level={4} className="chart-title">Популярные вопросы</Title>
          <div className="questions-list">
            <div className="question-item"><span>Как подать документы на поступление?</span><span className="count">342</span></div>
            <div className="question-item"><span>Где находится библиотека?</span><span className="count">287</span></div>
            <div className="question-item"><span>Расписание занятий</span><span className="count">254</span></div>
            <div className="question-item"><span>Стипендия и выплаты</span><span className="count">198</span></div>
            <div className="question-item"><span>Общежитие</span><span className="count">176</span></div>
          </div>
        </div>
      </div>
      
      <div className="activity-card">
        <Title level={4} className="chart-title">Последняя активность</Title>
        <div className="activity-list">
          <div className="activity-item"><span className="time">14:32</span><span className="user">Студент #1247</span><span className="action">Задал вопрос о поступлении</span><span className="rating">★★★★★</span></div>
          <div className="activity-item"><span className="time">14:28</span><span className="user">Студент #1246</span><span className="action">Просмотрел расписание</span><span className="rating">★★★★☆</span></div>
          <div className="activity-item"><span className="time">14:15</span><span className="user">Студент #1245</span><span className="action">Запросил информацию об общежитии</span><span className="rating">★★★★★</span></div>
          <div className="activity-item"><span className="time">14:02</span><span className="user">Студент #1244</span><span className="action">Задал вопрос о стипендии</span><span className="rating">★★★☆☆</span></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './ModeratorLayout.css';

const ModeratorLayout: React.FC = () => {
  return (
    <div className="moderator-layout">
      {/* Sidebar */}
      <aside className="moderator-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">КФУ Чат-бот</h1>
          <p className="sidebar-subtitle">Панель модератора</p>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/moderator" end className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }>
            Статистика
          </NavLink>
          <NavLink to="/moderator/knowledge-base" className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }>
            База знаний
          </NavLink>
          <NavLink to="/moderator/reviews" className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }>
            Отзывы
          </NavLink>
          <NavLink to="/moderator/documents" className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }>
            Загрузка документов
          </NavLink>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">М</div>
            <div>
              <p className="user-name">Модератор</p>
              <p className="user-email">admin@kpfu.ru</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="moderator-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ModeratorLayout;
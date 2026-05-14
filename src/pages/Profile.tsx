import React from 'react';
import { Card, Avatar, Typography, Descriptions } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import './Profile.css';

const { Title } = Typography;

const Profile: React.FC = () => {
  return (
    <div className="profile-page">
      <Card className="profile-card">
        <div className="profile-header">
          <Avatar size={80} icon={<UserOutlined />} />
          <div>
            <Title level={3}>Студент КФУ</Title>
            <div className="profile-role">Обучающийся</div>
          </div>
        </div>

        <Descriptions column={1} bordered>
          <Descriptions.Item label={<><MailOutlined /> Email</>}>
            student@kpfu.ru
          </Descriptions.Item>
          <Descriptions.Item label={<><TeamOutlined /> Группа</>}>
            11-411
          </Descriptions.Item>
          <Descriptions.Item label={<><CalendarOutlined /> Дата регистрации</>}>
            1 сентября 2025
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;
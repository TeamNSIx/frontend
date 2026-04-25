import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { StarFilled, StarOutlined, LikeOutlined, DislikeOutlined, FilterOutlined } from '@ant-design/icons';
import './Reviews.css';

const { Option } = Select;

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
  helpful: boolean;
}

const reviewsData: Review[] = [
  {
    id: 1,
    user: "Студент #1247",
    rating: 5,
    comment: "Очень помогло найти информацию о поступлении. Бот отвечает быстро и точно!",
    date: "16.04.2026 14:32",
    category: "Поступление",
    helpful: true
  },
  {
    id: 2,
    user: "Студент #1246",
    rating: 4,
    comment: "Удобно смотреть расписание через бота, но хотелось бы больше деталей о преподавателях.",
    date: "16.04.2026 14:28",
    category: "Учеба",
    helpful: true
  },
  {
    id: 3,
    user: "Студент #1245",
    rating: 5,
    comment: "Отличный сервис! Нашел всю информацию об общежитии за пару минут.",
    date: "16.04.2026 14:15",
    category: "Общежитие",
    helpful: true
  },
  {
    id: 4,
    user: "Студент #1244",
    rating: 3,
    comment: "Не смог найти информацию о дополнительных стипендиях. Остальное норм.",
    date: "16.04.2026 14:02",
    category: "Финансы",
    helpful: false
  },
  {
    id: 5,
    user: "Студент #1243",
    rating: 5,
    comment: "Бот работает отлично! Быстро нашел нужную информацию о библиотеке.",
    date: "16.04.2026 13:45",
    category: "Библиотека",
    helpful: true
  },
  {
    id: 6,
    user: "Студент #1242",
    rating: 4,
    comment: "Хороший помощник для студентов. Иногда ответы слишком общие.",
    date: "16.04.2026 13:30",
    category: "Общее",
    helpful: true
  },
  {
    id: 7,
    user: "Студент #1241",
    rating: 2,
    comment: "Не понял как пользоваться. Нужны более понятные инструкции.",
    date: "16.04.2026 13:15",
    category: "Общее",
    helpful: false
  },
  {
    id: 8,
    user: "Студент #1240",
    rating: 5,
    comment: "Супер! Очень удобно, что можно быстро найти любую информацию.",
    date: "16.04.2026 12:58",
    category: "Общее",
    helpful: true
  }
];

const Reviews: React.FC = () => {
  const [reviews] = useState<Review[]>(reviewsData);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("Все");

  const categories = ["Все", ...Array.from(new Set(reviews.map(r => r.category)))];

  const filteredReviews = reviews.filter(review => {
    if (filterRating && review.rating !== filterRating) return false;
    if (filterCategory !== "Все" && review.category !== filterCategory) return false;
    return true;
  });

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="reviews-page">
      <div className="page-header">
        <h2 className="page-title">Отзывы пользователей</h2>
        <p className="page-subtitle">Оценки и комментарии студентов</p>
      </div>

      <div className="reviews-summary">
        <div className="summary-card">
          <div className="average-rating">{averageRating}</div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              i < Math.round(parseFloat(averageRating)) ? 
                <StarFilled key={i} className="star filled" /> : 
                <StarOutlined key={i} className="star" />
            ))}
          </div>
          <p className="summary-label">На основе {reviews.length} отзывов</p>
        </div>

        <div className="summary-card">
          <h3 className="distribution-title">Распределение оценок</h3>
          <div className="distribution-list">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="distribution-item">
                <div className="rating-label">{rating} <StarFilled className="small-star" /></div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percentage}%` }} />
                </div>
                <span className="count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="filters-group">
          <FilterOutlined className="filter-icon" />
          <span className="filter-label">Фильтры:</span>
        </div>
        
        <div className="filters-buttons">
          <Button 
            type={filterRating === null ? "primary" : "default"}
            onClick={() => setFilterRating(null)}
          >
            Все оценки
          </Button>
          {[5, 4, 3, 2, 1].map(rating => (
            <Button
              key={rating}
              type={filterRating === rating ? "primary" : "default"}
              onClick={() => setFilterRating(rating)}
            >
              {rating} <StarFilled />
            </Button>
          ))}
        </div>

        <Select
          value={filterCategory}
          onChange={setFilterCategory}
          style={{ width: 160 }}
        >
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
      </div>

      <div className="reviews-list">
        {filteredReviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div>
                <div className="review-user">{review.user}</div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    i < review.rating ? 
                      <StarFilled key={i} className="star filled" /> : 
                      <StarOutlined key={i} className="star" />
                  ))}
                </div>
              </div>
              <div className="review-date">{review.date}</div>
            </div>
            <div className="review-category">{review.category}</div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-helpful">
              {review.helpful ? (
                <div className="helpful-badge positive">
                  <LikeOutlined /> Полезный отзыв
                </div>
              ) : (
                <div className="helpful-badge negative">
                  <DislikeOutlined /> Требует внимания
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="empty-state">Нет отзывов с выбранными фильтрами</div>
      )}
    </div>
  );
};

export default Reviews;
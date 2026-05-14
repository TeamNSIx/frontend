import React, { useState, useEffect } from 'react';
import { Button, Select } from 'antd';
import { StarFilled, StarOutlined, LikeOutlined, FilterOutlined } from '@ant-design/icons';
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

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("Все");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('reviews');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReviews(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const categories = ["Все", ...Array.from(new Set(reviews.map(r => r.category)))];

  const filteredReviews = reviews.filter(review => {
    if (filterRating && review.rating !== filterRating) return false;
    if (filterCategory !== "Все" && review.category !== filterCategory) return false;
    return true;
  });

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length
      ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
      : 0
  }));

  if (loading) {
    return <div className="reviews-page">Загрузка...</div>;
  }

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
        {filteredReviews.length === 0 ? (
          <div className="empty-state">
            <p>Пока нет отзывов от пользователей</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>
              Когда пользователи оставят отзывы в чате — они появятся здесь
            </p>
          </div>
        ) : (
          filteredReviews.map(review => (
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
                <div className="helpful-badge positive">
                  <LikeOutlined /> Полезный отзыв
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
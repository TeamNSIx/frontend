import React, { useState } from 'react';
import './KnowledgeBase.css';

interface KnowledgeItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  lastUpdated: string;
}

const initialKnowledge: KnowledgeItem[] = [
  { id: 1, category: "Поступление", question: "Как подать документы на поступление?", answer: "Для подачи документов необходимо зарегистрироваться на портале абитуриента КФУ, заполнить анкету и загрузить отсканированные копии документов об образовании.", lastUpdated: "15.04.2026" },
  { id: 2, category: "Библиотека", question: "Где находится библиотека?", answer: "Научная библиотека им. Н.И. Лобачевского расположена в главном корпусе КФУ по адресу: ул. Кремлевская, 18.", lastUpdated: "14.04.2026" },
  { id: 3, category: "Учеба", question: "Как посмотреть расписание занятий?", answer: "Расписание доступно в личном кабинете студента на портале edu.kpfu.ru", lastUpdated: "13.04.2026" },
  { id: 4, category: "Финансы", question: "Когда выплачивается стипендия?", answer: "Стипендия начисляется до 25 числа текущего месяца.", lastUpdated: "12.04.2026" },
  { id: 5, category: "Общежитие", question: "Как получить место в общежитии?", answer: "Для получения места в общежитии необходимо подать заявление в отдел по социальной работе.", lastUpdated: "11.04.2026" }
];

const KnowledgeBase: React.FC = () => {
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>(initialKnowledge);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ category: "", question: "", answer: "" });
  const [isAdding, setIsAdding] = useState(false);

  const filteredKnowledge = knowledge.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item: KnowledgeItem) => {
    setEditingId(item.id);
    setEditForm({ category: item.category, question: item.question, answer: item.answer });
    setIsAdding(false);
  };

  const handleSave = () => {
    if (editingId) {
      setKnowledge(knowledge.map(item =>
        item.id === editingId
          ? { ...item, ...editForm, lastUpdated: new Date().toLocaleDateString('ru-RU') }
          : item
      ));
      setEditingId(null);
    }
    setEditForm({ category: "", question: "", answer: "" });
  };

  const handleAdd = () => {
    const newItem: KnowledgeItem = {
      id: Math.max(...knowledge.map(k => k.id)) + 1,
      ...editForm,
      lastUpdated: new Date().toLocaleDateString('ru-RU')
    };
    setKnowledge([newItem, ...knowledge]);
    setIsAdding(false);
    setEditForm({ category: "", question: "", answer: "" });
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этот элемент?")) {
      setKnowledge(knowledge.filter(item => item.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditForm({ category: "", question: "", answer: "" });
  };

  return (
    <div className="knowledge-base">
      <div className="kb-header">
        <div>
          <h2 className="kb-title">База знаний</h2>
          <p className="kb-subtitle">Редактирование вопросов и ответов</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="add-button">+ Добавить</button>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск по базе знаний..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {isAdding && (
        <div className="edit-form adding">
          <h3>Новый элемент</h3>
          <input placeholder="Категория" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} />
          <input placeholder="Вопрос" value={editForm.question} onChange={(e) => setEditForm({ ...editForm, question: e.target.value })} />
          <textarea placeholder="Ответ" rows={4} value={editForm.answer} onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })} />
          <div className="form-actions">
            <button onClick={handleAdd} className="save">Сохранить</button>
            <button onClick={handleCancel} className="cancel">Отмена</button>
          </div>
        </div>
      )}
      
      <div className="knowledge-list">
        {filteredKnowledge.map((item) => (
          <div key={item.id} className="knowledge-item">
            {editingId === item.id ? (
              <div className="edit-form">
                <input value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} />
                <input value={editForm.question} onChange={(e) => setEditForm({ ...editForm, question: e.target.value })} />
                <textarea value={editForm.answer} onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })} rows={4} />
                <div className="form-actions">
                  <button onClick={handleSave} className="save">Сохранить</button>
                  <button onClick={handleCancel} className="cancel">Отмена</button>
                </div>
              </div>
            ) : (
              <>
                <div className="item-header">
                  <span className="category">{item.category}</span>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(item)} className="edit">✏️</button>
                    <button onClick={() => handleDelete(item.id)} className="delete">🗑️</button>
                  </div>
                </div>
                <h3 className="question">{item.question}</h3>
                <p className="answer">{item.answer}</p>
                <p className="updated">Обновлено: {item.lastUpdated}</p>
              </>
            )}
          </div>
        ))}
      </div>
      
      {filteredKnowledge.length === 0 && (
        <div className="empty">Ничего не найдено</div>
      )}
    </div>
  );
};

export default KnowledgeBase;
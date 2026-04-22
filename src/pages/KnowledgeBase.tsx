import React, { useState } from 'react';
import { Button, Input, Modal, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import './KnowledgeBase.css';

const { TextArea } = Input;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [formData, setFormData] = useState({ category: "", question: "", answer: "" });

  const filteredKnowledge = knowledge.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ category: "", question: "", answer: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (item: KnowledgeItem) => {
    setEditingItem(item);
    setFormData({ category: item.category, question: item.question, answer: item.answer });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.category || !formData.question || !formData.answer) {
      message.warning('Заполните все поля');
      return;
    }

    if (editingItem) {
      setKnowledge(knowledge.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, lastUpdated: new Date().toLocaleDateString('ru-RU') }
          : item
      ));
      message.success('Элемент обновлён');
    } else {
      const newItem: KnowledgeItem = {
        id: Math.max(...knowledge.map(k => k.id), 0) + 1,
        ...formData,
        lastUpdated: new Date().toLocaleDateString('ru-RU')
      };
      setKnowledge([newItem, ...knowledge]);
      message.success('Элемент добавлен');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setKnowledge(knowledge.filter(item => item.id !== id));
    message.success('Элемент удалён');
  };

  return (
    <div className="knowledge-base">
      <div className="kb-header">
        <div>
          <h2 className="kb-title">База знаний</h2>
          <p className="kb-subtitle">Редактирование вопросов и ответов</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
          Добавить
        </Button>
      </div>
      
      <div className="search-container">
        <Input
          placeholder="Поиск по базе знаний..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="large"
        />
      </div>
      
      <div className="knowledge-list">
        {filteredKnowledge.map((item) => (
          <div key={item.id} className="knowledge-item">
            <div className="item-header">
              <span className="category">{item.category}</span>
              <div className="item-actions">
                <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(item)} />
                <Popconfirm
                  title="Удалить элемент?"
                  description="Вы уверены, что хотите удалить этот вопрос?"
                  onConfirm={() => handleDelete(item.id)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            </div>
            <h3 className="question">{item.question}</h3>
            <p className="answer">{item.answer}</p>
            <p className="updated">Обновлено: {item.lastUpdated}</p>
          </div>
        ))}
      </div>
      
      {filteredKnowledge.length === 0 && (
        <div className="empty">Ничего не найдено</div>
      )}

      <Modal
        title={editingItem ? "Редактировать вопрос" : "Новый вопрос"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Сохранить"
        cancelText="Отмена"
        width={600}
      >
        <div className="modal-form">
          <div>
            <label>Категория</label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Например: Поступление"
            />
          </div>
          <div>
            <label>Вопрос</label>
            <Input
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Введите вопрос"
            />
          </div>
          <div>
            <label>Ответ</label>
            <TextArea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Введите ответ"
              rows={5}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default KnowledgeBase;
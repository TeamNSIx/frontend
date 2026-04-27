import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { 
  FileOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  DeleteOutlined,
  LoadingOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  InboxOutlined
} from '@ant-design/icons';
import './Documents.css';

const BYTES_PER_KB = 1024;

interface DocumentItem {
  id: number;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  status: 'processing' | 'success' | 'error';
  category: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('documents');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDocuments(JSON.parse(saved) as DocumentItem[]);
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < BYTES_PER_KB) return bytes + ' B';
    if (bytes < BYTES_PER_KB * BYTES_PER_KB) return (bytes / BYTES_PER_KB).toFixed(1) + ' KB';
    return (bytes / (BYTES_PER_KB * BYTES_PER_KB)).toFixed(1) + ' MB';
  };

  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext === 'doc' || ext === 'docx') return 'word';
    if (ext === 'xls' || ext === 'xlsx') return 'excel';
    return 'file';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FilePdfOutlined className="file-icon pdf" />;
      case 'excel':
        return <FileExcelOutlined className="file-icon excel" />;
      case 'word':
        return <FileWordOutlined className="file-icon word" />;
      default:
        return <FileOutlined className="file-icon default" />;
    }
  };

  const handleFileUpload = (file: File) => {
    const newDocument: DocumentItem = {
      id: Date.now(),
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileType(file.name),
      uploadDate: new Date().toLocaleString('ru-RU'),
      status: 'processing',
      category: 'На проверке'
    };

    const updatedDocs = [newDocument, ...documents];
    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));
    message.info(`Файл ${file.name} загружается...`);

    setTimeout(() => {
      setDocuments(prev => {
        const newDocs = prev.map(d => 
          d.id === newDocument.id ? { ...d, status: 'success' as const, category: 'Общее' } : d
        );
        localStorage.setItem('documents', JSON.stringify(newDocs));
        return newDocs;
      });
      message.success(`Файл ${file.name} успешно загружен`);
    }, 2000);
  };

  const handleDelete = (id: number, name: string) => {
    const newDocs = documents.filter(doc => doc.id !== id);
    setDocuments(newDocs);
    localStorage.setItem('documents', JSON.stringify(newDocs));
    message.info(`Файл ${name} удалён`);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const stats = {
    total: documents.length,
    processing: documents.filter(d => d.status === 'processing').length,
    success: documents.filter(d => d.status === 'success').length,
    error: documents.filter(d => d.status === 'error').length
  };

  return (
    <div className="documents-page">
      <div className="page-header">
        <h2 className="page-title">Загрузка документов</h2>
        <p className="page-subtitle">Добавление документов в базу знаний чат-бота</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Всего документов</p>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">В обработке</p>
            <p className="stat-value processing">{stats.processing}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Успешно</p>
            <p className="stat-value success">{stats.success}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Ошибки</p>
            <p className="stat-value error">{stats.error}</p>
          </div>
        </div>
      </div>

      <div 
        className="upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="upload-container">
          <InboxOutlined className="upload-icon" />
          <h3 className="upload-title">Перетащите файлы сюда</h3>
          <p className="upload-text">или нажмите кнопку ниже для выбора файлов</p>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload" className="upload-button">
            Выбрать файлы
          </label>
          <p className="upload-formats">Поддерживаемые форматы: PDF, DOC, DOCX, XLS, XLSX, TXT</p>
        </div>
      </div>

      <div className="documents-list">
        <div className="list-header">
          <h3 className="list-title">Загруженные документы</h3>
        </div>
        
        {documents.length === 0 ? (
          <div className="empty-state">
            <FileOutlined className="empty-icon" />
            <p>Нет загруженных документов</p>
          </div>
        ) : (
          <div className="list-content">
            {documents.map(doc => (
              <div key={doc.id} className="document-item">
                <div className="doc-info">
                  {getFileIcon(doc.type)}
                  <div className="doc-details">
                    <div className="doc-name">{doc.name}</div>
                    <div className="doc-meta">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="doc-status">
                  {doc.status === 'processing' && (
                    <span className="status processing">
                      <LoadingOutlined spin /> Обработка...
                    </span>
                  )}
                  {doc.status === 'success' && (
                    <span className="status success">
                      <CheckCircleOutlined /> Готово
                    </span>
                  )}
                  {doc.status === 'error' && (
                    <span className="status error">
                      <CloseCircleOutlined /> Ошибка
                    </span>
                  )}
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(doc.id, doc.name)}
                    className="delete-btn"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="info-box">
        <div className="info-icon">ℹ️</div>
        <div className="info-content">
          <p className="info-title">Как это работает:</p>
          <ul>
            <li>Загруженные документы автоматически обрабатываются системой</li>
            <li>Информация из документов добавляется в базу знаний чат-бота</li>
            <li>Бот сможет отвечать на вопросы на основе загруженных данных</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Documents;
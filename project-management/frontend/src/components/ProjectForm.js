import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ProjectForm = ({ onSubmit, onClose, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [culminationDate, setCulminationDate] = useState('');
  const [priority, setPriority] = useState('medium');

  // Configurar los valores iniciales si hay datos iniciales (para editar)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setCulminationDate(initialData.culmination_date || '');
      setPriority(initialData.priority || 'medium');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      culmination_date: culminationDate,
      priority
    };
    onSubmit(formData);
  };

  return (
    <div>
      <h2>{initialData ? 'Edit Project' : 'New Project'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="culmination_date">Culmination Date</label>
          <input
            type="date"
            id="culmination_date"
            name="culmination_date"
            value={culminationDate}
            onChange={(e) => setCulminationDate(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div style={styles.buttonGroup}>
          <button type="button" style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" style={styles.updateButton}>
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  updateButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default ProjectForm;

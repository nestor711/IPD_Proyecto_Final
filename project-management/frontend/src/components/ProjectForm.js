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
      <h2 style={styles.modalTitle}>{initialData ? 'Edit Project' : 'New Project'}</h2>
      <hr style={styles.divider} />
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="title">Title</label>
          <input
            style={styles.input}
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="description">Description</label>
          <textarea
            style={styles.textarea}
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="culmination_date">Culmination Date</label>
          <input
            style={styles.input}
            type="date"
            id="culmination_date"
            name="culmination_date"
            value={culminationDate}
            onChange={(e) => setCulminationDate(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="priority">Priority</label>
          <select
            style={styles.select}
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
            CANCEL
          </button>
          <button type="submit" style={styles.addButton}>
            {initialData ? 'UPDATE' : 'ADD'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  modalTitle: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '15px',
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#ccc',
    margin: '10px 0 20px 0',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    border: 'none',
    borderBottom: '1px solid #ccc',
    padding: '5px 0',
    width: '100%',
    marginBottom: '10px',
    fontSize: '16px',
  },
  textarea: {
    border: '1px solid #ccc',
    padding: '10px',
    width: '100%',
    marginBottom: '10px',
    fontSize: '16px',
  },
  select: {
    border: '1px solid #ccc',
    padding: '5px 10px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    cursor: 'pointer',
    borderRadius: '5px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: 'calc(50% - 10px)', // Ajustar el ancho para ocupar desde el lateral hasta el centro
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    cursor: 'pointer',
    borderRadius: '5px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: 'calc(50% - 10px)', // Ajustar el ancho para ocupar desde el lateral hasta el centro
  },
};

export default ProjectForm;

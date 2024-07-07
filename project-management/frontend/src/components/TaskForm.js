import React, { useState, useEffect } from 'react';
import taskImage from '../assets/tarea.png';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTaskData(initialData);
      setIsEditing(true);
    } else {
      setTaskData({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
      });
      setIsEditing(false);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
    if (!isEditing) {
      setTaskData({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.imageContainer}>
        {taskData.title ? (
          <img src={taskImage} alt="task" style={styles.image} />
        ) : (
          <p>No hay tareas creadas para este proyecto.</p>
        )}
      </div>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="title">Título de la Tarea</label>
        <input
          style={styles.input}
          type="text"
          id="title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Ingrese el título"
          required
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="description">Descripción</label>
        <textarea
          style={styles.textarea}
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Ingrese la descripción"
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Estado</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              checked={taskData.status === 'in_progress'}
              onChange={() => handleChange({ target: { name: 'status', value: 'in_progress' } })}
            />
            En Progreso
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              checked={taskData.status === 'completed'}
              onChange={() => handleChange({ target: { name: 'status', value: 'completed' } })}
            />
            Completada
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              checked={taskData.status === 'pending'}
              onChange={() => handleChange({ target: { name: 'status', value: 'pending' } })}
            />
            Pendiente
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              checked={taskData.status === 'cancelled'}
              onChange={() => handleChange({ target: { name: 'status', value: 'cancelled' } })}
            />
            Cancelada
          </label>
        </div>
      </div>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="dueDate">Fecha de Vencimiento</label>
        <input
          style={styles.input}
          type="date"
          id="dueDate"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
        />
      </div>
      <div style={styles.actions}>
        <button type="submit" style={styles.addButton}>
          {isEditing ? 'Actualizar' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
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
  radioGroup: {
    display: 'flex',
    marginBottom: '10px',
  },
  radioLabel: {
    marginRight: '20px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
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
  imageContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
  },
};

export default TaskForm;

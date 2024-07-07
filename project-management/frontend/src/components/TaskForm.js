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
        <label htmlFor="title">Título de la Tarea</label>
        <input
          type="text"
          id="title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div style={styles.field}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
        />
      </div>
      <div style={styles.field}>
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={taskData.status}
          onChange={handleChange}
          required
        >
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completada</option>
          <option value="pending">Pendiente</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </div>
      <div style={styles.field}>
        <label htmlFor="dueDate">Fecha de Vencimiento</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
        />
      </div>
      <div style={styles.actions}>
        <button type="submit">{isEditing ? 'Actualizar' : 'Guardar'}</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
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
    marginBottom: '10px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
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

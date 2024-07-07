import React, { useState, useEffect } from 'react';
import taskImage from '../assets/tarea.png';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  });

  useEffect(() => {
    if (initialData) {
      setTaskData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
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
        <label htmlFor="title">Task Title</label>
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
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
        />
      </div>
      <div style={styles.field}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={taskData.status}
          onChange={handleChange}
          required
        >
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div style={styles.field}>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
        />
      </div>
      <div style={styles.actions}>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
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

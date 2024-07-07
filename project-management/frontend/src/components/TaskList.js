import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <ul style={styles.taskList}>
      {tasks.map((task) => (
        <li key={task.id} style={styles.taskItem}>
          <div style={styles.taskDetails}>
            <span>{task.title}</span>
            <div style={styles.actions}>
              <button style={styles.editButton} onClick={() => onEditTask(task)}>
                <FaEdit /> Edit
              </button>
              <button style={styles.deleteButton} onClick={() => onDeleteTask(task.id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const styles = {
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  taskDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  actions: {
    display: 'flex',
  },
  editButton: {
    marginRight: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default TaskList;

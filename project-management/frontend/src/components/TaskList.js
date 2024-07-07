import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ project, onSelectProject, onDelete }) => {
  const handleEdit = (projectId) => {
    // Lógica para editar el proyecto
    console.log(`Editing project with id ${projectId}`);
  };

  return (
    <div>
      <button style={styles.viewButton} onClick={() => onSelectProject(project)}>
        <FaEye /> View Tasks
      </button>
      <button style={styles.editButton} onClick={() => handleEdit(project.id)}>
        <FaEdit /> Edit
      </button>
      <button style={styles.deleteButton} onClick={onDelete}>
        <FaTrash /> Delete
      </button>
    </div>
  );
};

const styles = {
  viewButton: {
    marginRight: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
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
  }
};

export default TaskList;

import React, { useState } from 'react';
import { deleteProject } from '../api';
import { FaPlus } from 'react-icons/fa';
import ProjectForm from './ProjectForm';

const ProjectList = ({ projects, onSelectProject, onDeleteProject }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    culmination_date: '',
    priority: 'medium'
  });

  const handleDelete = async (projectId) => {
    await deleteProject(projectId);
    onDeleteProject();
  };

  const handleNewProjectClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      title: '',
      description: '',
      culmination_date: '',
      priority: 'medium'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    console.log(formData);
    closeModal();
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <h1 style={styles.title}>Project Management</h1>
        <button style={styles.newProjectButton} onClick={handleNewProjectClick}>
          New Project <FaPlus style={styles.icon} />
        </button>
      </nav>
      
      <ul style={styles.projectList}>
        {projects.map((project) => (
          <li key={project.id} style={styles.projectItem}>
            {project.title}
            <button style={styles.viewButton} onClick={() => onSelectProject(project)}>View Tasks</button>
            <button style={styles.deleteButton} onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <ProjectForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
  newProjectButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  icon: {
    marginLeft: '10px',
  },
  projectList: {
    listStyle: 'none',
    padding: 0,
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  viewButton: {
    marginRight: '10px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  }
};

export default ProjectList;

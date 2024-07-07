import React, { useState } from 'react';
import { deleteProject } from '../api';
import { FaPlus } from 'react-icons/fa';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import TaskList from './TaskList';

const ProjectList = ({ projects, onSelectProject, onDeleteProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (projectId) => {
    await deleteProject(projectId);
    onDeleteProject();
  };

  const handleNewProjectClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    // Aquí deberías manejar la creación del nuevo proyecto
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
            <TaskList
              project={project}
              onSelectProject={onSelectProject}
              onDelete={() => handleDelete(project.id)}
            />
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ProjectForm onSubmit={handleSubmit} onClose={closeModal} />
      </Modal>
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
    backgroundColor: '#512da8',
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
};

export default ProjectList;

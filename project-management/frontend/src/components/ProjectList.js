import React, { useState, useEffect } from 'react';
import { deleteProject, createProject, updateProject } from '../api';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ProjectForm from './ProjectForm';
import Modal from './Modal';
import Swal from 'sweetalert2';

const ProjectList = ({ projects, onSelectProject, onDeleteProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState(projects); // Estado local para los proyectos
  const [editProject, setEditProject] = useState(null); // Estado para el proyecto que se está editando

  useEffect(() => {
    setProjectList(projects); // Actualizar el estado local cuando cambian los proyectos externos
  }, [projects]);

  const handleDelete = async (projectId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this project!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProject(projectId);
        const updatedProjects = projectList.filter(project => project.id !== projectId);
        setProjectList(updatedProjects); // Actualizar el estado local removiendo el proyecto eliminado
        Swal.fire('Deleted!', 'Your project has been deleted.', 'success');
        onDeleteProject();
      }
    });
  };

  const handleNewProjectClick = () => {
    setIsModalOpen(true);
    setEditProject(null); // Limpiar el proyecto en edición
  };

  const handleEditProject = (project) => {
    setEditProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditProject(null); // Limpiar el proyecto en edición al cerrar el modal
  };

  const handleSubmit = async (formData) => {
    try {
      if (editProject) {
        // Actualizar proyecto existente
        const response = await updateProject(editProject.id, formData);
        const updatedProject = response.data;
        const updatedProjects = projectList.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        );
        setProjectList(updatedProjects); // Actualizar el estado local con el proyecto actualizado
        Swal.fire('Updated!', 'Your project has been updated.', 'success');
      } else {
        // Crear nuevo proyecto
        const response = await createProject(formData);
        const newProject = response.data;
        setProjectList([...projectList, newProject]); // Agregar el nuevo proyecto al estado local
        Swal.fire('Created!', 'Your new project has been created.', 'success');
      }
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <h1 style={styles.title}>Project Management</h1>
        <button style={styles.newProjectButton} onClick={handleNewProjectClick}>
          NEW PROJECT <FaPlus style={styles.icon} />
        </button>
      </nav>
      
      <ul style={styles.projectList}>
        {projectList.map((project) => (
          <li key={project.id} style={styles.projectItem}>
            <div style={styles.projectDetails}>
              <span style={styles.projectTitle}>{project.title}</span>
              <div style={styles.projectInfo}>
                <div><strong>Created:</strong> {new Date(project.created_at).toLocaleDateString()}</div>
                <div><strong>Culmination:</strong> {project.culmination_date}</div>
                <div><strong>Priority:</strong> {project.priority}</div>
              </div>
              <div style={styles.actions}>
                <button style={styles.viewButton} onClick={() => onSelectProject(project)}>
                  <FaEye /> View Tasks
                </button>
                <button style={styles.editButton} onClick={() => handleEditProject(project)}>
                  <FaEdit /> Edit
                </button>
                <button style={styles.deleteButton} onClick={() => handleDelete(project.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ProjectForm
          onSubmit={handleSubmit}
          onClose={closeModal}
          initialData={editProject} // Pasar los datos iniciales del proyecto para editar
        />
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
    backgroundColor: '#512da8', // Cambiado el color de fondo del navbar
    color: '#fff',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
  newProjectButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#512da8', // Cambiado el color de fondo del botón
    color: '#fff',
    border: '2px solid #fff', // Añadido el contorno blanco
    padding: '10px 20px',
    textTransform: 'uppercase', // Texto en mayúsculas
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
    flexDirection: 'column',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  projectDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '5px',
  },
  projectInfo: {
    marginBottom: '5px',
  },
  actions: {
    display: 'flex',
  },
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
  },
};

export default ProjectList;

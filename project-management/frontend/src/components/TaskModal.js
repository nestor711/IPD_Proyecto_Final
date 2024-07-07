import React, { useState, useEffect } from 'react';
import taskImage from '../assets/tarea.png';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Modal from './Modal';
import { fetchTasks, createTask, deleteTask, updateTask } from '../api';

const TaskModal = ({ isOpen, onClose, projectId, onCreateTask, onUpdateTask, onDeleteTask }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Inicialmente oculto el formulario

  useEffect(() => {
    if (isOpen) {
      fetchTasks(projectId)
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [isOpen, projectId]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask({ ...taskData, projectId });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      onCreateTask();
      setIsFormVisible(true); // Mostrar formulario después de crear una tarea
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await updateTask(taskData.id, taskData);
      const updatedTask = response.data;
      const updatedTasks = tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      onUpdateTask();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Mostrar alerta de confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTask(taskId);
          const updatedTasks = tasks.filter(task => task.id !== taskId);
          setTasks(updatedTasks);
          onDeleteTask();
          Swal.fire(
            '¡Eliminado!',
            'La tarea ha sido eliminada.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting task:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al intentar eliminar la tarea.',
            'error'
          );
        }
      }
    });
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsFormVisible(true);
  };

  const handleCancelEdit = () => {
    setSelectedTask(null);
    setIsFormVisible(false);
  };

  const hasTasks = tasks.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <h2 style={styles.title}>Tareas</h2>
          <TaskForm
            onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
            initialData={selectedTask}
            onCancel={handleCancelEdit}
          />
          {!hasTasks && (
            <div style={styles.noTasksMessage}>
              <img src={taskImage} alt="task" style={styles.image} />
              <p>No hay tareas creadas para este proyecto.</p>
            </div>
          )}
        </div>
        <div style={styles.rightColumn}>
          {hasTasks && <TaskList tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />}
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: '0 0 45%',
    paddingRight: '20px',
  },
  rightColumn: {
    flex: '0 0 50%',
    borderLeft: '1px solid #ccc',
    paddingLeft: '20px',
  },
  title: {
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  noTasksMessage: {
    textAlign: 'center',
    marginTop: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    marginBottom: '10px',
  },
};

export default TaskModal;

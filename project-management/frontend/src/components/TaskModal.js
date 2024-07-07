import React, { useState, useEffect } from 'react';
import taskImage from '../assets/tarea.png';
import Swal from 'sweetalert2'; // Import SweetAlert2
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Modal from './Modal';
import { fetchTasks, createTask, deleteTask, updateTask } from '../api';

const TaskModal = ({ isOpen, onClose, projectId, onCreateTask, onUpdateTask, onDeleteTask }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Initially hide the form

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
      setIsFormVisible(true); // Show form after creating a task
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
    // Show confirmation alert using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTask(taskId);
          const updatedTasks = tasks.filter(task => task.id !== taskId);
          setTasks(updatedTasks);
          onDeleteTask();
          Swal.fire(
            'Deleted!',
            'The task has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting task:', error);
          Swal.fire(
            'Error',
            'There was a problem deleting the task.',
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
          <h2 style={styles.title}>Tasks</h2>
          <TaskForm
            onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
            initialData={selectedTask}
            onCancel={handleCancelEdit}
          />
          {!hasTasks && (
            <div style={styles.noTasksMessage}>
              <img src={taskImage} alt="task" style={styles.image} />
              <p>No tasks created for this project.</p>
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
    width: '800px', // Adjust modal width as needed
    maxHeight: '1000px', // Adjust modal max height as needed
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

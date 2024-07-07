import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Modal from './Modal';
import taskImage from '../assets/tarea.png';
import { fetchTasks, createTask, deleteTask, updateTask } from '../api';

const TaskModal = ({ isOpen, onClose, projectId, onCreateTask, onUpdateTask, onDeleteTask }) => {
  const [tasks, setTasks] = useState([]);

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
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      onDeleteTask();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const hasTasks = tasks.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <h2 style={styles.title}>Tareas</h2>
          <TaskForm onSubmit={handleCreateTask} onCancel={onClose} />
          {!hasTasks && (
            <div style={styles.noTasksMessage}>
              <img src={taskImage} alt="task" style={styles.image} />
              <p>No hay tareas creadas para este proyecto.</p>
            </div>
          )}
        </div>
        <div style={styles.rightColumn}>
          <TaskList tasks={tasks} onEditTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
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

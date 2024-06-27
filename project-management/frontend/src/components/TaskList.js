import React from 'react';
import { deleteTask } from '../api';

const TaskList = ({ tasks, onDeleteTask }) => {
  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    onDeleteTask();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.description}
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

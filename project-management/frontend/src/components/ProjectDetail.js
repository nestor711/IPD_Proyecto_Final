import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get(`/api/projects/${id}`)
      .then(response => {
        setProject(response.data);
        return axios.get(`/api/projects/${id}/tasks`);
      })
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the project details!', error);
      });
  }, [id]);

  const addTask = () => {
    axios.post(`/api/projects/${id}/tasks`, { name: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch(error => {
        console.error('There was an error adding the task!', error);
      });
  };

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default ProjectDetail;

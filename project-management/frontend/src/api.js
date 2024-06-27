import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchProjects = () => axios.get(`${API_URL}/projects`);
export const createProject = (project) => axios.post(`${API_URL}/projects`, project);
export const deleteProject = (projectId) => axios.delete(`${API_URL}/projects/${projectId}`);

export const fetchTasks = (projectId) => axios.get(`${API_URL}/tasks?projectId=${projectId}`);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);
export const deleteTask = (taskId) => axios.delete(`${API_URL}/tasks/${taskId}`);

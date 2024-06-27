import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import { fetchProjects, fetchTasks } from './api';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadProjects();
    }
  }, [isLoggedIn]);

  const loadProjects = async () => {
    const response = await fetchProjects();
    setProjects(response.data);
  };

  const loadTasks = async (projectId) => {
    const response = await fetchTasks(projectId);
    setTasks(response.data);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div>
          <h1>Project Management</h1>
          <ProjectForm onAddProject={loadProjects} />
          <ProjectList
            projects={projects}
            onSelectProject={(project) => {
              setSelectedProject(project);
              loadTasks(project.id);
            }}
            onDeleteProject={loadProjects}
          />
          {selectedProject && (
            <div>
              <h2>Tasks for {selectedProject.name}</h2>
              <TaskForm projectId={selectedProject.id} onAddTask={() => loadTasks(selectedProject.id)} />
              <TaskList tasks={tasks} onDeleteTask={() => loadTasks(selectedProject.id)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

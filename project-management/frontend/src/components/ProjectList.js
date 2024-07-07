import React from 'react';
import { deleteProject } from '../api';

const ProjectList = ({ projects, onSelectProject, onDeleteProject }) => {
  const handleDelete = async (projectId) => {
    await deleteProject(projectId);
    onDeleteProject();
  };

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          {project.title}
          <button onClick={() => onSelectProject(project)}>View Tasks</button>
          <button onClick={() => handleDelete(project.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;

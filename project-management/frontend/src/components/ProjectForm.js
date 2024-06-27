import React, { useState } from 'react';
import { createProject } from '../api';

const ProjectForm = ({ onAddProject }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject({ name });
    setName('');
    onAddProject();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
        required
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;

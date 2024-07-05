import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/login.css';

const API_URL = '/api';

const LoginForm = ({ username, password, setUsername, setPassword, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <h1>Iniciar Sesión</h1>
    <div className="social-icons">
      <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
      <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
      <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
      <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
    </div>
    <span>o utiliza tu nombre de usuario para ingresar</span>
    <input
      type="text"
      placeholder="Nombre de Usuario"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      aria-label="Nombre de Usuario"
      required
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      aria-label="Contraseña"
      required
    />
    <a href="#">¿Olvidaste tu contraseña?</a>
    <button type="submit">Ingresar</button>
  </form>
);

const RegisterForm = ({ name, username, password, setName, setUsername, setPassword, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <h1>Crear Cuenta</h1>
    <div className="social-icons">
      <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
      <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
      <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
      <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
    </div>
    <span>o utiliza tu nombre de usuario para registrarte</span>
    <input
      type="text"
      placeholder="Nombre"
      value={name}
      onChange={(e) => setName(e.target.value)}
      aria-label="Nombre"
      required
    />
    <input
      type="text"
      placeholder="Nombre de Usuario"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      aria-label="Nombre de Usuario"
      required
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      aria-label="Contraseña"
      required
    />
    <button type="submit">Registrar</button>
  </form>
);

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos del formulario
    if (!username || !password || (!isLogin && !name)) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, llena todos los campos.'
      });
      return;
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const data = isLogin ? { username, password } : { name, username, password };
      const response = await axios.post(`${API_URL}${endpoint}`, data);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      onLogin();
    } catch (error) {
      console.error(`Error ${isLogin ? 'iniciando sesión' : 'registrando'}`, error);
      Swal.fire({
        icon: 'error',
        title: `Error ${isLogin ? 'iniciando sesión' : 'registrando'}`,
        text: error.response?.data?.message || 'Ocurrió un error. Por favor, inténtalo de nuevo.'
      });
    }
  };

  return (
    <div className="container" id="container">
      <div className={`form-container ${isLogin ? 'sign-in' : 'sign-up'}`}>
        {isLogin ? (
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        ) : (
          <RegisterForm
            name={name}
            username={username}
            password={password}
            setName={setName}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Introduce tus datos personales para acceder a todas las funciones del sitio</p>
            <button className="hidden" onClick={() => setIsLogin(true)}>Iniciar Sesión</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>¡Hola, Amigo!</h1>
            <p>Regístrate con tus datos personales para acceder a todas las funciones del sitio</p>
            <button className="hidden" onClick={() => setIsLogin(false)}>Crear Cuenta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

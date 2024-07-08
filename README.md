# SmartTask Project Manager

## Proyecto: Implementación y Evaluación de un Sistema de Orquestación de Contenedores para Alta Disponibilidad en Procesamiento Distribuido

Proyecto realizado para el curso de Infraestructuras Paralelas y Distribuidas en la Universidad de Valle.

### Grupo de Trabajo:
- Néstor David Heredia Gutiérrez - 2058558
- Brayan Camilo Urrea Jurado - 2410023
- Kevin Alejandro Vélez Agudelo - 2123281

### Docente:

John Alexander Sanabria Ordóñez

Fecha: 08 de julio del 2024

## 1. Introducción
Este informe detalla el diseño, implementación y evaluación de un sistema de orquestación de contenedores enfocado en la alta disponibilidad para una aplicación de gestión de proyectos y tareas. La implementación utiliza tecnologías modernas de contenedores y orquestación, como Docker Swarm, para garantizar la escalabilidad y resiliencia del sistema. La aplicación permite operaciones CRUD sobre proyectos y tareas, con persistencia en una base de datos relacional y un diseño modular que facilita el despliegue en contenedores.

## 2. Descripción del Proyecto
### Objetivo
Validar la alta disponibilidad proporcionada por Docker Swarm en el desarrollo y despliegue de aplicaciones basadas en contenedores.

### Aplicación Propuesta
"SmartTask Project Manager" es una aplicación diseñada para la gestión integral de proyectos y tareas en empresas de software. Cada proyecto puede incluir múltiples tareas, con funcionalidades robustas de CRUD y persistencia en PostgreSQL. La arquitectura modular permite el despliegue eficiente en contenedores Docker Swarm, asegurando escalabilidad y resiliencia.


### 3. Tecnologías Utilizadas

- Frontend: React.js
- Backend: Node.js con Express.js
- Base de Datos: PostgreSQL
- Orquestación de Contenedores: Docker Swarm
- Pruebas de Rendimiento: Locust

### 4. Comandos para Despliegue y Acceso Local

- Iniciar Docker Swarm en el nodo:
  
  #### docker swarm init

- Comandos para construir las imágenes y desplegar servicios en Docker Swarm

  Construcción de la Imagen del Backend:
  
  #### docker build -t project_backend -f Dockerfile.backend

  Construcción de la Imagen del Frontend:

  #### docker build -t project_frontend -f Dockerfile.frontend

  Construcción de la Imagen de Locust:
  
  #### docker build -t project_locust -f Dockerfile.locust .
  
- Crear y desplegar servicios con Docker Stack
  
  #### docker stack deploy -c docker-compose.yml taskapp

- Verificar servicios desplegados en Docker Swarm
  
  #### docker service ls

### 5. Acceso a la Aplicación

Después del despliegue, la aplicación estará disponible en:

- Frontend: http://localhost
- Backend: http://localhost:3000
- Locust Interface: http://localhost:8089

Estos son los elementos clave que necesitas para configurar, desplegar y acceder a tu aplicación "SmartTask Project Manager" usando Docker Swarm y React/Node.js.

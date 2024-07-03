# IPD_Proyecto_Final

## Proyecto: Implementación y Evaluación de un Sistema de Orquestación de Contenedores para Alta Disponibilidad en Procesamiento Distribuido.

Descripción: Este proyecto examina cómo Docker Swarm puede mejorar la disponibilidad de aplicaciones distribuidas basadas en contenedores. Hemos desarrollado una aplicación web para la gestión de proyectos y tareas, diseñada con una arquitectura modular y desplegada utilizando Docker Swarm. El objetivo es validar las capacidades de alta disponibilidad de Docker Swarm mediante pruebas de rendimiento y escenarios de fallo.

## Objetivos:
- Diseñar e Implementar una aplicación web modular para la gestión de proyectos y tareas.
- Desplegar la aplicación utilizando Docker Swarm para aprovechar sus capacidades de orquestación.
- Evaluar la disponibilidad del sistema mediante pruebas de rendimiento y simulaciones de fallos.
  
## Características Clave:
- Gestión de Proyectos y Tareas: Realizar operaciones CRUD con persistencia en una base de datos relacional.
- Modularidad: Cada componente está desplegado en contenedores para facilitar la escalabilidad y gestión.
- Registro de Operaciones: Todas las operaciones CRUD se registran en un archivo de log.
- Pruebas de Disponibilidad: Uso de herramientas como Locust y JMeter para pruebas de carga y análisis de resiliencia del sistema.
  
Este proyecto demuestra la capacidad de Docker Swarm para gestionar y mantener aplicaciones distribuidas altamente disponibles, incluso bajo condiciones de estrés y fallos.

#!/bin/bash
eval $(minikube -p minikube docker-env)
docker build -t backend:latest ./backend
docker build -t frontend:latest ./frontend

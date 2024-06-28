#!/bin/bash
kubectl apply -f infra/k8s/backend-deployment.yml
kubectl apply -f infra/k8s/frontend-deployment.yml
kubectl apply -f infra/k8s/postgres-deployment.yml

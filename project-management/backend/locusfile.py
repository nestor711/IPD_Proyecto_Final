import json
import random
from locust import HttpUser, task, between

class ProjectUser(HttpUser):
    wait_time = between(1, 3)
    token = None
    user_data = None
    project_data = None
    task_data = None
    current_user = None

    def on_start(self):
        # Cargar datos de los archivos JSON
        with open('users.json') as f:
            self.user_data = json.load(f)
        with open('projects.json') as f:
            self.project_data = json.load(f)
        with open('tasks.json') as f:
            self.task_data = json.load(f)

        # Seleccionar un usuario aleatorio
        self.current_user = random.choice(self.user_data)

        # Intentar registrar al usuario
        register_response = self.client.post("/api/auth/register", json={
            "username": self.current_user["username"],
            "password": self.current_user["password"],
            "name": self.current_user["name"]
        })

        # Intentar hacer login
        login_response = self.client.post("/api/auth/login", json={
            "username": self.current_user["username"],
            "password": self.current_user["password"]
        })

        if login_response.status_code == 200:
            self.token = login_response.json()["token"]
        else:
            print(f"Failed to login user {self.current_user['username']}")

    @task
    def get_projects(self):
        if self.token:
            self.client.get("/api/projects", headers={"x-auth-token": self.token})

    @task
    def create_project(self):
        if self.token:
            project = random.choice(self.project_data)
            self.client.post("/api/projects", 
                headers={"x-auth-token": self.token},
                json={
                    "title": project["title"],
                    "description": project["description"],
                    "priority": project["priority"],
                    "culmination_date": project["culmination_date"]
                })

    @task
    def get_all_tasks(self):
        if self.token:
            self.client.get("/api/tasks", headers={"x-auth-token": self.token})

    @task
    def create_task(self):
        if self.token:
            task = random.choice(self.task_data)
            project = random.choice(self.project_data)
            self.client.post("/api/tasks", 
                headers={"x-auth-token": self.token},
                json={
                    "title": task["title"],
                    "description": task["description"],
                    "projectId": project["id"],
                    "status": task["status"],
                    "completion_date": task["completion_date"]
                })

    @task
    def get_project_tasks(self):
        if self.token:
            project = random.choice(self.project_data)
            self.client.get(f"/api/tasks?projectId={project['id']}", headers={"x-auth-token": self.token})
import json
import random
import os
from locust import HttpUser, task, between

BASE_URL = os.getenv('TARGET_HOST', 'http://backend:3000')

class ProjectUser(HttpUser):
    wait_time = between(1, 3)
    token = None
    user_data = None
    project_data = None
    task_data = None

    def on_start(self):
        # Cargar datos de los archivos JSON
        try:
            with open('users.json') as f:
                self.user_data = json.load(f)
            with open('projects.json') as f:
                self.project_data = json.load(f)
            with open('tasks.json') as f:
                self.task_data = json.load(f)
            print("Data loaded successfully from JSON files")
        except Exception as e:
            print(f"Error loading data: {e}")
            return

        # Intentar registrar un usuario aleatorio
        if self.user_data:
            self.current_user = random.choice(self.user_data)
            self.register_and_login()
        else:
            print("No user data available")

    def register_and_login(self):
        # Registro
        register_data = {
            "username": self.current_user["username"],
            "password": self.current_user["password"],
            "name": self.current_user["name"]
        }
        print(f"Attempting to register user at URL: {BASE_URL}/api/auth/register")
        register_response = self.client.post(f"{BASE_URL}/api/auth/register", json=register_data)
        
        print(f"Register response status: {register_response.status_code}")
        print(f"Register response content: {register_response.text}")

        if register_response.status_code == 200:
            print(f"User {register_data['username']} registered successfully")
        else:
            print(f"Failed to register user {register_data['username']}")

        # Login
        login_data = {
            "username": self.current_user["username"],
            "password": self.current_user["password"]
        }
        print(f"Attempting to login user at URL: {BASE_URL}/api/auth/login")
        login_response = self.client.post(f"{BASE_URL}/api/auth/login", json=login_data)

        print(f"Login response status: {login_response.status_code}")
        print(f"Login response content: {login_response.text}")

        if login_response.status_code == 200:
            self.token = login_response.json().get("token")
            if self.token:
                print(f"User {login_data['username']} logged in successfully")
            else:
                print(f"Login successful but no token received for user {login_data['username']}")
        else:
            print(f"Failed to login user {login_data['username']}")

    @task
    def create_project(self):
        if self.token and self.project_data:
            project = random.choice(self.project_data)
            project_data = {
                "title": project["title"],
                "description": project["description"],
                "culmination_date": project["culmination_date"],
                "priority": project["priority"]
                
            }
            print(f"Attempting to create project at URL: {BASE_URL}/api/projects")
            response = self.client.post(f"{BASE_URL}/api/projects",
                headers={"x-auth-token": self.token},
                json=project_data)
            print(f"Create project response status: {response.status_code}")
            print(f"Create project response content: {response.text}")

    @task
    def get_projects(self):
        if self.token:
            print(f"Attempting to get all projects at URL: {BASE_URL}/api/projects")
            response = self.client.get(f"{BASE_URL}/api/projects", headers={"x-auth-token": self.token})
            print(f"Get projects response status: {response.status_code}")
            print(f"Get projects response content: {response.text}")

    @task
    def create_task(self):
        if self.token and self.task_data:
            print(f"Attempting to get projects for task creation at URL: {BASE_URL}/api/projects")
            projects_response = self.client.get(f"{BASE_URL}/api/projects", headers={"x-auth-token": self.token})
            if projects_response.status_code == 200:
                projects = projects_response.json()
                if projects:
                    project = random.choice(projects)
                    task = random.choice(self.task_data)
                    task_data = {
                        "title": task["title"],
                        "description": task["description"],
                        "completion_date": task["completion_date"],
                        "status": task["status"],
                        "projectId": project["id"]
                        
                        
                    }
                    print(f"Attempting to create task at URL: {BASE_URL}/api/tasks")
                    response = self.client.post(f"{BASE_URL}/api/tasks",
                        headers={"x-auth-token": self.token},
                        json=task_data)
                    print(f"Create task response status: {response.status_code}")
                    print(f"Create task response content: {response.text}")
                else:
                    print("No projects found to create a task")
            else:
                print(f"Failed to get projects: {projects_response.status_code}")

    @task
    def get_tasks(self):
        if self.token:
            print(f"Attempting to get all tasks at URL: {BASE_URL}/api/tasks")
            response = self.client.get(f"{BASE_URL}/api/tasks", headers={"x-auth-token": self.token})
            print(f"Get tasks response status: {response.status_code}")
            print(f"Get tasks response content: {response.text}")
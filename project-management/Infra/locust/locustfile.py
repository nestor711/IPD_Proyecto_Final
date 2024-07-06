from locust import HttpUser, task, between

class ProjectUser(HttpUser):
    wait_time = between(1, 5)
    
    @task
    def get_projects(self):
        self.client.get("/api/projects")
    
    @task
    def create_project(self):
        payload = {
            "name": "Test Project",
            "description": "This is a test project",
            "start_date": "2024-07-06",
            "end_date": "2024-12-31"
        }
        self.client.post("/api/projects", json=payload)
    
    @task
    def get_tasks(self):
        self.client.get("/api/tasks")
    
    @task
    def create_task(self):
        payload = {
            "name": "Test Task",
            "description": "This is a test task",
            "project_id": 1,
            "start_date": "2024-07-06",
            "end_date": "2024-07-20"
        }
        self.client.post("/api/tasks", json=payload)

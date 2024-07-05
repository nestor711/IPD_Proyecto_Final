from locust import HttpUser, task, between

class ProjectTaskSet(HttpUser):
    wait_time = between(1, 5)

    @task
    def list_projects(self):
        self.client.get("/api/proyectos")

    @task
    def create_project(self):
        self.client.post("/api/proyectos", json={"nombre": "Nuevo Proyecto"})

    @task
    def delete_project(self):
        self.client.delete("/api/proyectos/1")  # Ejemplo de ID

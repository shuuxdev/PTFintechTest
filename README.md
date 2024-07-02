A simple task management system using ASP.NET Core, React, PostgreSQL, EntityFramework:
# Main features:
#### 1. User Registration and Login: 
• Users can register an account (including username, password, and email). <br/>
• Users can log in and log out of the system. <br/>
#### 2. Task Management: 
• Logged-in users can create, edit, delete, and view tasks. <br/>
• Each task includes a title, description, status (to-do, in progress, completed), and due date. <br/>
#### 3. Filtering and Sorting:
• Users can filter tasks based on their status (to-do, in progress, completed). <br/>
• Users can sort tasks by their due date, supporting both ascending and descending order. <br/>
#### 4. User Role Management: 
• Add roles for admin and regular users. <br/>
• Admins can manage all users and tasks, while regular users can only manage their own tasks. <br/>
• Keyword Search: Users can search tasks based on the title. <br/>
![image](https://github.com/shuuxdev/PTFintechTest/assets/72917643/cd89ebdc-c870-4ce8-bd51-27480dc68ad0)
![image](https://github.com/shuuxdev/PTFintechTest/assets/72917643/8321c5f6-1aa9-4c94-9484-1940e207c8f0)

## Deployment Instructions

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps to Deploy Using Docker Compose

Steps to Deploy Using Docker Compose

  Clone the Repository

  ```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```




Build and Start Containers

```bash
docker-compose up --build
```
#### This command will:

Build Docker images for the frontend, backend, and PostgreSQL services.
Create and start containers for each service.
Output logs from all containers to the terminal.

#### Access the Application

Once the containers are running, you can access the application: <br/>
Frontend (React): http://localhost:3000<br/>
Backend (ASP.NET Core): http://localhost:5000<br/>
Swagger API Documentation: http://localhost:5000/swagger<br/>
PostgreSQL (Database): Database is accessible internally within the Docker network.<br/>

#### Stopping the Application

To stop the application and remove containers, press Ctrl + C in the terminal where docker-compose up is running.

#### Cleaning Up

Optionally, clean up Docker resources (containers, networks, volumes):

```bash
    docker-compose down --volumes
```
#### Notes

Make sure ports 3000 (frontend), 5000 (backend), and 5432 (PostgreSQL) are not used by other applications on your system. <br/>
Adjust any configuration settings as needed in the docker-compose.yml file.

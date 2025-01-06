const readmeContent = `
# EventEase  
An event management web app using NestJS & ReactJS  

## Technologies Used  
- **NestJS**  
- **ReactJS**  
- **Tailwind CSS**  
- **TypeScript**  
- **HeroIcons**  

---

## How to Install  

### Step 1: Clone the Repositories  
Clone the backend and frontend repositories:  

```js 
git clone https://github.com/meedGhoufrane/EventEase.git  
```  

### Step 2: Navigate to the Project Folder  
```http   
cd EventEase  
```  

### Step 3: Open the Project in Visual Studio Code  
```http   
code .  
```  

### Step 4: Install Backend Dependencies and Run the Server  
Navigate to the backend folder and install dependencies:  

```http   
cd backend  
npm install  
npm run start:dev  
```  

### Step 5: Install Frontend Dependencies and Run the Client  
Navigate to the frontend folder and install dependencies:  

```http 
cd ../frontend  
npm install  
npm run dev  
```  

---

## Docker Installation  

If you have Docker installed, you can run the project using Docker containers for all services.  

### Step 1: Ensure Docker is Installed  
Make sure Docker is installed and running on your system.  

### Step 2: Pull the Docker Images  
Pull the prebuilt images for the services:  

```http  
docker pull meedghoufrane/eventease-backend  
docker pull meedghoufrane/eventease-frontend  
```  

### Step 3: Run the Containers  
Run the containers for the services:  

```http 
docker run -d -p 3001:3001 --name eventease-backend meedghoufrane/eventease-backend  
docker run -d -p 8080:8080 --name eventease-frontend meedghoufrane/eventease-frontend  
```  

### Step 4: Verify the Services  
To check if the containers are running, use the command:  

```http
docker ps  
```  

You should see the following containers listed:  

- **EventEase Backend** on \`3001:3001\`  
- **EventEase Frontend** on \`8080:8080\`  

---

## Accessing the Application  

- **Frontend:** [http://localhost:8080](http://localhost:8080)  
- **Backend API:** [http://localhost:3001](http://localhost:3001)  

---

## API Documentation  
For detailed API documentation, visit:  
[API Documentation Link](#)  

---

Feel free to customize the placeholders (like Docker image names or API documentation link) as per your actual implementation!
`;

module.exports = readmeContent;

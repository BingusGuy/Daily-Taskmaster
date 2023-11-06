# Daily-Taskmaster
Made by Austin Counterman

URL for the git rep: https://github.com/BingusGuy/Daily-Taskmaster

# What is inside?:
-Inside you will find a client folder and a server folder. The client folder is the frontend of the web app and handles the api and anything related to what the user will see and interact with. The server folder contains files that handle the schema of task items and the connection to the database with corresponding functions that obtain and handle data from it.

Client:

-App.css is the styling sheet for the web app

-App.js is the model for the web apps's front end and helps display information and modifying the task list, like adding, deleting, and editing tasks.

-EditForm.js is the model for the editing form

-weatherAPI.js and weatherDisplay.js handles the connection to the openWeatherAPI and helps display the data retrieved from it.

Server:

-Todo.js is the schema for task items

-index.js handles the connection to the database and provides functions that interact with the database.

# What tech stack was used?:
The MERN tech stack was used, meaning that MongoDB, express.js, React, and Node.js were used to make the web app.

# How to run the code:
1. Assuming you have already downloaded all the code and have Npde.js and npm installed, open a terminal/command prompt and navigate to the "client" directory and type "npm install". Once that is done, navigate to the "sever" directory and type "npm install" as well. This should install the dependencies for both the client and server sides of the web app.

2. Next, you want to start the server. To do this, open a terminal/command prompt and navigate to the "server" directory. From there, type "npm start" and you should see a message saying "Server is running on port 5000" and "Connected to MongoDB database".

3. Now, open a new terminal/command prompt and navigate to the "client" directory. Type "npm start" and this should launch the app.

4. Once all that is done, the web app should be up and running. Feel free to play around with the web app.

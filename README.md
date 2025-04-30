# Chivent
Welcome to Chivent! The architecture in Chivent is built using React, Flask and MySQL. The React frontend is deployed on AWS S3 and the Flask-based backend on an EC2 instance. The backend talks to the MySQL database to store and retrieve event information fetched from the Ticketmaster API. The frontend and backend talk to each other via HTTP API calls.

The frontend is built with Vite and React Router for dynamic page rendering and client-side routing. It mainly consists of 3 modules: Home Eventpage and Cart, we can think of the as our 3 main pages. And 2 components: NavBar and EventCard Which are used different times between our pages. The application is deployed by having the frontend developed with Vite and publishing the resulting static files (dist/) to an S3 bucket that is configured for static website hosting.

Inside the frontend, components such as the cart utilize state management using useState and hooks. As the site loads, event data from the backend is fetched via a RESTful API endpoint (/events/all), which fetches data from a MySQL database. This data is then stored in events state on the frontend.

The Backend is created using Flask and Gunicorn and as mentioned before runs on an EC2 instance. It consists of routes such as /events/all that returns event data in JSON. The backend has the database connected on MySQL, which runs on the same EC2 instance. The backend also contains functionality to fetch event database via Ticketmaster and is capable of dealing with duplicates. 
 
The architecture allows easy workflow, React deals with the User Interface, Flask deals with logic and database communication, and MySQL deals with storing events and in the future things like a user information. 
     
![image](https://github.com/user-attachments/assets/2c640047-b616-4413-a5fe-00cad04b9d1f)

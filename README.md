## Crunch FullStack Assignment

### Design choices and technologies used

For this assignment I chose the following stack:

- Turborepo - To execute both projects at the same time with less friction.
- MongoDB -  NoSQL Database that I usually use and have more familiarity.
- Docker - To make the database container
- Nest.js - To create the microsservice, mainly because of the patterns we can use, and also because it has a lot of packaged features.
- Hydrogen with TypeScript - Mainly because it's better to have type safety and also because the back-end is also typed.
- Rest API - I decided to create the API using Restful, I thought of using GraphQL for parity with Hydrogen, but ended up not using to avoid spending more time than necessary.

For the Back-end I followed the basic Nest.js structure, creating the necessary modules, controller, and service, and using Dependency Injection when needed. I also used their testing library and passport and jwt library for the Auth flow.

For the Front-end I tried to minimize big changes, so I usually ended up following the routes patterns and component structure. 

### Running the projects 

To run the project we need the following installed:
- Node.js 18+
- Docker 

First, we should execute our Database Container, so navigate to `apps/back-end` and run in your terminal:
```docker-compose up```

Now that the Database is running, open another terminal at the root of the project and run:
```npm run dev```

It will start both the Front-end and Back-end.

Now you can access the project via the following URL: `http://localhost:3000`

We don't need to configure ENV's, for simplicity sake and a lack of time, I choose to not include any, but I know very well that this is not recommended.

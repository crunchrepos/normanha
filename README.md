# Crunch FullStack Assignment

## Demo Videos
https://github.com/lnormanha/crunch-fullstack-assignment/assets/31674320/d23f1a48-fac2-451d-b9c3-be26f128a0e4

## Design choices and Technologies used

To develop the assignment, I chose the following:

### Technologies:

#### Front-end
- **Hydrogen** - Shopify Hydrogen store using TypeScript and leveraging SSR (Server Side Rendering) as it's the main pattern used.

#### Back-end
- **Nest.js** - Framework using the DDD (Domain Driven Design) approach. Easy to separate responsibilites and use of Dependecy Injection as a default pattern.
- **Rest APi** - Created the API required using REST patterns.
- **MongoDB and Mongoose** - Great for fast iteration and development, and It's what I have more experience using.
- **Docker Compose** - For creating our Database container
- **Nest Testing and Jest** - For creating Unit Tests
- **Authentication**: JWT for session management.

#### General
- **Turborepo** - To execute both projects at the same time with less friction and with possibility to share some packages.

### Design Patterns

#### Front-end
For the Front-end, I followed the default pattern used by Hydrogen, leveraging Server Side Rendering for interactivity, and avoinding client-side actions and client-side data storage. I followed their routes structure to avoid deviation from their boilerplate.

#### Back-end
For the Back-end, I used the Domain Drive Design approach and tried to separate concerns whenever possible. I also separated each context (User, Products, Auth) in modules. I did some iterations and at the end I think the project is well organized and easy to find what you need.

## Running the Project 

To run the project we need the following installed:
- **Node.js 18+**
- **Docker Compose (2.27.0-1)**

### First steps

Go the root of the project and execute the following commmand in your terminal:
```npm install```
This will install all dependencies for the ```back-end``` and ```front-end``` apps in our monorepo.

### Setting up the Database
Now, go to the following folder:
```apps/back-end```
Inside the folder, execute the following command in your terminal:
```docker-compose up --build -d mongod```
It will initialize our database instance in the background.

### Executing the project
Now, go back to the root folder of the project in your terminal and execute the following command:
```npm run dev```
This will initialize both projects at the same time.
Now you can test both projects in the following routes:
- **Front-end**: ```http://locahost:3000P```
- **Back-end**: ```http://locaholst:3123```



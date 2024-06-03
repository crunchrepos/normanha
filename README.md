# Crunch FullStack Assignment

## Demo Videos
https://github.com/lnormanha/crunch-fullstack-assignment/assets/31674320/d23f1a48-fac2-451d-b9c3-be26f128a0e4

## Design choices and Technologies used

To develop the assignment, I chose the following:

### Technologies:

#### Front-end
- **Hydrogen** - Shopify Hydrogen store using TypeScript and leveraging SSR (Server Side Rendering) as it's the main pattern used.

#### Back-end
- **Nest.js** - Framework using the DDD (Domain Driven Design) approach. Easy to separate responsabilities and use of Dependecy Injection as a default pattern.
- **Rest APi** - Created the API required using REST patterns.
- **MongoDB and Mongoose** - Great for fast iteration and development, and It's what I have more experience using.
- **Docker Compose** - For creating our Database container
- **Nest Testing and Jest** - For creating Unit Tests
- **Authentication**: JWT for session management.

#### General
- **Turborepo** - To execute both projects at the same time with less friction and with possibility to share some packages.

### Design Patterns

#### Front-end
For the Front-end, I followed the default pattern used by Hydrogen, leveraging Server Side Rendering for interactivity, and avoiding client-side actions and client-side data storage. I followed their routes structure to avoid deviation from their main project organization.

#### Back-end
For the Back-end, I used the Domain Drive Design approach and tried to separate concerns whenever possible. I also separated each context (User, Products, Auth) in modules. I did some iterations and at the end I think the project is well organized and accessible to navigate.

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

```docker-compose up --build -d mongo```

It will initialize our database instance in the background.

### Executing the project
Now, go back to the root folder of the project in your terminal and execute the following command:

```npm run dev```

This will initialize both projects at the same time.

Now you can test both projects in the following routes:
- **Front-end**: ```http://locahost:3000P```
- **Back-end**: ```http://locaholst:3123```

## Project Breakdown and Modifications

In this section I will explain what was created, and some decision made during the development of this assignment.

### Back-end

#### Authentication
This was done first, so we could have favorites for multiple users.
I choose JWT for simplicity sake, and because it's still a great tool to create User authentication and session management

Module: ```src/modules/authentication```

#### Users
Done in conjunction with the Authentication flow, as we needed to create the Users in our Database.
It's a simple module just for inserting and validating Users in our Database.

Module: ```src/modules/users```

#### Favorites
For our main module in this assignment, I choose to make it more "consistent" with what we were dealing with the Shpoify Hydrogen Front-end, so at the end our main
module is called Products, and our database collection is called favorite-products. I think this makes more sense so we can know we are dealing with products and that's the main responsibility for this module.

Module: ```src/modules/products```

Additional points: We call the Favorites as FavoriteProducts in our back-end, and we have a Model and Schema for it.

### Front-end

For the Front-end I will explain the files that I created and modifications that I have done.

#### SignIn and SignUp

I didn't use the existing screen/route, as the screen depends on some Shopify envs and keys to enable it. Insted I created 2 new screens:

```app/routes/sign-in.tsx```

```app/routes/sign-up.tsx```

Each contains a Form with validation, and calling a server-side action that calls our authentication routes.

#### Product Detail

The Screen that we access to Add or Remove a product from the favorites. My main modification there was adding the following:

- A new Favorite Button, that can add or remove a favorite depending if we have that product saved on our database.
- Added in the main loader method, our API to try and fetch the specific product in our back-end, to check if we have it added in the favorites.
- Added a new action that is assigned to the Favorite Button to call the API to add or remove the product from the favorites

File: ```app/routes/products.$handle```

#### Favorites

The main screen of the assignment, responsible to show all the products that we have in our favorites.
I created a new screen called ```app/routes/favorites._index.tsx```

The main flow of this is on our loader method, we call our API to fetch all the user favorite products. With each ID of these products, I create a array of ids and use it in a GraphQL with the ids as variables. This enabled to fetch all of our products in a single query.
After this I populate the products in the screen and we show then to the user.

#### Header Component

I added the User email when we login, and I only show the Favorites button with the user logged-in. 

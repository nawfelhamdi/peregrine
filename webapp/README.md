# Peregrine Web Application

## Content

**[1. Technologies](#heading--1)**

**[2. Application Folder Structure Overview](#heading--2)**

**[3. Installation Guide](#heading--3)**

**[4. Git Banching Strategie](#heading--4)**

**[5. Git Commit Messages](#heading--5)**

## 1. Technologies <a name="heading--1"/>

> Main technologies used in Peregrine application

### a.Backend :

| Technology          | Version |
| ------------------- | :-----: |
| express             | 4.16.1  |
| typescript          |  4.7.3  |
| mssql               |  6.4.1  |
| typeorm             |  0.3.6  |
| @azure/storage-blob | 12.10.0 |

### b. Frontend :

| Technology       | Version |
| ---------------- | :-----: |
| react            | 18.1.0  |
| react-router-dom |  6.3.0  |
| redux            |  4.2.0  |
| tailwindcss      | 3.0.24  |
| yup              | 0.32.11 |
| formik           |  2.2.9  |

## 2. Application Folder Structure Overview <a name="heading--2"/>

The application architecture is developed considering the future scope and scalability:

### a. Backend:

```
webapp/src
├── config// Holds the configuration of typeorm
├── controllers // Functions to get the requested data from the entities
├── entities // Decorator class represent the database tables
├── middleware // Directory contains custom functions that can be run before requests
├── routes // Directory contains the resources url (path/pattern) associate with HTTP verb (GET, POST, PUT, DELETE)
├── utils// Directory contains helper methods, types and validation
└── index.ts // Server entry point file
```

### b. Frontend:

```
src
├── assets // Global application assets (logo, images...)
├── shareds // Reusable components used across the app
├── pages // Public screens
│   ├── page_exemple
│   │   ├── assets // Images used across the page_exemple
│   │   ├── components // Components used across the page_exemple
│   │   ├── actions.js // Redux actions for the page_exemple features
│   │   ├── index.js
│   │   ├── reducer.js // Redux reducer for the page_exemple features
│   │   └── types.js  // Constant types used by the actions and reducer for the page_exemple features
│   │
│   └── ...
│
├── redux
│    ├── RootReducer.js // Route Reducers for the entire application
│    └── Store.js
│
├── utils // helper methods and validation ...
│    :
│    └──...
│
├── App.js
└── index.js
```

## 3. Installation Guide <a name="heading--3"/>

### a. Prerequisites:

```
Download & install the Node.js v16.15.0
Download & install git
git clone https://PeregrineCA@dev.azure.com/PeregrineCA/Peregrine/_git/Peregrine
cd webapp
npm install
npm run server

```

### b. Installation:

```
git clone https://PeregrineCA@dev.azure.com/PeregrineCA/Peregrine/_git/Peregrine
cd webapp
npm install
cd webapp/client
npm install
```

> Add credentials to .env file:

> .env (file sample)

```
AZURE_STORAGE_CONNECTION_STRING= add_your_azure_storage_connecting_string
PORT=8081
DATABASE_HOST=add_database_host_url
DATABASE=add_database_name
DATABASE_USERNAME=add_database_username
DATABASE_PASSWORD=add_database_password
NODE_ENV=development
```

> Navigate to client folder and Add api url .env file:

> .env (file sample in client folder)

```
REACT_APP_API_URL=http://localhost:8081/api/v1
```

### c. Run Server locally:

```
cd webapp
npm run server
```

> expected output:

```
Server is runinng at: http://localhost:8081
Data Source has been connected
```

### d. Run client side locally:

```
cd webapp/client
npm start
```

## 4. Git Banching Strategie <a name="heading--4"/>

![Git branching diagram](https://user-images.githubusercontent.com/47576444/138562880-8dbc8c82-f44b-4eac-abb1-6fbbc97ff688.PNG)

## 5. Git Commit Messages <a name="heading--5"/>

- `build`: (new feature or script added)
- `fix`: (bug fix)
- `docs`: (changes to the documentation)
- `refactor`: (refactoring code, eg. renaming a variable)

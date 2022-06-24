# Thales sante

## Content

**[1. Technologies](#heading--1)**

**[2. Installation](#heading--2)**

**[3. Folder Structure](#heading--3)**

## 1. Technologies <a name="heading--1"/>

| Technologie      | Version |
| ---------------- | :-----: |
| react            | 18.1.0  |
| react-router-dom |  6.2.1  |
| formik           |  2.2.9  |
| yup              | 0.32.11 |
| redux            |  4.1.2  |
| tailwindcss      | 3.0.24  |

## 2. Installation <a name="heading--2"/>

```
git clone https://github.com/hamdinawfel/thales.git
cd client
npm install
npm start

```

## 3. Folder Structure <a name="heading--3"/>

> The frontend side application architecture is developed considering the future scope and scalability.

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

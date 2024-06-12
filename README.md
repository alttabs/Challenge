# Code Challenge SendSpark

## Front-end

This is the front-end especifications of the project. It was build with ReacJS

### Structure
```bash
├── src
│   ├── components
│   │   ├── LoginForm.js
│   │   ├── HomePage.js
│   │   ├── SignupForm.js
│   │   └── PasswordInput.js
│   ├── App.js
│   ├── styles
│   │   ├── LoginForm.css
│   │   ├── SignupForm.css
│   │   └── homePage.css
│   └── index.js
└── ...
```

### Componentes
- LoginForm.js: Handles user login functionality.
- HomePage.js: Displays the home page for authenticated users.
- SignupForm.js: Handles user signup functionality.
- PasswordInput.js: A custom component for password input with validation and visibility toggle.

### Style
- LoginForm.css: Styles for the login form.
- SignupForm.css: Styles for the signup form.
- homePage.css: Styles for the home page.

### Libs
- Formik: Form library for managing form state and validation.
- Yup: Validation library for defining validation schemas.
- React Router DOM: Library for routing between different pages.
- Bootstrap

### Running the Project
Install dependencies:
```bash 
npm install
```
Start the local application:
```bash 
npm start
```

## Back-End

The Back-end was built with NodeJS

### Structure
```bash
├── src
│   ├── models
│   │   └── User.js
│   ├── routes
│   │   └── users.js
│   ├── config
│   │   └── database.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── app.js
│   └── ...
└── ...

```

### Models
- User.js: Specify the user schemma, setting up the typos and required parameters.

### Routes
- users.js: Defines the API endpoints for user-related operations, including registration, login, authentication, and data management.

### Libs
- Node.js: JavaScript runtime environment.
- Express: Web framework for building REST APIs.
- Mongoose: Object-Document Mapper (ODM) for MongoDB.
- Bcrypt: Library for password hashing.
- JSON Web Token (JWT): Used for authentication and authorization.
- Cors: Middleware for enabling Cross-Origin Resource Sharing (CORS)

### Database
Install MongoDB: Download and install MongoDB on your system.
Create a database: Create a database named sendspark in MongoDB.
Update the database URI: update the uri variable with the correct connection string for your MongoDB instance.

### Running the Back-end
Install dependencies:
```bash 
npm install
```
Start the local application:
```bash 
npm start
``` 
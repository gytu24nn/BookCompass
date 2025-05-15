# 📚 BookCompass

**BookCompass** is a web application that helps book lovers to discover new literature across Europe. Users can organize books into personal lists and get reading recommendations in different languages. This applikation is continuously being updated with new features.

## Project features: 
- **React & TSX**
- **HTML5**
- **ASP.NET Core 9**
- **State management with React hooks**
- **Localstorage for saving user data**
- **Custom CSS styling & animations**

## Project structure
This repository contains both frontend and backend in the same repo:
BookCompass/
│
├── frontend/ # React + Vite + TypeScript app
└── backend/ # ASP.NET Core Web API

## Prerequisites:
- Node.js (https://nodejs.org/en)
- Visual studio code or any modern code editor
- A morden web browser (e.g Chrome, firefox)

## Getting frontend and backend started:
1. Start with clone the repository: 
    ```bash
    git clone https://github.com/gytu24nn/BookCompass.git
    ```
2. Navigate to the frontend folder and install dependencies:

    first: 
    ```bash
    cd frontend
    ```

    then: 
    ```bash
    npm install
    ```

3. After that navigate to the backend folder and build the project:

    first command (if your are in frontend folder):
    ```bash
    cd ..
    ```

    second command:
    ```bash
    cd backend
    ```

    third command: 
    ```bash
    dotnet build
    ```

4. Start backend in the backend folder: 
    ```bash
    dotnet watch --urls=http://localhost:5175/
    ```

5. Start frontend in the frontend folder: 
    #### For development: 
    ```bash
    npm run dev
    ```

    #### To build for productions:
    ```bash
    npm run build
    ```

    #### To preview the production build_ 
    ```bash 
    npm run preview
    ```

## published on DigitalOcean:
The application is deployed and running on DigitalOcean, using the live branch from GitHub.
You can visit the live version here: 
🔗 [BookCompass](https://bookcompass-vo269.ondigitalocean.app/) 

## Frontend: 
The React frontend uses the following GET endpoints to display data:

- `GET /api/books/categories` to show all categories and their books.
- `GET /api/books/{id}` to show detailed information about a specific book.
- `GET /api/userLibrary/getMyLibrary/{username}` to show the user's personal library.
- - `POST /api/userLibrary/addBookToMyLibrary` to add books to their library
- `POST /api/auth/register ` to register a new user
- `POST /api/auth/login` to sign in a user


## Backend:
This API is built with ASP.NET and is divided intro three main controllers:
- AuthController - Handles user registration and login 
- BooksController - Provides book and category data
- UserLibraryController - Manages the user´s personal library

### 🔐 AuthController:
#### this endpoint registers a new user:

**POST** `/api/auth/register` 

**Headers:** 
- Authorization: Bearer 1234BookCompassToken

**Body (JSON):**
```json 
{
    "username": "exampleUser",
    "email": "example@example.com",
    "password": "secret1234",
    "confirmPassword": "secret1234"
}
```
**Responses**:
- 200 OK - User registred successfully
- 400 Bad Request - Missing fields or password mismatch 
- 401 Unauthorized - Missing or incorrect token 
- 409 Conflict - Username or email already exists

---
#### This endpoint logs in an existing user: 

**POST** `/api/auth/login`

**Headers:**
- Authorization: Bearer 1234BookCompassToken

**Body (JSON):**
```json
{
    "userName": "exampleUser",
    "password": "secret1234"
}
```
**Response:**
200 OK - Login successful
401 - Unauthorized - invalid credentials or token

---
### 📘 BooksController
#### This endpoint returns a list of all book categories, each with its related books: 

**GET** `/api/books/categories`

**Response:**
```json
[
  {
    "categoryId": 1,
    "categoryName": "Fantasy",
    "books": [
      {
        "id": 10,
        "bookName": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "imageUrl": "..."
      }
    ]
  }
]
```

---
#### This endpoint returns detailed information about a specific book by its ID: 

**Example:** **GET** `/api/books/1`

**Response:**
```bash 
{
  "id": 1,
  "bookName": "The Hobbit",
  "bookDescription": "...",
  "author": "J.R.R. Tolkien",
  "imageUrl": "...",
  "seriesName": "The Lord of the Rings",
  "seriesPart": 1,
  "category": "Fantasy",
  "languages": ["English", "Swedish"]
}
```

### 📚 UserLibraryController
#### This endpoint adds a book to a user´s library or moves it between lists: 

**POST** `/api/userLibrary/addBookToMyLibrary`

**Headers:**
- Authorization: Bearer 1234BookCompassToken

- X-User-Name: exampleUser

**Body (JSON):**
```json
{
  "userName": "exampleUser",
  "bookId": 5,
  "listType": "Want to Read"
}
```

**Responses:**
- 200 OK – Book added or moved
- 401 Unauthorized – Missing/invalid token or username
- 409 Conflict – Book already in the list

--- 
#### This endpoint gets all books from a user´s library, grouped by list type: 

**Example:** **GET** `/api/userlibrary/getMyLibrary/exampleUser`

**Response:**
```json
[
  {
    "listType": "Reading",
    "books": [
      {
        "id": 5,
        "bookName": "1984",
        "author": "George Orwell",
        "imageUrl": "..."
      }
    ]
  }
]
```

## Version management: 
In this project, I use Git branches with a clear structure to separate different development task. Each assignment has its own branch, and when the work is complete the branch is merged into the live-DigitalOcean branch. Witch is used only for deployment. 

- Setup-inlämning-1: The first branch for the first assignment, in this project. In this branch the basic structure was created.

- Deploy-inlämning-2: The second branch for the second assignment, for this project. I added login and account creation functionality.

- Backend-inlämning-3: the third branch for the third assignment, for this project. In this branch i have created backend and connected the endpoints I created in the backend with frontend.

- Live-DigitalOcean: This branch i connected to the public version of the project deployed on DigitalOcean. It is only used for deployment, and it contains the same content as the branch Deploy-inlämning-2.

### This branch structure makes it easy because:
- Separates different assignments.
- Keeps production and development separated. 

## Build system:
This project uses **Vite** as the build system. Vite is configured to transpile and bundle the code for production when running. 

I decided to use **Vite** as the build system for this project because it makes it easy to get started with React. Additionally, when starting the project, I can choose whether to use JSX or TSX. For this project, I chose to use TSX because I wanted to practice with it, and I find it a bit easier than JSX because it allows you to see the type of each variable.

- To use the build system you can use: 
    ```bash
    npm run build
    ```
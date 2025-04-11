# 📚 BookCompass

**BookCompass** is a web application that helps book lovers to discover new literature across Europe. Users can organize books into personal lists and get reading recommendations in different languages. This applikation is continuously being updated with new features.

## Project features: 
- **React & TSX**
- **HTML5**
- **State management with React hooks**
- **Localstorage for saving user data**
- **Custom CSS styling & animations**


## Prerequisites
- Node.js (https://nodejs.org/en)
- Visual studio code or any modern code editor
- A morden web browser (e.g Chrome, firefox)

## Getting Frontend started: 
1. Start with clone the repository: 
    ```bash
    git clone https://github.com/gytu24nn/BookCompass.git
    ```
2. Go to the right folder and do: 
    ```bash
    npm install
    ```
3. After that you can start the application here are som alternativs:
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

## published on DigitalOcean 
The application is deployed and running on DigitalOcean, using the live branch from GitHub.
You can visit the live version here: 
🔗 [BookCompass](https://bookcompass-vo269.ondigitalocean.app/) 

## Version management: 
In this project, I use Git branches with a clear structure to separate different development task. Each assignment has its own branch, and when the work is complete the branch is merged into the live-DigitalOcean branch. Witch is used only for deployment. 

- Setup-inlämning-1: The first branch for the first assignment in this project. In this branch the basic structure was created.

- Deploy-inlämning-2: The second branch for the second assignment. for this project. I added login and account creation functionality.

- Live-DigitalOcean: This branch i connected to the public version of the project deployed on DigitalOcean. It is only used for deployment, and it contains the same content as the default branch as it was completed for that assignment.

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
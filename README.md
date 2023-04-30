# CourseCat Frontend Documentation

## Overview

CourseCat (https://course.cat) is a web application developed using Next.js, a popular React framework for server-rendered applications. This frontend documentation provides a high-level overview of the application's structure, components, and key features, as well as instructions for setting up and running the project locally.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Components](#components)
4. [Styles](#styles)
5. [Setting up the Project](#setting-up-the-project)
6. [Running the Application](#running-the-application)

### Prerequisites

To work with CourseCat's frontend, ensure you have the following installed on your machine:

1. Node.js (v14.x or later)
2. npm (v6.x or later)

### Project Structure

The project follows a standard Next.js file structure with some custom additions. Here is an overview of the key folders and files:

```
coursecat/
├── components/
│   ├── CourseCard/
│   ├── Footer/
│   ├── Header/
│   ├── SearchBar/
│   └── index.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   └── course/
│       └── [id].js
├── public/
│   ├── images/
│   └── favicon.ico
├── styles/
│   ├── globals.css
│   ├── theme.js
│   └── components/
│       ├── CourseCard.module.css
│       ├── Footer.module.css
│       ├── Header.module.css
│       └── SearchBar.module.css
├── package.json
└── next.config.js
```

### Components

The application is built using a modular, component-based architecture. Key components include:

1. **CourseCard**: A reusable card component that displays course information.
2. **Footer**: The website's footer, which contains copyright information and links to external resources.
3. **Header**: The website's header, which includes the application logo and navigation links.
4. **SearchBar**: A search bar component that allows users to search for courses.

### Styles

CourseCat's frontend utilizes CSS modules to scope styles to individual components, ensuring that styles do not leak into other parts of the application. The `styles/` folder contains global styles, theme configurations, and component-specific styles.

1. `globals.css`: Contains global styles applied to the entire application.
2. `theme.js`: A JavaScript module that exports an object containing theme-specific configurations (e.g., colors, fonts).
3. `components/*.module.css`: CSS modules for individual components.

### Setting up the Project

To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/coursecat.git`
2. Change to the project directory: `cd coursecat`
3. Install dependencies: `npm install`

### Running the Application

To run the application locally, execute the following command in the project directory:

```
npm run dev
```

This will start the development server on `http://localhost:3000`. The application will automatically reload if you make any changes to the source code.

## Conclusion

This documentation provides an overview of CourseCat's frontend, including the project structure, components, and styles. By following the instructions outlined above, you should be able to set up and run the application locally.

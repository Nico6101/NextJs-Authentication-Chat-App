This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# NextJs Typescript Authentication and Chat Application

Welcome to the documentation for our Next.js project! This guide will provide you with all the necessary information to get started, understand the project structure, and contribute to the project.

## Table of Contents

    1. Project Overview
    2. Installation
    3. Usage
    4. Project Structure
    5. Configuration
    6. Testing

## Project Overview
Our project is a Next.js application written in TypeScript. It serves as a demo for building modern web applications with authentication and chat capablities using socket io. The project includes:

    - React components written in TypeScript
    - Routing with Next.js's built-in routing system
    - API routes for server-side logic
    - CSS styling with CSS modules
    - Jest and React Testing Library for testing
    - Configuration for linting with ESLint
    - Webpack configuration for customizations

## Installation
To install and run the project locally, follow these steps:

    1. Clone the Repository:
        git clone https://github.com/Nico6101/NextJs-Authentication-Chat-App.git

    2. Navigate to the project directory:
        cd NextJs-Authentication-Chat-App

    3. Install dependencies:
        npm install

## Usage
    To start the development server, run:
        npm run dev

This will start the Next.js development server on http://localhost:3000.

## Project Structure
The project follows a standard Next.js project structure:

    ├── pages/              # Next.js pages
    ├── public/             # Static assets
    ├── components/         # React components
    ├── styles/             # CSS styles
    ├── api/                # Next.js API routes
    ├── __test__/           # Test files
    ├── .eslintrc.json      # ESLint configuration
    ├── tsconfig.json       # TypeScript configuration
    ├── jest.config.ts      # Jest configuration
    └── next.config.mjs     # Next.js configuration


## API Routes

The project includes several API routes for handling authentication and client-server communication for chat capability.

### POST /api/authenticate: To authenticate existing users.
    Parameters

        email (string, required): The email of the user.
        password (string, required): The password of the user.

    Request Body
        {
            "email": "john@example.com",
            "password": "Pass$123"
        }

### POST /api/register: To register new users.
    Parameters
        username (string, required): The name of the user.
        email (string, required): The email of the user.
        password (string, required): The password of the user.
        confirm password (string, required): same as password for confirmation.

    Request Body
        {
            "username": "john",
            "email": "john@example.com",
            "password": "Pass$123"
        }
    
### /api/chat: socket.io server.

## Configuration

The project uses ESLint for linting. ESLint and Nextjs configurations are provided in .eslintrc.json and next.config.mjs files, respectively. You can customize these configurations according to your preferences.

## Testing
The project includes unit and integration tests written with Jest and React Testing Library. Tests are located in the __test__/ directory and can be run with the following command:

    npm run test

## Contributing
We welcome contributions from the community! If you'd like to contribute to the project, please follow these steps:

    1. Fork the repository.
    2. Create a new branch for your feature or bug fix.
    3. Make your changes and commit them.
    4. Push your changes to your fork.
    5. Submit a pull request with a detailed description of your changes.
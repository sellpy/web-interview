# Sellpy Sandbox

Welcome to the Sellpy Sandbox environment for fullstack development!

Start by forking the repository.

## Prerequisites

NodeJS - https://nodejs.org/en/download/

## Getting started

### To start the backend:

 - Navigate to the backend folder
 - Run 'npm install'
 - Run 'npm start'

### To start the frontend:

 - Navigate to the frontend folder
 - Run 'npm install'
 - Run 'npm start'

 A browsertab will automatically open and load the app.

## Assignment

Your assignment is to improve this todo list application. At the moment the application is simple and can only create and remove todos.
As is, nothing is persisted in the server. As a result all state is cleared when refreshing the page!

Below are some suggested improvements:

- Persist todos on the server. Persisting in a database is not required. (Simple js structures on the server is fine). If a database is desired an in memory database is provided. (lokijs)
- Make it possible to indicate that a todo is completed.
- Indicate that a todolist is completed if all todo items within are completed.
- Don't require users to press save when an item is added or deleted from the todolist. (Autosave functionality)
- Add a date for completion to todo items. Indicate how much time is remaining or overdue.

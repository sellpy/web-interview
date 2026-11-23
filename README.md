# Sellpy web interview

Welcome to Sellpy's web interview repo!

## Assignment
Your assignment is to improve this todo list application. At the moment the application is simple and can only create and remove todos.
As is, nothing is persisted in the server. As a result all state is cleared when refreshing the page!
Below follows one main task and 4 additional tasks. Your assignment is to complete the main task together with at least 2 out of 4 of the additional tasks.
If you feel constrained by time (which is totally fine!), **prioritize quality over quantity**.

### Main Task
Persist the todo lists on the server using the included `@seald-io/nedb` database. See the NeDB example in "To start the backend" below.

### Additional tasks
- Don't require users to press save when an item is added/edited in the todo list. (Autosave functionality)
- Make it possible to indicate that a todo is completed.
- Indicate that a todo list is completed if all todo items within are completed.
- Add a date for completion to todo items. Indicate how much time is remaining or overdue.

## Submission
Before submitting, read through all changes one last time - **code quality matters**!

If you have developed without ESLint set up, run `npm run lint` in both `/backend` and `/frontend` and fix any errors/warnings.

Send a link to your forked repository to your contact at Sellpy. Don't forget to mention which tasks you completed.

Don't forget to bring your computer to the interview, as you'll need it to make code changes during the session!

## Prerequisites

Node.js 26 is required. The project's `.nvmrc` selects Node 26, with npm 11.20.0 bundled. If you don't already have it installed, check out [nvm](https://github.com/nvm-sh/nvm).

## Getting started
Fork the repository (see top-right button on GitHub) and clone the fork to your computer.
### To start the backend:

 - Navigate to the backend folder
 - Run `npm ci`
 - Run `npm start`

The backend uses [`@seald-io/nedb`](https://github.com/seald/nedb) for document storage with MongoDB-style queries. No separate database installation is needed. In `backend/src/db.js`, the `UserMessages` collection is seeded with `{ key: 'greeting', value: 'Hello World!' }` on the first startup, and `GET /` reads the greeting from it. Data is saved in `backend/db`, which is gitignored. Use this as an example for the todo persistence assignment.


### To start the frontend:

 - Navigate to the frontend folder
 - Run `npm ci`
 - Run `npm start`

 A browser tab will automatically open at http://localhost:3000 and load the app using Vite.

 Run `npm run build` in `/frontend` to create a production build in `dist`, and `npm run preview` to preview it locally.

### Development set-up
If you don't have a favorite editor we highly recommend [VSCode](https://code.visualstudio.com). We've also had some ESLint rules set up which will help you catch bugs etc. If you're using VSCode, install the regular [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and you should be good to go!

You can open the root folder in one workspace, or `/frontend` and `/backend` in seperate workspaces - both should work fine.

Check `.nvmrc` to see what node version is required to run the project. Just run `nvm use` if you have `nvm` installed. Later versions of node might work fine as well, but probably not earlier versions.

For those of you using Prettier (not a requirement), there's an .prettierrc file to ensure no unnecessary changes to the existing code. It should be picked up automatically by Prettier.

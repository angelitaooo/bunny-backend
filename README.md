# Description

This project is a REST API, that is build with Express and [lowdb](https://github.com/typicode/lowdb).
I chose lowDb because I have never used a database before and it seemed easy to use. LowDB is a small local JSON database powered by Lodash, all the data is saved in db.json file.

# Project Routes

| Verbs  | User Routes                       |
| ------ | --------------------------------- |
| GET    | `/users/` (all users)             |
| GET    | `/users/:userId` (get user by id) |
| POST   | `/users/` (create user)           |
| DELETE | `/users/:userId` (delete user)    |
| PUT    | `/users/:userId` ( update user)   |

| Verbs | Tasks Routes                                             |
| ----- | -------------------------------------------------------- |
| GET   | `/users/:userId/tasks` (get all task from an user)       |
| POST  | `/users/:userId/tasks` (create task for a user)          |
| PUT   | `/users/:userId/tasks/:taskId` (update task from a user) |

# Dependencies

- [Express](https://expressjs.com/): I chose this framework because it provides me the basic features to create an APi.
- [lowDb](https://github.com/typicode/lowdb): It is fast enough and safe to be used as an embedded database.
- [lodash-id](https://github.com/typicode/lodash-id): Provides a set of helpers for creating and manipulating id-based resources.
- [cors](https://www.npmjs.com/package/cors): Is a middleware that can be used to be able to send and recieve requests to other
  domains.
- [body-parser](https://www.npmjs.com/package/body-parser): To read and send JSON

# Run project locally

Install the project
`npm install`

Run server
`npm run dev`

# Deploy

I used [Heroku](https://devcenter.heroku.com/) to deploy the API.
You can find the production API in this address [https://arcane-waters-37558.herokuapp.com/users/](https://arcane-waters-37558.herokuapp.com/users/).

You can use the API from any client thanks to the CORS middleware.

## Steps I followed to deploy

1. Create an account in Heroku
2. Install Heroku CLI `brew tap heroku/brew && brew install heroku`
3. Use a `Procfile`, a text file in the root directory of the application, to explicitly declare what command should be executed to start the app.
4. Create an app on Heroku `heroku create`
5. Deploy the code `git push heroku master`

loom
TODO EN POSTMAN
Ver todos los usuarios, creando un usuario, actualizandlo y creando una tarea para ese usuario
y mostrar un error en postman

# Todo App front-end

## Description

The front-end of a todo list application. A centralized server holds the user's data, the user must login to an account.
It was developed using typescript for strong types and connects to a server running before starting.
The user creates an account and logs in, they will accept a secure jwt token that is stored in secure local storage and used to fetch their todos each time they request them and update them to avoid unauthorized requests. The user has ability to mark tasks as finished or not finished.

## Notes

Change BASE_URL variable in files: src/Home.tsx , src/Login.tsx , src/Register.tsx to the url to your local server before running.
Mine was ```192.168.1.13``` yours will be different. You can find your computers ip in the internet properties under ipv4 in the computer running the server code.

## Technologies

- React Native
- Typescript
- REST API's
- Expo Go
- JSON Web Tokens

## Dependencies

- expo
- react
- react native
- typescript
- secure-storage

## Steps to run (Assumes you are running the [Server](https://github.com/DeathPancake1/todo-app-back-end))

- install Node.js on your device and make sure npm is installed
- run the command ``` npm install ``` to install all dependencies
- Download Expo Go app on your mobile phone
- Start the app and connect both your device and your computer on the same network
- run command ``` npm run start ``` in the terminal
- Scan the qr code in the app and you are connected to the app

## Steps to launch the app on a device

### For ios

- Connect your iOS device to your computer.
- Open your React Native project in Xcode.
- Select your connected device as the build target.
- Build and run the app on your device using Xcode.

### For Android

- Enable USB debugging on your Android device by going to Settings > Developer options.
- Connect your Android device to your computer.
- Open a terminal and navigate to your React Native project directory.
- Run the following command to install and launch the app on your device ``` npx react-native run-android ```

## User Story

- The user runs the app and presses the signup button.
- The user creates an account, provided the information is correctly formated an account is created, if not an alert appears. The registeration calls the /register API of the server.![Register Page](https://i.imgur.com/CuFsJZR.jpeg)
- The user is directed to the login page where they can login with their information provided it is correct. The login calls the /login API from the server. ![Login Page](https://i.imgur.com/X9BKdZb.jpeg)
- They are logged in with the home screen showing all the todos they already created, they are gathered from the /todos API.![Home page](https://i.imgur.com/bpX7MR9.jpeg)
- They can either mark todos finished or unfinished (uses /todo/:id API), or, create a new todo (using the /addTodo API).![Home Page](https://i.imgur.com/gvTn3Kn.jpeg)

# Development of a Secured Cloud-Based Drive Application Exploiting Web technologies  
## Developed and Managed by Abdullah Sofiyullah Folorunsho (HR20190103865)
### A graduating student of Federal Polytechnic Ede, located in Osun state, Nigeria majoring in Computer engineering (Software Focused), HND.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


<div align="center">

<img alt="myspace-logo" src="public/images/hbs-logo.png" width="180px" height="180px" />

# HBS Drive🚀

 <h3>A Cloud Based Drive Web app.</h3>

[![Netlify Status](https://api.netlify.com/api/v1/badges/2c93609e-b9bb-43cf-8333-646d70b91310/deploy-status)](https://app.netlify.com/sites/evolt-myspace/deploys)

 ![chrome-capture-2022-5-23](public/images/hbs-drive.gif)

</div>


## Table of Contents

- [Getting Started](#getting-started)
- [Live link](#live-link)
- [About](#about)
- [Technologies used](#-technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Connect with me](#-connect-with-me)

## Getting Started

- Clone the repository on your local machine with the command below in your terminal, and cd into the **evolt-social** folder

```sh
git clone https://github.com/Precioussoul/HBS-DRIVE.git
cd HBS-DRIVE
```

- Install dependencies (if you are using **yarn** then do with that)

```sh
yarn install
```

- Create a `.env` file at the root level of the directory (at the level of `package.json`) and create a environment variables and use process.env to initialize them.

``` 
REACT_APP_FIREBASE_API_KEY= <YOUR API KEY>
REACT_APP_FIREBASE_AUTH_DOMAIN= <YOUR CLOUD AUTH DOMAIN>
REACT_APP_FIREBASE_PROJECT_ID=<YOUR PROJECT ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<YOUR CLOUD STORAGE BUCKET ID>
REACT_APP_FIREBASE_MESSAGE_SENDER_ID= <YOUR SENDER ID>
REACT_APP_FIREBASE_APP_ID=<YOUR GENERATED APP ID>
```

- Start the server🚀

```
yarn start
```

## Live link

https://evolt-myspace.netlify.app

## About

- Hbs drive is a cloud-based drive web app that allow users to have access to cloud storage from the comfort of their home and location.
- Users can share files with others, upload, starred, delete, and recover their files and folders. A Shareable links to share files with loved ones around the world.

## 🛠 Technologies used

- ReactJS
- Redux Toolkit
- React Router
- SASS (Scss)
- Firebase for backend

## Features

**My Drive**:

- User will able to see all his posts and post of the people he/she follow.
- Feed can be sort based on `recent` and `trending` posts.
- User/Home and Explore feed has `infinite scroll`.

**Recents**

- All the new users posts will be shown over here.

**Search**

- User can search other users and follow them if not followed.
- Implemented `debounce` for search.

**Favorites/Starred**

- User can `add`, `like/unlike` `edit`, `delete`, and `bookmark` a post.
- Each post can be viewed on single page where user can comment and can edit or delete the comment.
- Post can consist of text, image or gifs.

**Trash**

- User can `add`, `like/unlike` `edit`, `delete`, and `bookmark` a post.
- Each post can be viewed on single page where user can comment and can edit or delete the comment.
- Post can consist of text, image or gifs.

**Profile Settings**

- User can view there profile or any other users profile.
- Each user can edit there profile.
- From someones profile logged in user can follow there following or follower users.

**Authentication**

- myspace has login, signup and logout feature.
- A new user can also login using test credentials.
- For Signup, form validation is done for all the fields.

**Dark mode**

- Has light and dark mode.

## Screenshots

<!--   ![image](public/images/hbs-desk.png) -->
<div display='flex'>
    <img alt="hbs drive mobile" src="public/images/hbs-mob.png" width="auto" height="auto" />
     <img alt="hbs drive mobile" src="public/images/hbs-mob-app.png" width="auto" height="auto" />

  <img alt="hbs drive desktop" src="public/images/hbs-desk.png" width="auto" height="auto" />
</div>

## 👨‍💻 Connect with me

<a href="https://twitter.com/sofiyullah_dev"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/></a>
<a href="https://www.linkedin.com/in/sofiyullah-abdullah/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
© 2022 GitHub, Inc.
Ter

 
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

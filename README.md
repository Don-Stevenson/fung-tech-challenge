# fung-tech-challenge

In meeting the requirements set out for me, I built a front end in React that allows users to register, login, get to a home page and logout. This project is built using the MERN stack (MongoDb and Express for the backend with React and Node on the frontend).

I really enjoyed my this challenge as each time I work with React, I'm able to try out new things and sharpen my skills over-all.

## To run the challenge

- For and clone the repo to a local repo.  In your newly created local repo, install all packages using the command *npm install*  
- Next create a .env file with the provided keys *inside* mern-auth-backend root dir.
- Go into the mern-auth-backend dir and use the command *nodemon server.js* 
- Go into the mern-auth-front dir use *npm start* to begin the app


### Features I'm proud of

- using the async await syntax to make calls to the backend.
- adding error messages that display if fields are incorrect, missing or not matching (in the case of verifying passwords upon registration)
- using the useContext hook as a reducer.
- making all the css from scratch! 
- creating a responsive design for mobile use.
- creating a site that is reasonably secure by using JsonWebtokens, Bcrpyt to hash passwords, and making as few gets and posts of senstive data as possible. There's always more to do with security and I enjoy learning about it and implementing it.
- though not a requirement, building a MongoDb Express backend that handles verifies and persists data and returns messages to the front end when errors occur.

### features that I'd keep working at 
- making the site more secure. When I register a user google sometimes will give me a data breach message. I would like to solve that issue! I also persist a token to local storage out of convience for the user (for persisting login on refreshes, and opening new tabs), but this could potentially expose their data. I'd like to learn more about different security options, but figured I was at a reasonably good place to submit my project.
- the styling of the page. While I am not a designer by trade, I enjoy making things look appealing, but I see some minor bugs and styling tweeks that I would like to play with more to achieve a more professional and polished look.

## The finished result looks like

!['Login Page'](https://github.com/Don-Stevenson/fung-tech-challenge/blob/main/docs/Login.png)

!['Register Page'](https://github.com/Don-Stevenson/fung-tech-challenge/blob/main/docs/Registration.png)

!['Sample Error Display'](https://github.com/Don-Stevenson/fung-tech-challenge/blob/main/docs/Error1.png)

!['Sample Error 2 Display'](https://github.com/Don-Stevenson/fung-tech-challenge/blob/main/docs/Error2.png)

!['Home Page'](https://github.com/Don-Stevenson/fung-tech-challenge/blob/main/docs/HomePage.png)

![User Story Gif](https://github.com/Don-Stevenson/fung-tech-challenge/blob/main/docs/fung-tech-challenge.gif)
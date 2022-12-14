![logowhite 1e56aaae](https://user-images.githubusercontent.com/104551393/208228222-1d71f578-0855-4f19-a94f-89cea62b76ef.png)

# About

Remember the Leche is a Full Stack web application inspired by Remember the Milk. On Remember the Leche you can organize, plan, and execute all your most important tasks!

## Check out our live Remember the Leche site:
[**https://remember-the-leche.onrender.com/**](https://remember-the-leche.onrender.com/)

## Project Wiki
-[API-Routes](https://github.com/alexiswest98/rem-the-milk/wiki/API-Routes)

-[Database Schema](https://github.com/alexiswest98/rem-the-milk/wiki/Database-Schema)

-[Feature List](https://github.com/alexiswest98/rem-the-milk/wiki/Feature-List)

-[Redux Shape](https://github.com/alexiswest98/rem-the-milk/wiki/Redux-Shape)

#### Frameworks, Platforms, & Libraries:
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

 #### Editors, IDEs, & Misc:
 - ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
 - ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)


#### Database:
- ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

1. Clone the repo:

    HTTPS Authentification:
    git clone https://github.com/alexiswest98/rem-the-milk.git

    SSH Authentification with SSH or HTTPS:
    git clone git@github.com:alexiswest98/rem-the-milk.git

2. Install dependencies: pipenv install -r requirements.txt
 
3. Navigate to the root: pipenv install
  
4. Create a .env file in the root of the backend folder and copy the contents from the .env.example file:
    cp .env.example .env

4. Migrate and seed the files. Enter the shell via pipenv shell, then:
    flask db upgrade
    flask seed all
    
5. Utilize pipenv shell in the root folder.
    pipenv shell
    flask run
 
6. Navigate to the frontend react folder and npm install.
    npm install
    
7. Utilize npm start in the front-end folder and you will be directed to: http://localhost:3000/
    npm start

## Feature Roadmap

- [x] Lists
    - [x] Create a list
    - [x] Load all lists
    - [x] Create a list associated with a group
    - [x] Update a current user's list
    - [x] Delete a current user's list
- [x] Tasks
    - [x] Create a task
    - [x] See all tasks of current user
    - [x] Update a current user's task
    - [x] Delete a task
- [x] Groups
    - [x] Create a group for the current user
    - [x] Get all groups of current user
    - [x] Delete a group
- [x] Members
    - [x] Add a member to a specified group
    - [x] Remove a member from a specified group
    - [x] Get all members based off of group id
- [x] Following
    - [x] Current user can follow another user
    - [x] Current user can unfollow another user
    - [x] Can get followers of current user
    - [x] Can get following of current user

## Get in touch!
- [Alexis' GitHub](https://github.com/alexiswest98)
- [Alexis' Linkedin](https://www.linkedin.com/in/alexis-west-596a6b203/)
- [Evan's GitHub](https://github.com/ebmorgansb)
- [Evan's Linkedin](https://www.linkedin.com/in/evan-morgan-9a2723132/)
- [Michael's GitHub](https://github.com/ebmorgansb)
- [Michael's Linkedin](https://www.linkedin.com/in/michael-lacey-84875a243/)
- [Gabriel's GitHub](https://github.com/Gabetd)
- [Gabriel's Linkedin](https://www.linkedin.com/in/gabriel-day-536738201/)

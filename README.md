# MAKEGOTCHI - Frontend

## Background

This app was inspired by a favorite childhood game of ours, Tamagotchi. Tamagotchi is a handheld digital pet that was first released in Japan in 1996. The name is a blend of two Japanese words, tamago which means “egg” and uotchi which means “watch.” 

MAKEGOTCHI derived from the Tamagotchi’s name itself and the first four letters are the initials of the 4 contributors of this app, Marisa You, Alexa Gamil, Kim Nguyen, and Elaine Tolentino.  

Our version of the Tamagotchi enables the user to adopt from a selection of Tamagotchis and interact with them by feeding, cleaning, tucking them into bed. Additionally the user can choose to play minigames and potentially earn or gamble coins. The coins can then be used to purchase additional pets.

Beware, take good care of your pets! If you don't feed, clean, and tuck them into bed regularly, they will feel neglected and run away. 

## Screenshots

#### Log In
![Home Page](https://github.com/nnhk23/makegotchi-frontend/blob/master/src/images/logIn.png)

#### Tama Store
![Tama Store](https://github.com/nnhk23/makegotchi-frontend/blob/master/src/images/tamaStore.png)

#### Pet Details
![Pet Details](https://github.com/nnhk23/makegotchi-frontend/blob/master/src/images/petDetails.png)

#### Tic Tac Toe
![Tic Tac Toe](https://github.com/nnhk23/makegotchi-frontend/blob/master/src/images/ticTacToe.png)

#### Janken (rock, paper, scissors)
![Janken](https://github.com/nnhk23/makegotchi-frontend/blob/master/src/images/janKen.png)


## Technology Used

- Ruby on Rails
- Javascript
- React
- React Bootstrap
- JSX
- CSS

## Features & Highlights

- Create, Read, Update, and Delete a User
- Create, Read, Update, and Delete a UserPet
- Read data from the Pet table 

#### Log In/Sign Up/Update User Profile

- A user signs up with a name, username, password, and a password confirmation.
- A user has to have a unique username.
- Log in validates username and password match an entry in the database.
- Log in and Sign up provide user a token and store it in local storage. 
- If logged in, token handles refresh to keep the user logged in.
- User is able to update their username and password.

#### Adopting a pet

- A user can visit the Tamastore and browse different species of tamagotchis. 
- Each pet species has one of three different personalities : lazy, peppy, and cranky.
- The price of each pet varies from 100 to 500 coins. (lazy pets are good starter pets because their prices are lower)
- A user spends coins to adopt a pet. (a new user starts with 500 coins)
- When a pet is adopted the user can name the pet.

#### Nurturing pets

- All of the user's adopted pets are listed on the side nav. When one of the pets is clicked, its information will be rendered in the Tamagotchi screen.
- Pets have to be fed, cleaned, and tucked into bed at regular intervals, determined by their personalities. (ie. cranky pets needs sleep more often)
- When a pet is not fed, cleaned, or tucked into bed in time, its happiness level will decrease every second.
- When a pet's happiness reaches 0, it will run away. (shame on you)
- User will receive an alert when one of its pets runs away.
- Each pet's happiness is calculated upon log-in, based on when it was last fed, cleaned, or tucked into bed. Therefore it is possible for a pet to run away while the user is logged out. 

#### Minigames

- The number of times a user can play minigames is limited. A new user starts off with 5 plays. 
- The number of plays resets to 5 every 10 mins. 
- A user can choose to play Tictactoe or Janken(Rock, Paper, Scissors). 
- Additionally, the user can choose to gamble their coins. 
- If the user has 0 coins, the user does not get an option to gamble.
- If the user chooses to gamble he/she/they will gain 200 coins upon winning or lose 100 coins upon losing.
- If the user chooses to NOT gamble, he/she/they will gain 100 coins upon winning but not lose any coins upon losing.
- A user cannot exit game once it has started, until the game is complete. (all buttons are disabled)
- When a user finishes a game, a user can choose to play again or go back to minigames menu.


## Installation

#### Backend
https://github.com/nnhk23/makegotchi-backend

- bundle install
- rails db:migrate
- rails db:seed
- rails s

#### Frontend

- npm install
- npm i react-router-dom
- npm i react-animations
- npm i react-bootstrap bootstrap
- npm i styled-components
- npm start


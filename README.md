# Bump It Up! 

![image](https://github.com/fritzhuie/bump-it-frontend/assets/150071971/82806cbd-a95e-4943-b987-6aaf75109f25)

Welcome to Bump It Up - a bump activated Rock, Paper, Scissors game collaborating with other users

## Wireframe & Component Heirarchy
![image](https://github.com/fritzhuie/bump-it-frontend/assets/150071971/878040ac-3d7b-48cb-917f-39d897649466)

## ERD 
![image](https://github.com/fritzhuie/bump-it-frontend/assets/150071971/908714ed-0f0e-45f6-8de8-fbf039e936e0)


## Trello Link 
https://trello.com/b/g4yTFtne/bump-it-up-sorry-joe-budden

## Tools Used 
React, Django, Python, Javascript, CSS 

## User Stories 

1. **Account Signup**: 
   - As a user, I want to sign into/log into the Bump It App.

2. **User Profile**: 
   - As a user, I want to edit/save/delete my user profile 

3. **Game Landing Page**: 
   - As a user, I want to match with a nearby second user through the build in accelerometer within Bump It Up.
   - As a user, I want to play with that nearby second user that I match with

## Future Ice Box 

1. **Achievements**
   - As a user, I want to see my achievements, wins/losses
  
2. **Additional mini games**
   - As a user, I want to play additional games with other users I connect with
  
3. **Favorites**
   - As a user, I want to favorite specific matches 

# User Routes

**[Backend](https://github.com/Shyan-spec/bump-it-backend)**

| Category        | Action          | Method | Path                        | Type       | Parameters                                          |
|-----------------|-----------------|--------|-----------------------------|------------|----------------------------------------------------|
| Authentication  | Login           | POST   | `/users/login`              | JSON       | `email`, `password`                                 |
| Authentication  | Signup          | POST   | `/users/register`           | JSON       | `email`, `password`, `name`                         |
| User Profile    | Change Avatar   | PUT    | `/users/profile`            | JSON       | `url`                                               |
| User Profile    | View Profile    | GET    | `/users/profile/{userId}`   | JSON       | `userId` (optional, path parameter)                 |
| User Profile    | Delete Profile  | DELETE | `/users/token/refresh`      | JSON       | `userId`                                             
| Game Mechanics  | Bump Event      | POST   | `/game/bump`                | JSON       | `timestamp` (`Date`), `choice` (`rock`, `scissor`, `paper`) |
| Game Mechanics  | View Result     | GET    | `/game/result/`             | JSON       | `matchId` (path parameter)                          |
| Game Mechanics  | View Result     | GET    | `/game/result/{matchId}`    | JSON       | `matchId` (path parameter)                          |


## Team
Kenneth, Murad, Fritz, Shayan

**Roles**
Kenneth = Fullstack/PM
Shyan = Gitmaster/Fullstack 
Murad = Fullstack
Fritz = Fullstack/DB

## GROUP PLANNING

Team Goals & Values
Functional Code
Interactive, Attractive UI
Thorough Communication Between Teammates

Team Communication Preferences
Slack GroupChat at any time; DND is on during sleep hours
Trello updated daily
Respond within 3 hours.



**Communication Styles**
1.) Let’s have all voices to be heard 
2.) Trust in one another’s ability / ability to assign tasks / agree to implement said features 
3.) Flexibility in perspectives and the ability to compromise 
4.) when there’s a failure to agree, or a way to move forward - we revisit the question with Greg, Emre, Grant. 
5.) Assume the best / keep positive, keep active communication - don’t let things fester bring things to light 
6.) Let’s stick to the plan with what is agreed upon after approval. 
7.) Trusting one another to have respect with one another’s opinion - in a safe space.  
8.) no shutting down, addressing concerns without pushing through.  
9.) Communicate via visuals / drawn out in detail for all 4 us 
10.) Everyone should have the floor / equal time 
11.) everyone’s opinion is valued 

**Coding Practices**

Conventions:
Branch Naming
master, development;
sub-branches use  “initial-dev” convention, ie: mk-feature-forms
hotfix, feature, refactor

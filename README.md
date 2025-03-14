# Restaurant Roulette

Our project is a randomized restaurant decision maker. Have you ever just been too tired to decide what is for dinner? Well not anymore. Now you can visit our project and our wheel of restaurants will decide for you!

## Navigation

- [User Story](https://github.com/shoc71/Restaurant-Roulette/ 'User Story')
- [Acceptance Criteria](https://github.com/shoc71/Restaurant-Roulette/ 'Acceptance Criteria')
- Features
- Description about Project
- Technologies Used
- Challenges Faced
- Team Members
- Installation
- Project Details
- Contributions
- License

## User Story

AS A user who enjoys dining out  
I WANT a restaurant roulette app  
SO THAT I can randomly pick a restaurant to eat at and manage my favorites.

## Acceptance Criteria

GIVEN a restaurant roulette app  
WHEN I load the app  
THEN I am presented with a landing page containing sections for Recommended restaurants, Favourites, and a roulette wheel.
WHEN I view the Recommended section  
THEN I see a list of suggested restaurants based on ratings or popularity.
WHEN I view the Favourites section  
THEN I see a list of restaurants I have previously marked as my favorites.
WHEN I want to add restaurants to the roulette wheel  
THEN I can select from the Recommended or Favourites sections, or input my own custom restaurant options.
WHEN I click the "Add Restaurant" button  
THEN my custom restaurant is added to the list of options on the roulette wheel.
WHEN I click the "Spin" button  
THEN the roulette wheel spins and randomly selects a restaurant from the list of options.
WHEN a restaurant is selected by the roulette wheel  
THEN the app displays the selected restaurant on the screen.
WHEN I enter a custom restaurant option and click save  
THEN the restaurant is added to my Favourites section for future use.

## Features

- Recommended list (rotating list so new options show up every 10 seconds or so)
- Favourites list
- Custom-type Restaurants by user
- Spinner (alerting the user and checking to see if the user ha options are there or not)
- Random Selector Button (Quick-pick without the wheel)
- CSS-Bootstrap Buttons (see suggestions).
- Use client-side storage to store persistent data
- [BETA] Login and Signup page

## More despriction of project:

For our project we have as our main page a screen allows the user to enter resturants that they want to be included on the wheel. Once they have entered all the restaurants they want, they will hit the Ready to spin? button. Once that button is clicked, they get rerouted to a new screen that has a spinner with all their restaurant options. They will then spin the wheel. The wheel will spin and randomly select a restaurant optin and display on the screen.

### Some technologies we used: 

We used bootstrap in our code to help make the CSS faster and more reliable throughout the code. We also used the addEventListener to listen for the user to click our button. Once they clicked the button our code would do the function we told it to do. For example once the button is clicked spin the wheel. We also used getElementById quite a bit in our Javascript to select an unique element by its ID from the HTML.

### Some challenges we faced:

As a team we faced the challenge of everyone using the repository "smoothly", we worked as a team to make sure eeryone had up to date code and not over riding others. Another challenge we faced was being to "aggressive" with our code and realizing we needed to get the MVP done and worry about bells and whistles later.

## Team members: 

01: Ctrl Alt Elite
   * Rosemarie Lupi | Github : [Github RML-png]
   * Mickey Darty | Github : [TilesTwenty]
   * Courtney Ponder | Github : [Github CourtneyPonder]
   * Rosser Williams | Github : [rosserw]
   * Github : [shoc71]

### Installion
-  This [video]([url](https://www.youtube.com/watch?v=YXXp_ht4pwQ)) helps you install both git and GitHub Repositories
-  Use ```git clone git@github.com:shoc71/Restaurant-Roulette.git```

## Project Details

Project Github Page: [https://shoc71.github.io/Group-Project-1/]
Project Github Repo: [https://github.com/shoc71/Group-Project-1]

### Contributions (By You & How to do it)
  1. Fork the repository
  2. Create a new branch (git checkout -b feature/YourFeature)
  3. Make your changes
  4. Commit your changes (git commit -m 'Add some feature')
  5. Push to the branch (git push origin feature/YourFeature)
  6. Open a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

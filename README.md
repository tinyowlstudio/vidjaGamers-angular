# Vidja Gamers Angular Client

This project is the Angular version of the React app as seen here: https://github.com/Alioran/vidjagamers-client
----------------------------------
This uses the same backend API and endpoints, but uses Angular-CLI to build the app. It also uses both components and templates as per the Angular framework. While this isn't a one to one iteration of the React version, it carries the core functionalities that the original had. Base design work and functionality were also created with Angular Material and edited as per previous design.

Current functions include: 
- Registering a user
- Logging in and out
- Storing data to local storage (for both authorization and displaying info)
- Rerouting based on whether or not youre logged in or not
- Displaying the list of games provided by the API
- Favoriting/unfavoriting games
- Clicking for more details about the description, genre, and developer of a specific game
- Displaying user's details (excluding their password)
- Allowing changes to user's information
- Deleting user from the database

To see the app in action, you can follow this link: https://alioran.github.io/vidjagames-angular-app/

Additionally, I used lite-server (https://www.npmjs.com/package/lite-server) to test builds and TypeDoc (https://typedoc.org/) for documenation 

## Possible Future Updates
- Be in line with the angular client and show favorite games on the user's profile page
- Instead of a pop up dialog for Genre, Developer, and Description, maybe having a hover over dialog box might work for smaller pieces of text. This will need user testing to see what works better
- Work on branding and apply it to both Angular and React apps
- A search bar or sorting mechanism like in the React version
- Pagination to accomodate for more games without flooding the page and causing long loading times

## Version History
### Version 0.5 (10-31-2023)
- Adjusted more styling
- Created documentation using TypeDoc
### Version 0.4 (10-31-2023)
- Created components for a games genre, developer, and description
- Created the profile view component
- Added more functions to fetch the API
- Created functions for each module to work with the fetch-api-functions to display information
- Custom styled the app to look more in line with the React app
- Built the app on a separate repository (link above)
### Version 0.4 (10-26-2023)
- Created components for the welcome page and games page
- Swapped the login and registration component from being in the app component to the welcome component
- Added getToken functionality for authorization 
- Created a working function that was able to fetch and list games within the API with authorization
### Version 0.3 (10-24-2023)
- Created the main app module, along with the login form and registration form
- Added HTML components to test out the API calls
### Version 0.2 (10-23-2023)
- Tested API endpoints from the games-api made before and ensured that there was a response
- Added HttpClientModule
### Version 0.1 (10-23-2023)
- Started with an Angular template and tested to see how it worked


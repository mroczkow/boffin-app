# Boffin App

B**OFF**IN predicts which concerts you may like on next OFF Festival (http://off-festival.pl/en/).

Application was written in Angular 6 using Angular Material. It is deployed to Firebase and you can visit it here: https://boffin-app.firebaseapp.com/

## How it works

You need to choose which artist you liked on previous editions of OFF Festival. Selections are send to backend (https://github.com/jurekkow/boffin-api) and received predictions are displayed on line-up. 
The darker color is, the greater chance you will like the artist.

Your selections and predictions can be saved in local storage of you browser.

## Run app locally 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

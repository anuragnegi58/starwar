# StarWarApp

This file is created with intent to make people work on this project

########----ABOUT------###### This project has a login screen which let starwar characters login and then allows you to search planets. On typing anything in search input a list of card with all planets similar to input value will appear. Bigger the planet population bigger will be its size of the card and font. On click of the user will be redirected to the page displaying all the planet information.

########---How to run-----###### To run simply download this project and unzip or clone this repository https://github.com/anuragnegi58/starwar

npm i // to install all node packages
ng serve // to run project on localhost

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

####--Enable CORS--#### #It is a demo project which uses the starwar api. Since this api is on http and we are normally on local we have to allow CORS with the help of CORS enable add on in chrome or firefox. Otherwise this app will not work.

####---Test Cases---##### #Test case are added for demo purpose only for component Overlay. To run this type like npm test OverlayBottomTop.spec.js Test cases are written in Enzyme and are configured in project to generate a report to show test case status for all files.

##############-- -------Detailed Design ------ -------######## This project does not show a particular approach towards doing similar things to demonstrate varied ways in which react can use composition model Functionality includes a login screen which takes username and password(both case sensitive) and let you enter into the next page where a search bar is displayed for searching star war planets. Username is character name and password is its birth year. If usernamem is not Luke Skywalker you are only allowed to search 15 times in a minute(please note that each character typing is considered as one search) It has a logout button which take to login page. To search simply click on input box and start typing. Result will be shown along the way user types. Search can be little slow since it is getting values form API and it takes time List shown is clickable and planet with bigger population is shown in bigger fonts(Coding thing --This can be improved from $if to $swtich) On clicking on any list Item an overlay with fantastic Darth vader theme will appear showing details of that planet. Overlay has X button on top right to close it.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

#########-----STYLES---------########### Currently css is used for each files separately and is used by importing in each component. Global css is also present and is included in root of this file mainly for backgroud image and basic tags styles. For big project using pre-processor will be suggested


*-------------End Of File---------------------

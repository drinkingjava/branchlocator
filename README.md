### Branch Locator App
This project is built using leafletjs using a small sample of map coordinates of Capitec branches. This is a budget friendly/low risk approach since Google wants you to provide a credit card and can surprise you with a massive bill. 

The sample coordinates and addresses were manually grabbed from OSM and stored to use as mock data. The contact details and operation hours are just mock data as well. Mock data was used because the open source resources for data are not complete. They don't distinguish between branches and ATMs. Also, they have a lot of information missing. 

The only dynamic feature of this app is the location search function, which is used to set any user location for testing. The Nominatim API is queried for locations. 

## How to build and this with Docker
Run the following:

```docker build -t app .``` # builds the app

then: 

```docker run -p 3000:80 app``` # runs and serves the app

Visit http://localhost:3000 in your browser

## How to build and run this in a development environment.

Install dependencies. 
`npm install`

Start up the local dev server and visit localhost:5173 in the browser 
`npm run serve`

To build for production:
`npm build`

## How to test the APP

The app should load with a map prepopulated with markers. The red marker is a default marker used for the user. The user's location can be changed by using the search box to search and then setting a location. Try searching for Canal Walk and click on the result. The user's location should change, and the map should jump to that location automatically. All of the blue markers have branch information. Click on them to view them. 

## Improvement suggestions or nice to haves
- Grab the user's location automatically, if allowed.
- Automatically find the closest store to the user and show the distance in km
- Add a 'show me my location' button
- Improve the presentation of UI elements and formatting of text
- Show location previews when hovering or navigating on location results
- Find a reliable API or solution to automatically search for branch data instead of relying on manual data entry, and add all known/new branch markers this way. The APIs used cannot reliably distinguish between branches and ATMs. On top of that, they don't always provide data such as addresses, contact details, and operating hours. 
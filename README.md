### Branch Locator App
This project is built using leafletjs using real map coordinates of capitec branches. The coordinates and addresses were grabbed from OSM and stored to use as mock data. The only dynamic feature of this app is the location search function which is used to set any user location for testing. The nominatim API is queried for locations.

## How to build and this with Docker
Run the following:
`docker build -t app .` # builds the app
then 
`docker run -p 3000:80 app` # runs and serves

Visit http://localhost:3000 in your browser

## How to build and run this in a development environment.
Please first install pnpm if not available on your machine. 
See https://pnpm.io/installation on how to do it.

Install dependencies. 
`npm install`

Start up the local dev server and visit localhost:5173 in browser
`npm run serve`

To build for production:
`npm build`


## How to test the APP

The app should load with a map prepopulated with markers. The red marker is a default marker used for the user. The user's location can be changed by using the search box to search and then set a location. Try searching for Canal Walk and click on the result. The users location should change and the map should jump to that location automatically. All of the blue markers have address information. Click on them to view it.


## Improvement suggestions or nice to haves
- Grab the user's location automatically, if allowed.
- Automatically find the closest store to the user and show the distance in km
- Add a 'show me my location' button
- Improve the presentation of UI elements and formatting of text
- Show location previews when hovering or navigating on location results
- Automatically search for branch data instead of relying on manual data entry and add all known/new branch markers this way.
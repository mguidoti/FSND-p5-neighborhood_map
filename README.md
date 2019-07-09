## Neighborhood Map

> This is the fifth project of the [Full Stack Web Development Nanodegree](https://in.udacity.com/course/full-stack-web-developer-nanodegree--nd004/) program, from Udacity.



### Overview

The goal of this project is to implement an one page app listing locations on a map, providing information from more than one API provider, in a responsive manner. The data model framework to be used is [Knockout](https://knockoutjs.com/index.html), and the [Udacity JavaScript Style Guide](https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html) has to be followed as well.

I'm also using [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/) for this project.



#### Chosen theme

My version of this project was named **'my home town'** for a reason: it shows places from the city where I grew up, like schools that I've attended, or gyms that I used to workout, or parks that I love to go. A total of 16 places were hard coded into the `js/places.js` with their names, coordinates, Google Maps and Foursquare IDs, and an additional personal info/comment on every and each of them. The IDs were collected manually using this [link](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) and this [API endpoint](https://developer.foursquare.com/docs/api/venues/search), respectively. They were divided into five different types, which are used in the location filter: education, sports, parks, local shops and food places (which includes restaurants, coffee shops and others). Not all locations has Foursquare tips (the data used from this API), which means, this part of the information on these locations will be missing on their respective InfoWindows.



#### Presentation

The app shows a filter setting with a dropdown list and a button, that filters both list of locations and their respective markers on a Google Maps, which is loaded on the page. All locations are shown by default. When clicking on any location in the location list, my personal info/comment on the location is shown and the respective marker starts bouncing. If the mouse is placed over a marker, the marker changes its color. When a marker is clicked, it turns gray until the mouse is placed off the marker, and the InfoWindow with information from Google Maps API and Foursquare API about that given location is loaded asynchronously. If a different marker is clicked when a InfoWindow is open, this will be closed before opening the new and respective InfoWindow. 

The app is responsive and it was tested for mobile (nexus 5 and iphone X) and tablets (ipad).



### Used technologies

- **Markup languages**: HTML5, CSS3 
- **Programming languages**: JavaScript
- **JS Libraries**: jQuery, Knockout
- **APIs**: Google Maps API, Foursquare



### How to run

First, clone or download this repository; then, navigate to the folder and run index.html. 

**_I removed both Google Maps and Foursquare API keys for security reasons. You'll have to add yours at the last URL on index.html and on googlemaps.js, respectively. Sorry!_**



### Sources

This projected used a [cover image](https://i.pinimg.com/originals/6d/4b/5e/6d4b5edf80117fbf73d4dab7be8ab7f9.jpg) found on a simple Google search, and an open sourced [black and white Google Maps Style](https://snazzymaps.com/style/79/black-and-white) from [Snazzymaps.com](https://snazzymaps.com). https://snazzymaps.com/). Foursquare and Google Maps black logos were found [here](https://tchol.org/images/foursquare-png-13.png) and [here](https://image.flaticon.com/icons/png/512/104/104106.png), respectively. 



### Known Issues

As the locations are all from a Brazilian city, the info Foursquare's tips are in Brazilian Portuguese - sorry for that!



### Disclaimer

This is just a learning project, not planned to be released. No copyright infringement intended.

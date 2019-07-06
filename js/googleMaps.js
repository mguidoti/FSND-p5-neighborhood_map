// Create a new blank array to hold all the listing markers.
// This array is intended to be accessed in app.js.
let markers = [];

let map = [];

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -30.034647, lng: -51.217658},
      zoom: 14,
      // Create a styles array to use with the map
      styles: [
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                { "visibility": "on" }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                { "color": "#000000" },
                { "weight": 1 }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                { "color": "#000000" },
                { "weight": 0.8 }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                { "color": "#ffffff" }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "elementType": "labels",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "elementType": "labels.text",
            "stylers": [
                { "visibility": "on" }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                { "color": "#ffffff" }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                { "color": "#000000" }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                { "visibility": "off" }
            ]
        }
    ],
      // set to false the ability to change the map type (e.g., terrain, satellite)
      mapTypeControl: false
    });

    // Create the infowindow object, that will show information from
    // Google Maps and Foursquare APIs.
    let infowindow = new google.maps.InfoWindow();

    // Set the color of the default markers.
    const defaultIcon = makeMarkerIcon('00ff00');

    // Change color of the marker. To be used with a mouseover event listener.
    const highlightedIcon = makeMarkerIcon('ffffff');

    // Change color of the marker. To be used with a on click event listener, 
    // and when the respective location is clicked in the list.
    const clickedIcon = makeMarkerIcon('d3d3d3');

    // Create a new LatLngBounds object that gets the southwest and northeast 
    // corners of the view port, to center the map accordingly to the markers.
    let bounds = new google.maps.LatLngBounds();

    // Go through the location array to create an array of markers.
    for (var i = 0; i < myPlaces.length; i++) {
        
        // Create a marker for each location, and put into the markers array.
        var marker = new google.maps.Marker({
          map: map,
          position: myPlaces[i].position,
          title: myPlaces[i].title,
          icon: defaultIcon,
          animation: google.maps.Animation.DROP,
          id: myPlaces[i].googleMaps_ID
        });

        // Push the marker to the array of markers.
        markers.push(marker);

        // Create an onclick event to open an infowindow when each marker is 
        // clicked (that's what the 'this' part is doing here).
        marker.addListener('click', function() {
            this.setIcon(clickedIcon);
          populateInfoWindow(this, infowindow);
        });

        // Adds two event listeners, one for mouseover and one for mouseout
        // to highlight the markers' icons accordingly.
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedIcon);
        });

        marker.addListener('mouseout', function() {
          this.setIcon(defaultIcon);
        });

        // Adds the marker to the LatLngBounds instance...
        bounds.extend(markers[i].position);
      }

    // Extend the boundaries of the map by applying the LatLngBounds instance.
    map.fitBounds(bounds);

    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 21px wide by 34px, have an origin
    // on 0, 0 and be anchored at 10, 34.
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
        
        return markerImage;
    }

}
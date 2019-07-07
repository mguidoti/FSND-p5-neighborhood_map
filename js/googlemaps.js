'use strict';

// Create a new blank array to hold all the listing markers.
// This array is intended to be accessed in app.js.
let markers = [];

// Create a new variable to hold the future map while being
// accessible externally, from app.js.
let map = [];

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -30.034647, lng: -51.217658},
      zoom: 14,
      styles: myStyle,
      mapTypeControl: false
    });

    // Create the infowindow object, that will show information from
    // Google Maps and Foursquare APIs.
    let infoWindow = new google.maps.InfoWindow();

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
    for (let i = 0; i < myPlaces.length; i++) {
        // Create a marker for each location, and put into the markers array.
        const marker = new google.maps.Marker({
          map: map,
          position: myPlaces[i].position,
          title: myPlaces[i].title,
          icon: defaultIcon,
          animation: google.maps.Animation.DROP,
          id: myPlaces[i].googleMaps_ID,
          foursquare_id: myPlaces[i].foursquare_ID
        });

        // Push the marker to the array of markers.
        markers.push(marker);

        // Create an onclick event to open an infowindow when each marker is 
        // clicked (that's what the 'this' part is doing here).
        marker.addListener('click', function() {
            this.setIcon(clickedIcon);
            myInfoWindow(this, infoWindow);
            map.setCenter(marker.position);
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
        const markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + 
            markerColor + 
            '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
        
        return markerImage;
    }
}

function myInfoWindow(marker, infowindow) {
    
    let service = new google.maps.places.PlacesService(map);
    
    let infoWindowContent = '<div id="infowindow">';

    // Set the marker property on this infowindow so it isn't created again
    infowindow.marker = marker;

    // Make data request to Google Maps API
    service.getDetails({
        placeId: marker.id
    }, function(place, status) {
    
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        
            // Add the information from Google Maps API
            if (place.name) {
                infoWindowContent += '<h4>' + place.name + '</h4>';
            }
            if (place.formatted_address) {
                infoWindowContent += '<p><span class="infowindow-type">' +
                    'Address:</span> ' + 
                    '<span class="infowindow-data">' + 
                    place.formatted_address + 
                    '</span></p>';
            }
            if (place.international_phone_number) {
                infoWindowContent += '<p><span class="infowindow-type">' +
                    'International Phone Number:</span> ' + 
                    '<span class="infowindow-data">' + 
                    place.international_phone_number +
                    '</span></p>';
            }
            if (place.opening_hours) {
                infoWindowContent += '<p><span class="infowindow-type">' +
                    'Open now?</span> ' +
                    '<span class="infowindow-data">' + 
                    place.opening_hours.open_now +
                    '</span></p>';
            }
            if (place.url) {
                infoWindowContent += '<p><span class="infowindow-type">' +
                    'Google Maps URL:</span> ' +
                    '<span class="infowindow-data">' +
                    '<a href=' + 
                    place.url +
                    '>' + 
                    place.url +
                    '</a></span></p>';
            }
        
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        } else {
            infoWindowContent += '<p><span class="infowindow-type">' +
            'Google Maps API information could not be loaded</span>';
        }

        // AJAX Request for venue tips on Foursquare
        const foursquareClientID = 'VK31XCCX1Q4K2BDABYZNB3WEQLRCG2V0VGKJFDZ20GBJCEYS';
        const foursquareClientSecret = 'EDA0P4IS2O1HTJBZN0S31XQCCDULNDEUNABBOLSKXWD3PHHB';

        // Building Foursquare API URL
        let foursquareUrlAPI = 'https://api.foursquare.com/v2/venues/' +
            marker.foursquare_id + 
            '/tips?client_id=' +
            foursquareClientID + '&client_secret=' + 
            foursquareClientSecret + 
            '&v=20160118';
        
        // Actual AJAX request
        $.getJSON(foursquareUrlAPI, function(data) {

            // Gets data if the API call response is successfull
            if (data["meta"]["code"] == 200) {
                
                // Check if there is any tip on this response
                if (data["response"]["tips"]["items"].length > 0) {

                    infoWindowContent += "<br><h4>Foursquare #1 Tip</h4>";
                    
                    infoWindowContent += '<p><span class="infowindow-data">"' +
                        data["response"]["tips"]["items"][0]["text"] +
                        '"</span></p>';
                    
                    infoWindowContent += '<p id="infowindow-4sq-author"><span class="infowindow-type">' +
                        data["response"]["tips"]["items"][0]["user"]["firstName"] +
                        ' </span>';
                    
                    infoWindowContent += '<span class="infowindow-data">(Likes: ' +
                        data["response"]["tips"]["count"] +
                        ')</span></p>';  
                } else {
                    infoWindowContent += "<br><h4>Foursquare has no Tips for this location</h4>";
                }
            } 
        }).fail(function() {
            infoWindowContent += '<p><span class="infowindow-type">' +
            'Foursquare API data could not be loaded</span>';
        }).always(function() {
            infoWindowContent += '</div>';
            infowindow.setContent(infoWindowContent);
            infowindow.open(map, marker);
        });
    });
}



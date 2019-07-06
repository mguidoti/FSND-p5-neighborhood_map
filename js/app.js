var Location = function(place) {
    this.title = ko.observable(place.title);
    this.type = ko.observable(place.type);
    this.info = ko.observable(place.info);
    this.visibility = ko.observable(false);
}

var ViewModel = function() {

    var self = this;

    // Create an observable to hold the information on the type of location 
    // to be shown.
    this.locationType = ko.observable();

    // Create an observable array to hold the location list.
    this.locationList = ko.observableArray([]);

    // Create an observable to hold information on the current clicked location.
    this.currentLocation = ko.observable();

    // Populate the location list using the data on the myPlaces.js array
    myPlaces.forEach(function(each){
        self.locationList.push(new Location(each));
    });

    // Controls the 'toggle' effect on the location list, showing the personal 
    // information per location. Also hides the information when the visible 
    // location is clicked again.
    this.setLocation = function(clickedLocation) {
        
        // Get visibility status of the clicked location before making any 
        // significant changes.
        var clickedLocationVisibility = clickedLocation.visibility();

        // try and catch block to avoid the error that occurs when the 
        // currentLocation is still empty.
        try {
            self.currentLocation().visibility(false);
            
        } catch {} finally {

            // This makes sure that only when it was hidden that it becomes
            // visible. With this, I can 'hide' the active current location too.
            if (clickedLocationVisibility == false) { 
                self.currentLocation(clickedLocation);
                self.currentLocation().visibility(true);
            } 

            // Set marker animation to BOUNCE when a given location is 'activated'. 
            markers.forEach(function(eachMarker) {
                     
                if (clickedLocation.title() == eachMarker.title) {
                    if (eachMarker.getAnimation() == null) {
                        eachMarker.setAnimation(google.maps.Animation.BOUNCE);
                    } else {
                        eachMarker.setAnimation(null);
                    }
                } else {
                    eachMarker.setAnimation(null);
                } 
            });
        }
    }

    // Filter locations, changing in both location list and on the map by
    // calling functions defined on googleMaps.js.
    this.setFilter = function() {
        
        // If the type is equal to all, reset the locationList observable array
        // and add all locations from myPlaces.js.
        if (self.locationType() == 'all') {
            self.locationList.removeAll();
            myPlaces.forEach(function(each){
                self.locationList.push(new Location(each));
            });
 
            // Also set all markers to 'visible'.
            markers.forEach(function(each) {
                each.setMap(map);
            });

          // If not 'all', then, creset the observable array and only add locations
          // with the matching type.
        } else {
            self.locationList.removeAll();
            myPlaces.forEach(function(each){    
                if (self.locationType() == each.type) {
                    self.locationList.push(new Location(each));
            
                    // Set those markers with the matching type to 'visible'. 
                    markers.forEach(function(eachMarker) {
                        if(eachMarker.title == each.title) {
                            eachMarker.setMap(map);
                            
                            if (eachMarker.getAnimation() !== null) {
                                eachMarker.setAnimation(null);
                            }
                        }
                    });
                } else {           
                    // Set those markers without the matching type to 'unvisible'.
                    markers.forEach(function(eachMarker) {
                        if(eachMarker.title == each.title) {
                            eachMarker.setMap(null);

                            if (eachMarker.getAnimation() !== null) {
                                eachMarker.setAnimation(null);
                            }
                            
                        }
                    }); 
                }
            });
        }
    }
};

ko.applyBindings(new ViewModel());


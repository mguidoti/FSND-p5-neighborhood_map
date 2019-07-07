'use strict';

// Array with my Google Maps Style, an open-source style from https://snazzymaps.com/ 
const myStyle = [
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
];
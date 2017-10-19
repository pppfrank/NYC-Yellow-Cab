// Calling methods with javascript libraries
// 
// Mapbox GL JS 	mapboxgl.METHOD
// Leaflet 			L.METHOD
// jQuery			jQuery.METHOD  or $('selector').METHOD
// d3				d3.METHOD


// Provide access token
mapboxgl.accessToken = 'pk.eyJ1IjoianA5ZXIiLCJhIjoiY2o3MHVlajY3MDJuMjJxbXdnaTJyc2JxNiJ9.VHgp7GAROtHCXvoGPNELyg';  // replace with your own access token

// Link to a mapbox studio style
var map = new mapboxgl.Map({
	container: 'map',
	zoom: 12.14,
	minZoom: 11,
	maxZoom: 17,
	style: 'mapbox://styles/jp9er/cj8wmn0tm8rgk2smyvovx2e88',
    center: [-73.976689, 40.754383],
});

// map.addControl(new mapboxgl.FullscreenControl());

// PARKS - INFO WINDOW CHANGES ON HOVER
// code to add interactivity once map loads
map.on('load', function() {	// the event listener that does some code after the map loads
	
	// the categories we created from the cville-parks map layer
	var layers = [
		'> 50%', 
		'21% - 50% ', 
		'0 - 20% ', 
		'0'
	];
	
	// the colors we chose to style the parks on the map for each category
	var colors = [
		'#F1948A', 
		'#F5B7B1', 
		'#FADBD8', 
		'#A9CCE3'
	];

	// add a legend to the map
	for (i = 0; i < layers.length; i++) {
	  var layer = layers[i];
	  var color = colors[i];
	  var item = document.createElement('div');
	  var key = document.createElement('span');
	  key.className = 'legend-key';
	  key.style.backgroundColor = color;

	  var value = document.createElement('span');
	  value.innerHTML = layer;
	  item.appendChild(key);
	  item.appendChild(value);
	  legend.appendChild(item);
	}

	// replace contents of info window when user hovers on a state
	map.on('mousemove', function(e) {	// event listener to do some code when the mouse moves

	  var district = map.queryRenderedFeatures(e.point, {
	    layers: ['borough']	// replace 'cville-parks' with the name of your layer, if using a different layer
	  });

	  if (district.length > 0) {	// if statement to make sure the following code is only added to the info window if the mouse moves over a state
	    document.getElementById('info-window-body').innerHTML = '<p>Millions of cab trips picture the busy New York City. </p><p>Borough:  ' + district[0].properties.boro_name + '</p>';
	  } else {
	    document.getElementById('info-window-body').innerHTML = '<p>Millions of cab trips picture the busy New York City. </p><p>Hover over a park or click on a bus stop to learn more about it.</p>';
	  }
	
	});
	

	
	
	
	
// $('#buttonA').on('click', function() {
 // map = new mapboxgl.Map({
  // container: 'map',
  // zoom: 15, // update this with your desired zoom level
     // center: [-71.97722138410576, -13.517379300798098]  // update this with the coordinates of your new map center
  // style: 'mapbox://styles/jp9er/cj8wmn0tm8rgk2smyvovx2e88' 
 // });
// });

// $('#buttonB').on('click', function() {
 // map = new mapboxgl.Map({
  // container: 'map',
  // zoom: 15, // update this with your desired zoom level
     // center: [-71.97722138410576, -13.517379300798098]  // update this with the coordinates of your new map center
  // style: 'mapbox://styles/jp9er/cj8wmn0tm8rgk2smyvovx2e88' 
 // });
// });

// $('#buttonC').on('click', function() {
 // map = new mapboxgl.Map({
  // container: 'map',
  // zoom: 15, // update this with your desired zoom level
     // center: [-71.97722138410576, -13.517379300798098]  // update this with the coordinates of your new map center
  // style: 'mapbox://styles/jp9er/cj8wmn0tm8rgk2smyvovx2e88' 
 // });
// });

// $('#buttonD').on('click', function() {
 // map = new mapboxgl.Map({
  // container: 'map',
  // zoom: 15, // update this with your desired zoom level
     // center: [-71.97722138410576, -13.517379300798098]  // update this with the coordinates of your new map center
  // style: 'mapbox://styles/jp9er/cj8wmn0tm8rgk2smyvovx2e88' 
 // });
// });





	// -----------------------------------------------------------------------
	// BUS STOPS - MODALS
	// code to add modals
    // event listener for clicks on map
    map.on('click', function(e) {
      var amounts = map.queryRenderedFeatures(e.point, {
        groups: ['TIPS'] // replace this with the name of the layer
      });

      // if the layer is empty, this if statement will return NULL, exiting the function (no popups created) -- this is a failsafe to avoid endless loops
      if (!amounts.length) {
        return;
      }

      var amount = amounts[0];
      
      // Initiate the popup
      var popup = new mapboxgl.Popup({ 
        closeButton: true, 
        closeOnClick: true, 
        anchor: 'bottom', 
        offset: [0, -15] 
      });

      // Set the popup location based on each feature
      popup.setLngLat(amount.geometry.coordinates);

      // Set the contents of the popup window
      popup.setHTML('<h2><p>Tip amount:  '  + amount.properties.tip_amount // 'stop_id' field of the dataset will become the title of the popup
                           + '</p><p>Total amount:  ' + amount.properties.total_amount// 'stop_name' field of the dataset will become the body of the popup
                           + '</p><h2>');

      // Add the popup to the map
      popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    });

});



// Show "About this Map" modal when clicking on button
$('#about').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});

// Close "About this Map" modal when close button in modal is clicked
$('.modal .close-button').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});


map.addControl(new mapboxgl.FullscreenControl());





























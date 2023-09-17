// Get the navigation div
const navigationDiv = document.getElementById('navigation');

// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Open a GET request to the nav.html file
xhr.open('GET', 'navigation.html', true);

// Define the onload event handler
xhr.onload = function () {
  if (xhr.status === 200) {
    // Inject the navigation content into the div
    navigationDiv.innerHTML = xhr.responseText;
  }
};

// Send the request
xhr.send();
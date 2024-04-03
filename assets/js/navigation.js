const navigationContainer = document.getElementById('navigation-container');

fetch('navigation.html')
  .then(response => response.text())
  .then(data => {
    navigationContainer.innerHTML = data;
  })
  .catch(error => {
    // Handle errors gracefully, e.g., display an error message
    console.error('Error fetching navigation:', error);
  });
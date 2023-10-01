// Function to load the navbar content
function loadNavbarContent() {
    fetch('brandtext.html')
        .then(response => response.text())
        .then(data => {
            // Inject the loaded content into the navbarContent div
            document.getElementById('navbarContent').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar content:', error));
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    loadNavbarContent();
});
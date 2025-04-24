document.addEventListener("DOMContentLoaded", function() {
    // Fetch the page header HTML content
    fetch('page_header.html')
    .then(response => response.text())
    .then(html => {
        // Inject the HTML content into the page
        document.getElementById('page-header-container').innerHTML = html;

        // Update dynamic values
        document.getElementById('page-name').textContent = dynamicPageName;
        document.getElementById('page-title').textContent = dynamicPageTitle;
    })
    .catch(error => console.log('Error fetching page header:', error));
});
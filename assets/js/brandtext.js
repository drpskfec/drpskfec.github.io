// Function to load the navbar brand content
function loadNavbarContent() {
    const container = document.getElementById('navbarContent');
    if (!container) return;
    if (container.children.length > 0) return;
    fetch('brandtext.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            container.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading navbar content:', error);
            // Fallback content in case fetch fails
            container.innerHTML = '<div class="navbar-brand d-flex align-items-center"><span class="brand-name text-uppercase">Dr. Sateesh Kumar Peddoju</span></div>';
        });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbarContent);
} else {
    loadNavbarContent();
}

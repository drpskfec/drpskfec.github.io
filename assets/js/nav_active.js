let currentActiveId = null;

function setActive(navItemId) {
    currentActiveId = navItemId;
    applyActiveNav();
}

function applyActiveNav() {
    let activeId = currentActiveId;
    if (!activeId) {
        // Auto-detect based on current URL path
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
        if (!page || page === 'index.html' || page === '') {
            activeId = 'index';
        } else if (page === 'about.html') {
            activeId = 'about';
        } else if (page === 'academics.html') {
            activeId = 'academics';
        } else if (page === 'research.html' || page === 'journals.html' || page === 'conference.html' || page === 'books.html' || page === 'copyrights.html') {
            activeId = 'research';
        } else if (page === 'administration.html') {
            activeId = 'administration';
        } else if (page === 'students.html' || page === 'mtech-students.html') {
            activeId = 'students';
        } else if (page === 'awards.html') {
            activeId = 'awards';
        } else if (page === 'gallery.html') {
            activeId = 'gallery';
        } else if (page === 'contact.html') {
            activeId = 'contact';
        }
    }

    if (activeId) {
        const navLinks = document.querySelectorAll('#navbar .nav-link, #header .nav-link');
        navLinks.forEach(function(link) {
            if (link.id === activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    applyActiveNav();
});

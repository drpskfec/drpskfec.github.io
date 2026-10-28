// Load the navigation sidebar content
(function () {
  const navigationDiv = document.getElementById('navigation');
  if (!navigationDiv) return;

  // If already populated statically in HTML, no need to fetch
  if (navigationDiv.querySelector('#header') || navigationDiv.children.length > 0) {
    if (typeof applyActiveNav === 'function') {
      applyActiveNav();
    }
    return;
  }

  fetch('navigation.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load navigation');
      return response.text();
    })
    .then(data => {
      navigationDiv.innerHTML = data;
      if (typeof applyActiveNav === 'function') {
        applyActiveNav();
      }
    })
    .catch(error => console.error('Error loading navigation:', error));
})();

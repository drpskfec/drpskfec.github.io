function setActive(navItemId) {
    var navItems = document.querySelectorAll('nav a');
    navItems.forEach(function(item) {
      if (item.id === navItemId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
}
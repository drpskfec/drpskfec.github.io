// Load the modal content from the external file using AJAX
$(function () {
  $("#modal-placeholder").load("modals/cyber-modal.html");
});

// Show the modal when the "Read More" button is clicked
$(document).on("click", ".btn-read-more", function () {
  $("#cyberModal").modal("show");
});

// Load the second modal content from the external file using AJAX
$(function () {
  $("#cisct-modal").load("modals/cisct2023.html");
});

// Show the second modal when the "Read More" button for the second modal is clicked
$(document).on("click", ".cisct2023-read-more", function () {
  $("#cisctModel").modal("show");
});
// Load the modal content from the external file using AJAX
$(function () {
  $("#modal-placeholder").load("modals/cyber-modal.html");
});

// Show the modal when the "Read More" button is clicked
$(document).on("click", ".btn-read-more", function () {
  $("#cyberModal").modal("show");
});

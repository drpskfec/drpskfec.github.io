// Load modal content from external files using AJAX
$(function () {
  const modal1 = $("#modal-placeholder");
  if (modal1.length) {
    modal1.load("modals/cyber-modal.html");
  }
  const modal2 = $("#cisct-modal");
  if (modal2.length) {
    modal2.load("modals/cisct2023.html");
  }
});

function openAppModal(modalId) {
  const modalEl = document.getElementById(modalId);
  if (!modalEl) return;
  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.show();
  } else if (typeof $ !== 'undefined' && $.fn.modal) {
    $(modalEl).modal('show');
  }
}

// Show the Cyber modal when "Read More" button is clicked
$(document).on("click", ".btn-read-more", function (e) {
  e.preventDefault();
  openAppModal("cyberModal");
});

// Show the CISCT modal when "Read More" button is clicked
$(document).on("click", ".cisct2023-read-more", function (e) {
  e.preventDefault();
  openAppModal("cisctModel");
});

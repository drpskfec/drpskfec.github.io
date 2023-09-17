// Add an event listener to the form submit event
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var subject = document.getElementById('subject').value;
  var message = document.getElementById('message').value;

  // Send form data to Google Sheets
  var googleSheetScriptURL = 'https://script.google.com/macros/s/A1B2C3D4E5FGHIJKLMNOP/exec'; // Replace with the URL of your Google Sheets script

  var formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('subject', subject);
  formData.append('message', message);

  fetch(googleSheetScriptURL, { method: 'POST', body: formData })
    .then(function(response) {
      if (response.ok) {
        // Google Sheets update success
        console.log('Form data sent to Google Sheets.');

        // Send email
        var emailAPIKey = 'EMAIL_API_KEY'; // Replace with your email service API key
        var emailEndpoint = 'https://api.example.com/send'; // Replace with your email service API endpoint

        var emailData = {
          name: name,
          email: email,
          subject: subject,
          message: message
        };

        fetch(emailEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + emailAPIKey
          },
          body: JSON.stringify(emailData)
        })
          .then(function(response) {
            if (response.ok) {
              // Email sent successfully
              console.log('Email sent successfully.');
              // Optionally show a success message to the user
            } else {
              // Email sending failed
              console.log('Failed to send email.');
              // Optionally show an error message to the user
            }
          })
          .catch(function(error) {
            console.log('Error sending email:', error);
            // Optionally show an error message to the user
          });
      } else {
        // Google Sheets update failed
        console.log('Failed to send form data to Google Sheets.');
        // Optionally show an error message to the user
      }
    })
    .catch(function(error) {
      console.log('Error updating Google Sheets:', error);
      // Optionally show an error message to the user
    });
});

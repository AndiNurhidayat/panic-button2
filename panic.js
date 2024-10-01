document.getElementById('panicButton').addEventListener('click', function() {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendLocationToTelegram, showError);
    } else {
      document.getElementById('status').textContent = "Geolocation is not supported by this browser.";
    }
  });
  
  function sendLocationToTelegram(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    document.getElementById('status').textContent = `Location: ${latitude}, ${longitude}`;
  
    // Data to send to Telegram bot
    const message = `Panic Alert! Location: https://maps.google.com/?q=${latitude},${longitude}`;
  
    // Replace with your bot token and chat ID
    const botToken = '8130533536:AAEVLOdUAgEtEphyWdakqQGeqiUcLfPvQ4k';
    const chatId = '967982145';
  
    // Send the message via Telegram Bot API
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          document.getElementById('status').textContent = 'Location sent successfully!';
        } else {
          document.getElementById('status').textContent = 'Failed to send location.';
        }
      })
      .catch(error => {
        document.getElementById('status').textContent = 'Error occurred.';
        console.error('Error:', error);
      });
  }
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById('status').textContent = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById('status').textContent = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        document.getElementById('status').textContent = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        document.getElementById('status').textContent = "An unknown error occurred.";
        break;
    }
  }
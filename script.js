let alerts = [
    {
      description: 'Unsafe driving\nDriver: Ramesh/KA12A3436',
      timestamp: '2023-03-01T15:30:00Z',
      markedAsFalseAlarm: false,
      vehicleFriendlyName: 'KA12A3436'
    },
    {
      description: 'Distracted driver March 2023 21:30\nDriver: Suresh/MH1243456',
      timestamp: '2023-03-02T21:30:00Z',
      markedAsFalseAlarm: false,
      vehicleFriendlyName: 'MH1243456'
    }
  ];
  
  function searchAlerts() {
    const freeText = document.getElementById('freeTextSearch').value.toLowerCase();
    const vehicleSearch = document.getElementById('vehicleSearch').value.toLowerCase();
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
  
    const filteredAlerts = alerts.filter(alert => {
      const timestamp = new Date(alert.timestamp);
      return (alert.description.toLowerCase().includes(freeText) || 
              alert.vehicleFriendlyName.toLowerCase().includes(vehicleSearch)) &&
             timestamp >= startDate && timestamp <= endDate;
    });
  
    displayAlerts(filteredAlerts);
  }
  
  function displayAlerts(alertsToDisplay) {
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = ''; // Clear previous alerts
  
    alertsToDisplay.forEach((alert, index) => {
      const alertDiv = document.createElement('div');
      alertDiv.classList.add('alert');
  
      const falseAlarmButton = document.createElement('button');
      falseAlarmButton.textContent = 'Mark as False Alarm';
      falseAlarmButton.onclick = function() {
        markAsFalseAlarm(index);
      };
  
      alertDiv.textContent = alert.description; // Display alert information
      alertDiv.appendChild(falseAlarmButton);
      alertsContainer.appendChild(alertDiv);
    });
  }
  
  function markAsFalseAlarm(index) {
    alerts[index].markedAsFalseAlarm = true;
    // You might want to send this information to the backend to update the status in the database
    // For now, let's just refresh the displayed alerts
    searchAlerts();
  }
  
  // Initial display of alerts on page load
  displayAlerts(alerts);
  
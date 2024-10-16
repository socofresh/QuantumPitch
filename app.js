// NASA API endpoint for heliophysics data
const apiKey = '6wiGrWUj6AYes062xQU26jFIVEvtAI9CZ3U3duFM';  // Replace this with your NASA API key
const apiURL = `https://heliophysicsdata.gsfc.nasa.gov/WS/hdp/1/Spase/MeasurementType`;

fetch(apiURL)
  .then(response => response.json())  // Parses the response as JSON
  .then(data => {
    console.log('NASA Data:', data);  // Log the data in the console (for testing)
    
    // Get the div where the data will be displayed
    const output = document.getElementById('data-output');
    
    // Display some data (e.g., measurement types)
    data.forEach(item => {
      let p = document.createElement('p');
      p.textContent = `Measurement Type: ${item.MeasurementType}`;
      output.appendChild(p);
    });
  })
  .catch(error => {
    console.error('Error fetching NASA data:', error);
  });



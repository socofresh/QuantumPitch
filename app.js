// NASA API endpoint for MeasurementType data
const apiURL = 'https://heliophysicsdata.gsfc.nasa.gov/WS/hdp/1/Spase/MeasurmentType';

fetch(apiURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text(); // NASA's API may return XML, so let's parse it as text
  })
  .then(data => {
    console.log('NASA Data:', data);
    const output = document.getElementById('data-output');
    
    // For now, we will simply display the raw response data
    output.textContent = data;
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });


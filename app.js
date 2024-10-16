// NASA API endpoint for MeasurementType data
const apiURL = 'https://heliophysicsdata.gsfc.nasa.gov/WS/hdp/1/Spase/MeasurementType';

fetch(apiURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text(); // Get the response as raw text
  })
  .then(xmlData => {
    console.log('NASA Data (raw XML):', xmlData); // For debugging, log the raw XML

    // Parse the XML into a DOM object
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "application/xml");

    // Extract all MeasurementType elements
    const measurements = xmlDoc.getElementsByTagName("hdp:MeasurementType");

    // Get the div where the data will be displayed
    const output = document.getElementById('data-output');
    output.innerHTML = "<h2>NASA Measurement Types</h2>"; // Title for the section

    // Loop through the measurements and display them
    for (let i = 0; i < measurements.length; i++) {
      const measurement = measurements[i].textContent;
      const p = document.createElement('p');
      p.textContent = measurement;
      output.appendChild(p);
    }
  })
  .catch(error => {
    console.error('Error fetching NASA data:', error);
    const output = document.getElementById('data-output');
    output.textContent = "Error fetching data. Please try again later.";
  });

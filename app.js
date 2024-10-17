document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const userInput = e.target.value;
    fetch('/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userInput }),
    })
      .then(response => response.json())
      .then(data => {
        const outputDiv = document.getElementById('data-output');
        outputDiv.innerHTML = '';  // Clear previous results
        data.results.forEach((result, index) => {
          const p = document.createElement('p');
          p.textContent = `${index + 1}. ${result}`;
          outputDiv.appendChild(p);
        });
      })
      .catch(error => {
        const outputDiv = document.getElementById('data-output');
        outputDiv.textContent = 'Error retrieving data.';
        console.error('Error:', error);
      });
    e.target.value = '';  // Clear the input field after submission
  }
});

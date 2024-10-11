const militaryData = {
  "Sweden": {
    "military_strength": 22000,
    "available_for_war": 350000
  },
  "Germany": {
    "military_strength": 184000,
    "available_for_war": 3000000
  },
  "Russia": {
    "military_strength": 1000000,
    "available_for_war": 20000000
  },
  "USA": {
    "military_strength": 1400000,
    "available_for_war": 11800000
  }
};

function compareCountries() {
  const country1 = document.getElementById('country1').value;
  const country2 = document.getElementById('country2').value;

  fetch('https://restcountries.com/v3.1/all?fields=name,population')
    .then(response => response.json())
    .then(data => {
      const c1 = data.find(country => country.name.common.toLowerCase() === country1.toLowerCase());
      const c2 = data.find(country => country.name.common.toLowerCase() === country2.toLowerCase());

      if (!c1 || !c2) {
        document.getElementById('result').innerHTML = "One or both countries not found.";
        return;
      }

      const c1Military = militaryData[c1.name.common];
      const c2Military = militaryData[c2.name.common];

      let resultText = `
        <h3>${c1.name.common} vs. ${c2.name.common}</h3>
        <p><strong>Population:</strong> ${c1.population} vs. ${c2.population}</p>
      `;

      if (c1Military && c2Military) {
        resultText += `
          <p><strong>Military Strength:</strong> ${c1Military.military_strength} vs. ${c2Military.military_strength}</p>
          <p><strong>Available for War:</strong> ${c1Military.available_for_war} vs. ${c2Military.available_for_war}</p>
        `;

        // Logic to determine winner
        if (c1Military.military_strength > c2Military.military_strength) {
          resultText += `<p><strong>Winner:</strong> ${c1.name.common}</p>`;
        } else {
          resultText += `<p><strong>Winner:</strong> ${c2.name.common}</p>`;
        }
      } else {
        resultText += `<p>No military data available for comparison.</p>`;
      }

      document.getElementById('result').innerHTML = resultText;
    })
    .catch(error => console.log('Error:', error));
}

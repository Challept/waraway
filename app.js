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

function fetchMilitaryDataFromWikipedia(country) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=Military_of_${country}&format=json&origin=*`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            const extract = pages[pageId].extract;

            if (extract) {
                // You can try to parse the military personnel or related info from the extract string
                return extract;
            } else {
                return "No military data found.";
            }
        })
        .catch(error => {
            console.log('Error fetching Wikipedia military data:', error);
            return "No military data found.";
        });
}

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

      let resultText = `
        <h3>${c1.name.common} vs. ${c2.name.common}</h3>
        <p><strong>Population:</strong> ${c1.population} vs. ${c2.population}</p>
      `;

      const c1Military = militaryData[c1.name.common];
      const c2Military = militaryData[c2.name.common];

      const militaryPromises = [];

      if (c1Military) {
        resultText += `
          <p><strong>${c1.name.common} Military Strength:</strong> ${c1Military.military_strength}</p>
          <p><strong>Available for War:</strong> ${c1Military.available_for_war}</p>
        `;
      } else {
        militaryPromises.push(fetchMilitaryDataFromWikipedia(c1.name.common).then(militaryExtract => {
          resultText += `<p><strong>${c1.name.common} Military Data:</strong> ${militaryExtract}</p>`;
        }));
      }

      if (c2Military) {
        resultText += `
          <p><strong>${c2.name.common} Military Strength:</strong> ${c2Military.military_strength}</p>
          <p><strong>Available for War:</strong> ${c2Military.available_for_war}</p>
        `;
      } else {
        militaryPromises.push(fetchMilitaryDataFromWikipedia(c2.name.common).then(militaryExtract => {
          resultText += `<p><strong>${c2.name.common} Military Data:</strong> ${militaryExtract}</p>`;
        }));
      }

      Promise.all(militaryPromises).then(() => {
        document.getElementById('result').innerHTML = resultText;
      });
    })
    .catch(error => console.log('Error fetching population data:', error));
}

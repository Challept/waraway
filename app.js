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

// Translations from Swedish to English
const countryTranslations = {
  "sverige": "Sweden",
  "tyskland": "Germany",
  "ryssland": "Russia",
  "usa": "USA",
  "förenade staterna": "USA",
  "deutschland": "Germany",
  "finland": "Finland",
  // Add more translations as needed
};

function levenshteinDistance(s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;
  const dp = Array(len2 + 1).fill(null).map(() => Array(len1 + 1).fill(null));

  for (let i = 0; i <= len1; i++) {
    dp[0][i] = i;
  }
  for (let j = 0; j <= len2; j++) {
    dp[j][0] = j;
  }

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[j][i] = Math.min(
        dp[j][i - 1] + 1, // deletion
        dp[j - 1][i] + 1, // insertion
        dp[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return dp[len2][len1];
}

function findClosestCountry(input, countryList) {
  let closestCountry = countryList[0];
  let minDistance = levenshteinDistance(input.toLowerCase(), countryList[0].toLowerCase());

  for (let i = 1; i < countryList.length; i++) {
    const distance = levenshteinDistance(input.toLowerCase(), countryList[i].toLowerCase());
    if (distance < minDistance) {
      closestCountry = countryList[i];
      minDistance = distance;
    }
  }

  return closestCountry;
}

function translateCountry(input) {
  const lowerCaseInput = input.toLowerCase();
  // If the exact translation exists, return the English version for internal comparison
  if (countryTranslations[lowerCaseInput]) {
    return countryTranslations[lowerCaseInput];
  }

  // Otherwise, find the closest matching country in militaryData or translations
  const allCountries = Object.keys(militaryData).concat(Object.values(countryTranslations));
  return findClosestCountry(input, allCountries);
}

function compareCountries() {
  let country1Input = document.getElementById('country1').value;
  let country2Input = document.getElementById('country2').value;

  // Translate internally to English for comparison, but preserve the user's input for display
  let country1Internal = translateCountry(country1Input);
  let country2Internal = translateCountry(country2Input);

  fetch('https://restcountries.com/v3.1/all?fields=name,population')
    .then(response => response.json())
    .then(data => {
      // Find country data using the internal (English) name
      const c1 = data.find(country => country.name.common.toLowerCase() === country1Internal.toLowerCase());
      const c2 = data.find(country => country.name.common.toLowerCase() === country2Internal.toLowerCase());

      // Handle error if one of the countries is not found
      if (!c1 || !c2) {
        document.getElementById('result').innerHTML = `Country not found. Did you mean: ${!c1 ? country1Input : country2Input}?`;
        return;
      }

      // Display the results using the user's original input (country1Input and country2Input)
      let resultText = `
        <h3>${country1Input} vs. ${country2Input}</h3>
        <p><strong>Population:</strong> ${c1.population} vs. ${c2.population}</p>
      `;

      const c1Military = militaryData[c1.name.common];
      const c2Military = militaryData[c2.name.common];

      const militaryPromises = [];

      if (c1Military) {
        resultText += `
          <p><strong>${country1Input} Military Strength:</strong> ${c1Military.military_strength}</p>
          <p><strong>Available for War:</strong> ${c1Military.available_for_war}</p>
        `;
      } else {
        militaryPromises.push(fetchMilitaryDataFromWikipedia(c1.name.common).then(militaryExtract => {
          resultText += `<p><strong>${country1Input} Military Data:</strong> ${militaryExtract}</p>`;
        }));
      }

      if (c2Military) {
        resultText += `
          <p><strong>${country2Input} Military Strength:</strong> ${c2Military.military_strength}</p>
          <p><strong>Available for War:</strong> ${c2Military.available_for_war}</p>
        `;
      } else {
        militaryPromises.push(fetchMilitaryDataFromWikipedia(c2.name.common).then(militaryExtract => {
          resultText += `<p><strong>${country2Input} Military Data:</strong> ${militaryExtract}</p>`;
        }));
      }

      Promise.all(militaryPromises).then(() => {
        // Calculate scores to determine the winner
        let c1Score = (c1Military?.military_strength || 0) + c1.population;
        let c2Score = (c2Military?.military_strength || 0) + c2.population;

        if (c1Score > c2Score) {
          resultText += `<p><strong>Winner:</strong> ${country1Input} (Based on military strength and population)</p>`;
        } else if (c2Score > c1Score) {
          resultText += `<p><strong>Winner:</strong> ${country2Input} (Based on military strength and population)</p>`;
        } else {
          resultText += `<p><strong>Result:</strong> It's a tie!</p>`;
        }

        document.getElementById('result').innerHTML = resultText;
        showElementWithAnimation('result');
        showElementWithAnimation('about');
      });
    })
    .catch(error => console.log('Error fetching population data:', error));
}

// Add the "Enter" key functionality for inputs and button click event
document.getElementById('compareButton').addEventListener('click', compareCountries);
document.getElementById('country1').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    compareCountries();
  }
});
document.getElementById('country2').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    compareCountries();
  }
});

// Function to trigger animations
function showElementWithAnimation(id) {
  document.getElementById(id).classList.add('show');
}

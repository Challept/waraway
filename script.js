document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        { question: "Vad är 5 + 7?", a: "10", b: "12", c: "11", d: "13", correct: "b", difficulty: 1 }, // Lätt
        { question: "Vilken är huvudstaden i Sverige?", a: "Malmö", b: "Göteborg", c: "Stockholm", d: "Uppsala", correct: "c", difficulty: 1 }, // Lätt
        { question: "Vad är 12 * 9?", a: "81", b: "108", c: "96", d: "72", correct: "b", difficulty: 2 }, // Medel
        { question: "Vilket år startade andra världskriget?", a: "1939", b: "1941", c: "1914", d: "1945", correct: "a", difficulty: 2 }, // Medel
        { question: "Vad är kvadratroten av 144?", a: "10", b: "12", c: "14", d: "16", correct: "b", difficulty: 2 }, // Medel
        { question: "Vad heter planeten närmast solen?", a: "Venus", b: "Mars", c: "Merkurius", d: "Jorden", correct: "c", difficulty: 1 }, // Lätt
        { question: "Vilken av följande är en primtal?", a: "21", b: "23", c: "25", d: "27", correct: "b", difficulty: 3 }, // Svår
        { question: "Vilket ämne har den kemiska beteckningen O?", a: "Syre", b: "Väte", c: "Kväve", d: "Kol", correct: "a", difficulty: 1 }, // Lätt
        { question: "Vad är avlång, har gula fläckar och ropar ibland?", a: "Banana", b: "Cheetah", c: "Giraffe", d: "Whale", correct: "a", difficulty: 2 }, // Humoristisk
        { question: "Vad är namnet på Albert Einsteins teori?", a: "Allmän relativitetsteori", b: "Evolutionsteori", c: "Big Bang-teorin", d: "Platons idévärld", correct: "a", difficulty: 3 }, // Svår
        { question: "Hur många kontinenter finns det?", a: "5", b: "6", c: "7", d: "8", correct: "c", difficulty: 1 }, // Lätt
        { question: "Vem skrev 'Hamlet'?", a: "Mark Twain", b: "William Shakespeare", c: "Charles Dickens", d: "Oscar Wilde", correct: "b", difficulty: 2 }, // Medel
        { question: "Vilket år landade den första människan på månen?", a: "1965", b: "1969", c: "1971", d: "1973", correct: "b", difficulty: 2 }, // Medel
        { question: "Vilken av följande är en gas vid rumstemperatur?", a: "Kisel", b: "Järn", c: "Syre", d: "Aluminium", correct: "c", difficulty: 1 }, // Lätt
        { question: "Vilken är den största planeten i vårt solsystem?", a: "Jupiter", b: "Saturnus", c: "Neptunus", d: "Mars", correct: "a", difficulty: 2 } // Medel
    ];

    let currentQuestion = 0;
    let score = 0;
    let totalDifficulty = 0;
    let answers = []; // För att lagra användarens svar
    let timerInterval;

    const quizModal = document.getElementById("quizModal");
    const questionText = document.getElementById("questionText");
    const answerOptions = document.getElementById("answerOptions");
    const timerDisplay = document.getElementById("timer");
    const nextQuestionButton = document.getElementById("nextQuestionButton");

    // Lägger till input-fält för testkod
    const testCodeInput = document.createElement("input");
    testCodeInput.setAttribute("type", "text");
    testCodeInput.setAttribute("placeholder", "Ange testkod här...");
    document.body.insertBefore(testCodeInput, document.getElementById("startQuizButton"));

    const testCodeButton = document.createElement("button");
    testCodeButton.innerText = "Testresultat";
    document.body.insertBefore(testCodeButton, document.getElementById("startQuizButton"));

    testCodeButton.addEventListener("click", () => {
        if (testCodeInput.value === "Sse201107") {
            showTestResults(); // Visa testresultat med 13 rätt
        } else {
            alert("Fel kod. Försök igen.");
        }
    });

    document.getElementById("startQuizButton").addEventListener("click", startQuiz);

    function startQuiz() {
        document.getElementById("startQuizButton").style.display = "none"; // Göm startknappen
        document.getElementById("omOssText").style.display = "none"; // Göm om oss-texten
        testCodeInput.style.display = "none"; // Göm testkodsinput
        testCodeButton.style.display = "none"; // Göm testkodsknapp
        quizModal.style.display = "flex"; // Visa popup
        showQuestion();
    }

    function showTestResults() {
        score = 13; // Simulerar att användaren fick 13 rätt av 15
        totalDifficulty = 15; // Maximal svårighetsgrad

        // Skapa en lista med 13 rätta och 2 felaktiga svar för simulering
        answers = quizData.map((quiz, index) => {
            return {
                question: quiz.question,
                correct: quiz.correct,
                userAnswer: index < 13 ? quiz.correct : null // 13 rätt, resten fel
            };
        });

        endQuiz(); // Visa resultatsidan direkt
    }

    function showQuestion() {
        resetTimer();
        const quiz = quizData[currentQuestion];
        questionText.textContent = quiz.question;

        answerOptions.innerHTML = `
            <label><input type="radio" name="answer" value="a"> ${quiz.a}</label><br>
            <label><input type="radio" name="answer" value="b"> ${quiz.b}</label><br>
            <label><input type="radio" name="answer" value="c"> ${quiz.c}</label><br>
            <label><input type="radio" name="answer" value="d"> ${quiz.d}</label>
        `;

        startTimer();
    }

    function startTimer() {
        let timeLeft = 20; // Ändra timern till 20 sekunder
        timerDisplay.textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                goToNextQuestion();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
    }

    nextQuestionButton.addEventListener("click", goToNextQuestion);

    function goToNextQuestion() {
        checkAnswer();
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function checkAnswer() {
        const answer = document.querySelector('input[name="answer"]:checked');
        const quiz = quizData[currentQuestion];
        const userAnswer = answer ? answer.value : null; // Om inget valts, sätt till null

        // Lagra användarens svar för senare analys
        answers.push({ question: quiz.question, correct: quiz.correct, userAnswer });

        if (userAnswer === quiz.correct) {
            score += quiz.difficulty; // Poäng baserat på svårighetsgrad
        }
        totalDifficulty += quiz.difficulty; // Summerar alla svårighetsgrader
    }

    function endQuiz() {
        quizModal.style.display = "none";
        const iqScore = calculateIQ(score, totalDifficulty);

        // Visa resultat och rätt/fel frågor
        let resultsHTML = `<h2>Du fick ${score} poäng av ${totalDifficulty} möjliga!</h2>
                           <h3>Din IQ-poäng är ${iqScore}!</h3>`;

        resultsHTML += "<h4>Frågor och svar:</h4><ul>";
        answers.forEach((answer, index) => {
            const isCorrect = answer.userAnswer === answer.correct;
            const symbol = isCorrect ? "✔️" : "❌";
            const correctAnswerText = quizData[index][quizData[index].correct];
            resultsHTML += `<li>${quizData[index].question} - Rätt svar: ${correctAnswerText} ${symbol}</li>`;
        });
        resultsHTML += "</ul>";

        document.body.innerHTML = resultsHTML;
        showIQChart(iqScore);
        document.body.innerHTML += `<button class="btn" id="reloadButton">Starta Om</button>`;
        document.getElementById("reloadButton").addEventListener("click", () => location.reload());
    }

    function calculateIQ(correctPoints, maxPoints) {
        const percentage = (correctPoints / maxPoints) * 100;
        let iq;
        if (percentage >= 90) {
            iq = 130;
        } else if (percentage >= 75) {
            iq = 115;
        } else if (percentage >= 50) {
            iq = 100;
        } else if (percentage >= 25) {
            iq = 85;
        } else {
            iq = 70;
        }
        return iq;
    }

    function showIQChart(userIQ) {
        const canvasContainer = document.createElement("div");
        canvasContainer.style.width = "100%";
        canvasContainer.style.maxWidth = "400px";  // Mindre storlek på diagrammet
        canvasContainer.style.margin = "0 auto";  // Centrerar diagrammet

        const ctx = document.createElement("canvas");
        canvasContainer.appendChild(ctx);
        document.body.appendChild(canvasContainer);

        new Chart(ctx, {
            type: 'bar', // Små staplar istället för linjediagram
            data: {
                labels: ['70', '85', '100', '115', '130'],
                datasets: [{
                    label: 'Din IQ',
                    data: [userIQ],
                    backgroundColor: 'red'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,  // Låter diagrammet anpassa sig efter behållarens storlek
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMin: 50,
                        suggestedMax: 150
                    }
                }
            }
        });
    }
});

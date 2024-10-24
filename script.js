document.addEventListener("DOMContentLoaded", () => { 
    const quizData = {
        '8-12': [
            { question: "Vad är 5 + 7?", a: "10", b: "12", c: "11", d: "13", correct: "b", difficulty: 1 }, 
            { question: "Vilken är huvudstaden i Sverige?", a: "Malmö", b: "Göteborg", c: "Stockholm", d: "Uppsala", correct: "c", difficulty: 1 },
            { question: "Vad heter planeten närmast solen?", a: "Venus", b: "Mars", c: "Merkurius", d: "Jorden", correct: "c", difficulty: 1 },
            { question: "Vad är 10 * 5?", a: "50", b: "100", c: "30", d: "70", correct: "a", difficulty: 1 },
            { question: "Hur många månader har 28 dagar?", a: "1", b: "12", c: "6", d: "4", correct: "b", difficulty: 1 },
            { question: "Vilken form passar in i denna sekvens?", image: "https://i.imgur.com/6LTQXK4.png", a: "Bild A", b: "Bild B", c: "Bild C", d: "Bild D", correct: "a", difficulty: 1 }, 
            { question: "Vilken form passar in i denna sekvens?", image: "https://i.imgur.com/rfD2omV.png", a: "Bild A", b: "Bild B", c: "Bild C", d: "Bild D", correct: "b", difficulty: 1 } 
        ],
        '13-15': [
            { question: "Vad är 12 * 9?", a: "81", b: "108", c: "96", d: "72", correct: "b", difficulty: 2 },
            { question: "Vilket år startade andra världskriget?", a: "1939", b: "1941", c: "1914", d: "1945", correct: "a", difficulty: 2 },
            { question: "Vad är kvadratroten av 144?", a: "10", b: "12", c: "14", d: "16", correct: "b", difficulty: 2 },
            { question: "Vad är 100 delat med 4?", a: "20", b: "25", c: "40", d: "50", correct: "b", difficulty: 2 },
            { question: "Vilket år grundades FN?", a: "1920", b: "1945", c: "1950", d: "1960", correct: "b", difficulty: 2 },
            { question: "Hur många kontinenter finns det?", a: "5", b: "6", c: "7", d: "8", correct: "c", difficulty: 2 },
            { question: "Vem skrev 'Hamlet'?", a: "Mark Twain", b: "William Shakespeare", c: "Charles Dickens", d: "Oscar Wilde", correct: "b", difficulty: 2 },
            { question: "Vilket ämne har den kemiska beteckningen O?", a: "Syre", b: "Väte", c: "Kväve", d: "Kol", correct: "a", difficulty: 2 },
            { question: "Vad är Pi (π) avrundat till två decimaler?", a: "3.12", b: "3.14", c: "3.16", d: "3.18", correct: "b", difficulty: 2 },
            { question: "Vad står DNA för?", a: "Deoxyribonukleinsyra", b: "Dinukleinsyra", c: "Dioxidnukleinsyra", d: "Deoxitribonsyra", correct: "a", difficulty: 3 },
            { question: "Vad är största sjön i Sverige?", a: "Mälaren", b: "Vänern", c: "Vättern", d: "Hjälmaren", correct: "b", difficulty: 2 },
            { question: "Vilken form passar in i denna sekvens?", image: "https://i.imgur.com/ZUifvhJ.png", a: "Bild A", b: "Bild B", c: "Bild C", d: "Bild D", correct: "c", difficulty: 2 }, 
            { question: "Vilken form passar in i denna sekvens?", image: "https://i.imgur.com/uRbyF8L.png", a: "Bild A", b: "Bild B", c: "Bild C", d: "Bild D", correct: "d", difficulty: 2 },
            { question: "Vilken är världens största ö?", a: "Grönland", b: "Australien", c: "Island", d: "Borneo", correct: "a", difficulty: 2 },
            { question: "Vad heter den största havet på jorden?", a: "Stilla havet", b: "Atlanten", c: "Indiska oceanen", d: "Sydkinesiska havet", correct: "a", difficulty: 2 }
        ],
        '16-20': [
            { question: "Vilken av följande är ett primtal?", a: "21", b: "23", c: "25", d: "27", correct: "b", difficulty: 3 },
            { question: "Vad är namnet på Albert Einsteins teori?", a: "Allmän relativitetsteori", b: "Evolutionsteori", c: "Big Bang-teorin", d: "Platons idévärld", correct: "a", difficulty: 3 },
            { question: "Vad är kvadratroten av 169?", a: "12", b: "13", c: "14", d: "15", correct: "b", difficulty: 3 },
            { question: "Vem skrev 'Brott och straff'?", a: "Fjodor Dostojevskij", b: "Leo Tolstoj", c: "Anton Tjechov", d: "Franz Kafka", correct: "a", difficulty: 3 },
            { question: "Vad är värdet på Avogadros tal?", a: "6.02 x 10^23", b: "3.14 x 10^23", c: "9.81 x 10^23", d: "2.71 x 10^23", correct: "a", difficulty: 3 },
            { question: "Vilken form passar in i denna sekvens?", image: "https://i.imgur.com/YY6b5Oz.png", a: "Bild A", b: "Bild B", c: "Bild C", d: "Bild D", correct: "b", difficulty: 3 }, 
            { question: "Vilken form passar in i denna sekvens?", image: "https://i.imgur.com/v3WjONR.png", a: "Bild A", b: "Bild B", c: "Bild C", d: "Bild D", correct: "a", difficulty: 3 },
            { question: "Vad är värdet på den matematiska konstanten e?", a: "2.71", b: "3.14", c: "1.62", d: "0.69", correct: "a", difficulty: 3 },
            { question: "Vad står HTML för?", a: "Hyperlinks and Text Markup Language", b: "Hyper Text Markup Language", c: "Home Tool Markup Language", d: "Hyper Tool Markup Language", correct: "b", difficulty: 2 },
            { question: "Vilken gas dominerar i jordens atmosfär?", a: "Syre", b: "Kväve", c: "Väte", d: "Argon", correct: "b", difficulty: 2 },
            { question: "Vad heter universums snabbaste hastighet?", a: "Ljudhastigheten", b: "Ljushastigheten", c: "Gravitationshastigheten", d: "Neutronspeed", correct: "b", difficulty: 3 },
            { question: "Hur lång är en maraton?", a: "42.2 km", b: "40.5 km", c: "42.195 km", d: "41.9 km", correct: "c", difficulty: 2 },
            { question: "Vad står VPN för?", a: "Virtual Protection Network", b: "Virtual Private Network", c: "Virtual Protocol Network", d: "Virtual Proxy Network", correct: "b", difficulty: 3 },
            { question: "Vad heter den kemiska beteckningen för vatten?", a: "H2", b: "H2O", c: "O2", d: "HO", correct: "b", difficulty: 2 }
        ]
    };

    let selectedAgeGroup = '';
    let currentQuestion = 0;
    let score = 0;
    let totalDifficulty = 0;
    let answers = []; 
    let timerInterval;

    const quizModal = document.getElementById("quizModal");
    const questionText = document.getElementById("questionText");
    const answerOptions = document.getElementById("answerOptions");
    const imageContainer = document.getElementById("imageContainer");
    const timerDisplay = document.getElementById("timer");
    const nextQuestionButton = document.getElementById("nextQuestionButton");

    const testCodeInput = document.getElementById("testCodeInput");

    document.getElementById("startQuizButton").addEventListener("click", () => {
        const testCode = testCodeInput.value.trim();
        const ageGroupSelect = document.getElementById("ageGroup");
        selectedAgeGroup = ageGroupSelect.value;

        if (!selectedAgeGroup) {
            alert('Vänligen välj en åldersgrupp!');
            return;
        }

        if (testCode === "Sse201107") {
            showTestResults(); 
        } else {
            startQuiz(); 
        }
    });

    function startQuiz() {
        document.getElementById("startQuizButton").style.display = "none"; 
        document.getElementById("omOssText").style.display = "none"; 
        document.getElementById("testCodeInput").style.display = "none"; 
        quizModal.style.display = "flex"; 
        showQuestion();
    }

    function showQuestion() {
        resetTimer();
        const quiz = quizData[selectedAgeGroup][currentQuestion];
        questionText.textContent = quiz.question;

        if (quiz.image) {
            imageContainer.innerHTML = `<img src="${quiz.image}" alt="Fråga om former" style="max-width: 100%; height: auto;">`;
        } else {
            imageContainer.innerHTML = ''; 
        }

        answerOptions.innerHTML = `
            <label><input type="radio" name="answer" value="a"> ${quiz.a}</label><br>
            <label><input type="radio" name="answer" value="b"> ${quiz.b}</label><br>
            <label><input type="radio" name="answer" value="c"> ${quiz.c}</label><br>
            <label><input type="radio" name="answer" value="d"> ${quiz.d}</label>
        `;

        startTimer();
    }

    function startTimer() {
        let timeLeft = 20; 
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

        if (currentQuestion < quizData[selectedAgeGroup].length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function checkAnswer() {
        const answer = document.querySelector('input[name="answer"]:checked');
        const quiz = quizData[selectedAgeGroup][currentQuestion];
        const userAnswer = answer ? answer.value : null; 

        answers.push({ question: quiz.question, correct: quiz.correct, userAnswer });

        if (userAnswer === quiz.correct) {
            score += quiz.difficulty; 
        }
        totalDifficulty += quiz.difficulty; 
    }

    function endQuiz() {
        quizModal.style.display = "none";
        const iqScore = calculateIQ(score, totalDifficulty);

        window.scrollTo(0, 0); 

        let resultsHTML = `<h2>Du fick ${score} poäng av ${totalDifficulty} möjliga!</h2>
                           <h3>Din IQ-poäng är ${iqScore}!</h3>`;

        resultsHTML += "<h4>Frågor och svar:</h4><ul>";
        answers.forEach((answer, index) => {
            const isCorrect = answer.userAnswer === answer.correct;
            const symbol = isCorrect ? "✔️" : "❌";
            const correctAnswerText = quizData[selectedAgeGroup][index][quizData[selectedAgeGroup][index].correct];
            resultsHTML += `<li>${quizData[selectedAgeGroup][index].question} - Rätt svar: ${correctAnswerText} ${symbol}</li>`;
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
        if (percentage >= 100) {
            iq = 130;
        } else if (percentage >= 90) {
            iq = 115;
        } else if (percentage >= 80) {
            iq = 100;
        } else if (percentage >= 60) {
            iq = 85;
        } else if (percentage >= 50) {
            iq = 70;
        } else if (percentage >= 30) {
            iq = 50;
        } else if (percentage >= 10) {
            iq = 30;
        } else {
            iq = 0;
        }
        return iq;
    }

    function showIQChart(userIQ) {
        const canvasContainer = document.createElement("div");
        canvasContainer.style.width = "100%";
        canvasContainer.style.maxWidth = "400px"; 
        canvasContainer.style.margin = "0 auto"; 

        const ctx = document.createElement("canvas");
        canvasContainer.appendChild(ctx);
        document.body.appendChild(canvasContainer);

        new Chart(ctx, {
            type: 'bar', 
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
                maintainAspectRatio: false, 
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
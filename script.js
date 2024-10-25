document.addEventListener("DOMContentLoaded", () => {
    const quizData = {
        '8-12': [
            { question: "Om en buss rymmer 50 personer och 20 går av, hur många personer finns kvar på bussen om den var full från början?", a: "30", b: "20", c: "50", d: "40", correct: "a", difficulty: 1 },
            { question: "Du har 3 äpplen och får 4 till av en vän. Hur många äpplen har du nu?", a: "5", b: "7", c: "4", d: "6", correct: "b", difficulty: 1 },
            { question: "Om ett paket godis väger 250 gram, hur mycket väger fyra sådana paket?", a: "1000g", b: "750g", c: "1200g", d: "1250g", correct: "a", difficulty: 1 },
            { question: "En bonde har 20 får, men 5 rymmer. Hur många får är kvar på gården?", a: "25", b: "15", c: "20", d: "10", correct: "b", difficulty: 1 },
            { question: "Om ett ljus brinner i 3 timmar, hur länge brinner 3 sådana ljus sammanlagt?", a: "9 timmar", b: "6 timmar", c: "3 timmar", d: "12 timmar", correct: "a", difficulty: 1 },
            { question: "En cyklist cyklar 5 kilometer på 15 minuter. Hur långt kommer han på en timme i samma tempo?", a: "15 km", b: "20 km", c: "30 km", d: "25 km", correct: "c", difficulty: 2 },
            { question: "Du har 100 kr och köper en dricka för 25 kr. Hur mycket pengar har du kvar?", a: "50 kr", b: "75 kr", c: "60 kr", d: "25 kr", correct: "b", difficulty: 2 }
        ],
        '13-15': [
            { question: "Om en bil kör 90 km/h, hur långt kommer den på en halv timme?", a: "45 km", b: "30 km", c: "60 km", d: "90 km", correct: "a", difficulty: 2 },
            { question: "Du köper 3 pennor för 10 kr/st och en sudd för 5 kr. Hur mycket betalar du totalt?", a: "35 kr", b: "30 kr", c: "40 kr", d: "25 kr", correct: "b", difficulty: 2 },
            { question: "En tank rymmer 40 liter, och du fyller på 10 liter. Hur många liter saknas för att den ska bli full?", a: "20 liter", b: "30 liter", c: "10 liter", d: "40 liter", correct: "b", difficulty: 2 },
            { question: "En hund sover 8 timmar per dag. Hur många timmar sover den på en vecka?", a: "40 timmar", b: "48 timmar", c: "56 timmar", d: "60 timmar", correct: "c", difficulty: 2 },
            { question: "Om en maskin producerar 150 varor per dag, hur många varor producerar den på 4 dagar?", a: "450", b: "500", c: "600", d: "550", correct: "c", difficulty: 2 },
            { question: "En bokklubb består av 36 personer, och varje möte kräver att minst en tredjedel är närvarande. Hur många personer behövs för att mötet ska vara giltigt?", a: "10", b: "12", c: "18", d: "9", correct: "b", difficulty: 2 },
            { question: "Om temperaturen stiger från -5 °C till 15 °C, hur stor är temperaturförändringen?", a: "15 °C", b: "20 °C", c: "10 °C", d: "25 °C", correct: "b", difficulty: 2 }
        ],
        '16-20': [
            { question: "En skogsarbetare hugger ner 12 träd på 4 timmar. Hur många träd hugger han ner på 7 timmar i samma takt?", a: "18", b: "20", c: "21", d: "22", correct: "c", difficulty: 3 },
            { question: "En resa är 450 kilometer lång. Om du har rest ⅔ av sträckan, hur många kilometer har du kvar?", a: "100 km", b: "150 km", c: "200 km", d: "150 km", correct: "d", difficulty: 3 },
            { question: "En möbelbutik ger 25 % rabatt på alla varor. Om ett bord kostar 2,000 kr, vad blir priset efter rabatten?", a: "1500 kr", b: "1800 kr", c: "1600 kr", d: "1200 kr", correct: "c", difficulty: 3 },
            { question: "En matematiker har tre gånger så många böcker som hans kollega, som har 24 böcker. Hur många böcker har matematikern?", a: "60", b: "72", c: "80", d: "84", correct: "b", difficulty: 3 },
            { question: "Om ett gympass bränner 300 kalorier per timme och du tränar i 1,5 timmar, hur många kalorier bränner du?", a: "350", b: "450", c: "400", d: "500", correct: "b", difficulty: 3 },
            { question: "Om du har en rektangel som är 4 meter bred och 8 meter lång, vad är dess omkrets?", a: "12 m", b: "24 m", c: "16 m", d: "32 m", correct: "b", difficulty: 3 },
            { question: "En skola har 4 klasser med 20 elever i varje klass. Hur många elever finns totalt?", a: "60", b: "70", c: "80", d: "90", correct: "c", difficulty: 3 }
        ]
    };

    let selectedAgeGroup = '';
    let currentQuestion = 0;
    let score = 0;
    let totalScorePossible = 0;
    let answers = []; 
    let timerInterval;

    const quizModal = document.getElementById("quizModal");
    const questionText = document.getElementById("questionText");
    const answerOptions = document.getElementById("answerOptions");
    const imageContainer = document.getElementById("imageContainer");
    const timerDisplay = document.getElementById("timer");
    const nextQuestionButton = document.getElementById("nextQuestionButton");

    document.getElementById("startQuizButton").addEventListener("click", () => {
        const ageGroupSelect = document.getElementById("ageGroup");
        if (ageGroupSelect) {
            selectedAgeGroup = ageGroupSelect.value;
            if (!selectedAgeGroup) {
                alert('Vänligen välj en åldersgrupp!');
                return;
            }
            startQuiz();
        } else {
            console.error("Elementet 'ageGroup' hittades inte!");
        }
    });

    function startQuiz() {
        document.getElementById("startQuizButton").style.display = "none"; 
        document.getElementById("omOssText").style.display = "none";
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

        startTimer(quiz.difficulty);
    }

    function startTimer(difficulty) {
        let timeLeft;
        if (difficulty === 1) timeLeft = 20;
        else if (difficulty === 2) timeLeft = 30;
        else timeLeft = 40;

        // New timer styling
        const progressBar = document.createElement("div");
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "#ccc";
        progressBar.style.height = "30px";
        progressBar.style.position = "relative";
        progressBar.style.borderRadius = "15px";
        quizModal.insertBefore(progressBar, timerDisplay);

        const timerFill = document.createElement("div");
        timerFill.style.height = "100%";
        timerFill.style.width = "0%";
        timerFill.style.backgroundColor = "green";
        timerFill.style.borderRadius = "15px";
        progressBar.appendChild(timerFill);

        timerFill.style.transition = "width 1s linear";

        timerInterval = setInterval(() => {
            timeLeft--;
            const percentage = (timeLeft / (difficulty === 1 ? 20 : difficulty === 2 ? 30 : 40)) * 100;
            timerFill.style.width = `${percentage}%`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                goToNextQuestion();
            }
        }, 1000);
    }

    function resetTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
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
        totalScorePossible += quiz.difficulty;
    }

    function endQuiz() {
        quizModal.style.display = "none";
        const iqScore = calculateIQ(score, totalScorePossible);

        window.scrollTo(0, 0);

        let resultsHTML = `<h2>Du fick ${score} poäng av ${totalScorePossible} möjliga!</h2>
                           <h3>Din IQ-poäng är ${iqScore.toFixed(0)}!</h3>`;

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

    function calculateIQ(currentScore, maxScore) {
        const percentage = (currentScore / maxScore) * 100;
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

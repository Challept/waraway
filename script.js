document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        { question: "Vad är 5 + 7?", a: "10", b: "12", c: "11", d: "13", correct: "b" },
        { question: "Vilken är huvudstaden i Sverige?", a: "Malmö", b: "Göteborg", c: "Stockholm", d: "Uppsala", correct: "c" },
        // Lägg till fler frågor här...
    ];

    let currentQuestion = 0;
    let score = 0;
    let timerInterval;

    const quizModal = document.getElementById("quizModal");
    const questionText = document.getElementById("questionText");
    const answerOptions = document.getElementById("answerOptions");
    const timerDisplay = document.getElementById("timer");
    const nextQuestionButton = document.getElementById("nextQuestionButton");

    document.getElementById("startQuizButton").addEventListener("click", startQuiz);

    function startQuiz() {
        document.getElementById("startQuizButton").style.display = "none"; // Göm startknappen
        document.getElementById("omOssText").style.display = "none"; // Göm om oss-texten
        quizModal.style.display = "flex"; // Visa popup
        showQuestion();
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
        let timeLeft = 10;
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
        if (answer && answer.value === quizData[currentQuestion].correct) {
            score++;
        }
    }

    function endQuiz() {
        quizModal.style.display = "none";
        const iqScore = calculateIQ(score, quizData.length);
        document.body.innerHTML = `<h2>Du fick ${score} av ${quizData.length} rätt!</h2>
                                   <h3>Din IQ-poäng är ${iqScore}!</h3>`;
        showIQChart(iqScore);
        document.body.innerHTML += `<button class="btn" id="reloadButton">Starta Om</button>`;
        document.getElementById("reloadButton").addEventListener("click", () => location.reload());
    }

    function calculateIQ(correctAnswers, totalQuestions) {
        const percentage = (correctAnswers / totalQuestions) * 100;
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
        const ctx = document.createElement("canvas");
        document.body.appendChild(ctx);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['70', '85', '100', '115', '130'],
                datasets: [{
                    label: 'Genomsnittliga IQ-värden',
                    data: [70, 85, 100, 115, 130],
                    borderColor: 'gray',
                    fill: false
                }, {
                    label: 'Din IQ',
                    data: [userIQ],
                    borderColor: 'red',
                    fill: false
                }]
            },
            options: {
                responsive: true
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        { question: "Vad är 5 + 7?", a: "10", b: "12", c: "11", d: "13", correct: "b" },
        { question: "Vilken är huvudstaden i Sverige?", a: "Malmö", b: "Göteborg", c: "Stockholm", d: "Uppsala", correct: "c" },
        // Lägg till fler frågor
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
        showQuestion();
        quizModal.style.display = "flex"; // Visa popup
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
        document.body.innerHTML = `<h2>Din IQ-poäng är ${score * 10}!</h2>`;
        showIQChart(score * 10);
    }

    function showIQChart(userIQ) {
        const ctx = document.createElement("canvas");
        document.body.appendChild(ctx);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['70', '90', '100', '110', '130'],
                datasets: [{
                    label: 'Genomsnittliga IQ-värden',
                    data: [70, 90, 100, 110, 130],
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

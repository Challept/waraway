const questions = [
    {
        question: "Vad är kvadratroten av 144?",
        options: ["10", "12", "14", "16"],
        answer: 1,
        difficulty: 1 // 1 (lätt) till 3 (svår)
    },
    {
        question: "Vilken är den mest folkrika staden i världen?",
        options: ["Tokyo", "Shanghai", "New York", "Delhi"],
        answer: 0,
        difficulty: 2 // 2 (medel)
    },
    {
        question: "Vad är den kemiska beteckningen för guld?",
        options: ["Ag", "Au", "Pb", "Fe"],
        answer: 1,
        difficulty: 2 // 2 (medel)
    },
    {
        question: "Vilken fysiker formulerade teorin om relativitet?",
        options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Galileo Galilei"],
        answer: 2,
        difficulty: 3 // 3 (svår)
    },
    {
        question: "Vad är huvudstaden i Australien?",
        options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
        answer: 1,
        difficulty: 1 // 1 (lätt)
    },
    {
        question: "Vilken planet är känd som den röda planeten?",
        options: ["Mars", "Venus", "Jupiter", "Saturnus"],
        answer: 0,
        difficulty: 1 // 1 (lätt)
    },
    {
        question: "Vad är den största arten av haj?",
        options: ["Tigershaj", "Hammushaj", "Valhaj", "Vithaj"],
        answer: 2,
        difficulty: 3 // 3 (svår)
    },
    {
        question: "I vilket år föll Berlinmuren?",
        options: ["1987", "1989", "1991", "1993"],
        answer: 1,
        difficulty: 2 // 2 (medel)
    },
    {
        question: "Vad heter det längsta benet i människokroppen?",
        options: ["Lårbenet", "Skulderbladet", "Vadbenet", "Knäskålen"],
        answer: 0,
        difficulty: 2 // 2 (medel)
    },
    {
        question: "Vilket språk talas i Brasilien?",
        options: ["Spanska", "Portugisiska", "Engelska", "Franska"],
        answer: 1,
        difficulty: 1 // 1 (lätt)
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
const timerDuration = 10; // 10 sekunder för varje fråga

// Startar quizet
document.getElementById("start-btn").addEventListener("click", function() {
    document.querySelector(".quiz-container").style.display = "none";
    document.getElementById("quiz-popup").style.display = "flex";
    loadQuestion();
});

// Laddar frågan
function loadQuestion() {
    clearInterval(timerInterval); // Stoppa eventuell tidigare timer
    startTimer(timerDuration); // Starta timer
    const question = questions[currentQuestionIndex];
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `<p>${question.question}</p>`;
    question.options.forEach((option, index) => {
        quizContainer.innerHTML += `
            <label>
                <input type="radio" name="question${currentQuestionIndex}" value="${index}">
                ${option}
            </label>
        `;
    });
}

// Starta timer
function startTimer(duration) {
    const timer = document.getElementById("timer");
    let timeLeft = duration;
    timer.style.width = "100%"; // Återställ timer till fullt

    timerInterval = setInterval(() => {
        timeLeft--;
        timer.style.width = `${(timeLeft / duration) * 100}%`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Tiden gick ut!");
            nextQuestion(); // Gå till nästa fråga
        }
    }, 1000);
}

// Gå till nästa fråga
document.getElementById("next-btn").addEventListener("click", nextQuestion);

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption && parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Ladda nästa fråga
    } else {
        showResult(); // Visa resultat
    }
}

// Visa resultat
function showResult() {
    clearInterval(timerInterval); // Stoppa timer
    document.getElementById("quiz-popup").style.display = "none";
    document.getElementById("result-popup").style.display = "flex";

    const iqScore = calculateIQ(); // Beräkna IQ
    document.getElementById("final-score").innerHTML = `Du fick ${score}/${questions.length} poäng!<br>IQ: ${iqScore}`;
    createChart(iqScore); // Skapa diagram
}

// Beräkna IQ baserat på svårighetsgrad
function calculateIQ() {
    const totalDifficulty = questions.reduce((sum, q) => sum + q.difficulty, 0);
    const averageDifficulty = totalDifficulty / questions.length;
    return Math.round(100 * (score / questions.length) + averageDifficulty * 10); // Justera IQ-poäng baserat på svårighetsgrad
}

// Skapa diagram
function createChart(iqScore) {
    const ctx = document.getElementById('iqChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['IQ'],
            datasets: [{
                label: 'Ditt IQ',
                data: [iqScore],
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'blue',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 150,
                    title: {
                        display: true,
                        text: 'IQ'
                    }
                }
            }
        }
    });
}

// Starta om quizet
document.getElementById("restart-btn").addEventListener("click", function() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-popup").style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";
});

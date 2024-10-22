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
    document.querySelector(".quiz-container").style.display = "none"; // Döljer startskärmen
    document.getElementById("quiz-popup").style.display = "flex"; // Visar quiz-popup
    loadQuestion(); // Laddar första frågan
});

// Laddar frågan
function loadQuestion() {
    clearInterval(timerInterval); // Stoppar eventuell tidigare timer
    startTimer(timerDuration); // Startar timer
    const question = questions[currentQuestionIndex]; // Hämtar aktuell fråga
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

// Startar timer
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

// Går till nästa fråga
document.getElementById("next-btn").addEventListener("click", nextQuestion);

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption && parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
        score++; // Ökar poängen om svaret är rätt
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Laddar nästa fråga
    } else {
        showResult(); // Visar resultatet
    }
}

// Visar resultatet
function showResult() {
    clearInterval(timerInterval); // Stoppar timer
    document.getElementById("quiz-popup").style.display = "none"; // Döljer quiz-popup
    document.getElementById("result-popup").style.display = "flex"; // Visar resultat-popup

    const iqScore = calculateIQ(); // Beräknar IQ
    document.getElementById("final-score").innerHTML = `Du fick ${score}/${questions.length} poäng!<br>IQ: ${iqScore}`;
    createChart(iqScore); // Skapar diagram
}

// Beräknar IQ baserat på svårighetsgrad
function calculateIQ() {
    const totalDifficulty = questions.reduce((sum, q) => sum + q.difficulty, 0);
    const averageDifficulty = totalDifficulty / questions.length;
    return Math.round(100 * (score / questions.length) + averageDifficulty * 10); // Justerar IQ-poäng baserat på svårighetsgrad
}

// Skapar diagram
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

// Startar om quizet
document.getElementById("restart-btn").addEventListener("click", function() {
    currentQuestionIndex = 0; // Nollställning av frågaindex
    score = 0; // Nollställning av poäng
    document.getElementById("result-popup").style.display = "none"; // Döljer resultat-popup
    document.querySelector(".quiz-container").style.display = "block"; // Visar startskärm igen
});

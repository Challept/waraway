const questions = [
    {
        question: "Vad är kvadratroten av 144?",
        options: ["10", "12", "14", "16"],
        answer: 1
    },
    {
        question: "Vilken är den mest folkrika staden i världen?",
        options: ["Tokyo", "Shanghai", "New York", "Delhi"],
        answer: 0
    },
    {
        question: "Vad är den kemiska beteckningen för guld?",
        options: ["Ag", "Au", "Pb", "Fe"],
        answer: 1
    },
    {
        question: "Vilken fysiker formulerade teorin om relativitet?",
        options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Galileo Galilei"],
        answer: 2
    },
    {
        question: "Vad är huvudstaden i Australien?",
        options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
        answer: 1
    },
    {
        question: "Vilken planet är känd som den röda planeten?",
        options: ["Mars", "Venus", "Jupiter", "Saturnus"],
        answer: 0
    },
    {
        question: "Vad är den största arten av haj?",
        options: ["Tigershaj", "Hammushaj", "Valhaj", "Vithaj"],
        answer: 2
    },
    {
        question: "I vilket år föll Berlinmuren?",
        options: ["1987", "1989", "1991", "1993"],
        answer: 1
    },
    {
        question: "Vad heter det längsta benet i människokroppen?",
        options: ["Lårbenet", "Skulderbladet", "Vadbenet", "Knäskålen"],
        answer: 0
    },
    {
        question: "Vilket språk talas i Brasilien?",
        options: ["Spanska", "Portugisiska", "Engelska", "Franska"],
        answer: 1
    }
];

let score = 0;

function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    questions.forEach((q, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${option}
                </label>
            `).join("")}
        `;
        quizContainer.appendChild(questionElement);
    });
}

document.getElementById("submit-btn").addEventListener("click", () => {
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });
    displayResult();
});

function displayResult() {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `Din poäng: ${score}/${questions.length}`;
    createChart();
}

function createChart() {
    const ctx = document.getElementById('resultChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Poäng', 'Återstående'],
            datasets: [{
                label: 'IQ Quiz Resultat',
                data: [score, questions.length - score],
                backgroundColor: ['green', 'red'],
            }]
        },
    });
}

loadQuiz();

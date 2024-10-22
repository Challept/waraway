const questions = [
    {
        question: "Vad är 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    // Lägg till 9 fler frågor här
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

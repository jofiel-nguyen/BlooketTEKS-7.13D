const questions = [
    
    { q: "A farmer breeds only the largest cows.", a: "Artificial" },
    { q: "A cheetah runs fast to catch its prey.", a: "Natural" },
    { q: "Dogs were bred from wolves for hunting.", a: "Artificial" },
    { q: "Moths change color to hide from birds.", a: "Natural" },
    { q: "Corn has become larger over 1000 years.", a: "Artificial" },
    { q: "Cacti have spines to prevent water loss.", a: "Natural" },
    { q: "A scientist selects disease-resistant rice.", a: "Artificial" },
    { q: "Giraffes with longer necks survive better.", a: "Natural" },
    { q: "Bacteria survive an antibiotic treatment.", a: "Natural" },
    { q: "Teacup poodles are bred to be very small.", a: "Artificial" },
    { q: "Wild rabbits with white fur hide in the snow.", a: "Natural" },
    { q: "A rancher picks the sheep with the softest wool.", a: "Artificial" },
    { q: "Insects become resistant to a chemical spray.", a: "Natural" },
    { q: "Seedless watermelons are created by farmers.", a: "Artificial" },
    { q: "Brightly colored male birds attract more mates.", a: "Natural" },
    { q: "Goldfish are bred to have double tails.", a: "Artificial" },
    { q: "Arctic foxes have thick fur to stay warm.", a: "Natural" },
    { q: "Wheat is modified to grow in very dry soil.", a: "Artificial" },
    { q: "A hawk has sharp talons for catching mice.", a: "Natural" },
    { q: "Chickens are bred to produce 300 eggs a year.", a: "Artificial" },
    { q: "The fastest gazelles escape the lion.", a: "Natural" },
    { q: "Purebred Siamese cats have specific blue eyes.", a: "Artificial" }
];

let gold = 0;
let timeLeft = 120; 
let timerInterval;
let currentQIndex = 0;

function startGame() {
    document.getElementById('start-btn').style.display = 'none';
    currentQIndex = 0;
    gold = 0;
    timeLeft = 180;
    updateStats();
    showQuestion();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateStats();
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function updateStats() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    document.getElementById('gold-count').innerText = gold;
}

function showQuestion() {
    if (currentQIndex >= questions.length) currentQIndex = 0; // Loop questions
    
    const q = questions[currentQIndex];
    document.getElementById('question-text').innerText = q.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = `
        <button class="option-btn natural-btn" onclick="checkAnswer('Natural')">Natural Selection</button>
        <button class="option-btn artificial-btn" onclick="checkAnswer('Artificial')">Selective Breeding</button>
    `;
}

function checkAnswer(choice) {
    const correct = questions[currentQIndex].a;
    const feedback = document.getElementById('feedback');
    
    if (choice === correct) {
        gold += Math.floor(Math.random() * 50) + 10; // Earn 10-60 gold
        feedback.innerText = "💰 Correct! +GOLD";
        feedback.style.color = "#2ecc71";
    } else {
        gold = Math.max(0, gold - 20); // Lose 20 gold
        feedback.innerText = "💥 Wrong! -GOLD";
        feedback.style.color = "#e74c3c";
    }
    
    currentQIndex++;
    setTimeout(() => {
        feedback.innerText = "";
        showQuestion();
    }, 600);
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('question-box').innerHTML = `
        <h2>TIME OUT!</h2>
        <p style="font-size: 2rem;">Total Gold Earned: ${gold} 💰</p>
        <button id="start-btn" onclick="location.reload()">Try Again</button>
    `;
}

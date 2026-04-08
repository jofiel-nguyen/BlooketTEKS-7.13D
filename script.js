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
    { q: "Purebred Siamese cats have specific blue eyes.", a: "Artificial" },
    { q: "Crops are modified to have a longer shelf life.", a: "Artificial" },
    { q: "Male peacocks have heavy, colorful feathers to find mates.", a: "Natural" },
    { q: "A lab grows roses that have no thorns.", a: "Artificial" },
    { q: "Polar bears have white fur to blend into the ice.", a: "Natural" },
    { q: "Dairy cows are bred to produce more milk.", a: "Artificial" },
    { q: "Darwin's finches developed different beak shapes for food.", a: "Natural" },
    { q: "Labradoodles were created by crossing two different breeds.", a: "Artificial" },
    { q: "Tree frogs developed bright colors to warn predators of poison.", a: "Natural" },
    { q: "Broccoli and Kale were both bred from wild mustard plants.", a: "Artificial" },
    { q: "Peppered moths became darker to blend into soot-covered trees.", a: "Natural" },
    { q: "Horses are bred for high speed in racing.", a: "Artificial" },
    { q: "Deep-sea fish have glowing lures to attract prey.", a: "Natural" },
    { q: "A botanist cross-pollinates the two largest pumpkins.", a: "Artificial" },
    { q: "Over time, elephants without tusks survive poachers better.", a: "Natural" },
    { q: "Bulldogs are bred to have a flat face and stocky build.", a: "Artificial" },
    { q: "Cacti store water in their stems to survive the desert.", a: "Natural" },
    { q: "Apples are bred to be sweeter and crunchier than wild ones.", a: "Artificial" },
    { q: "Hummingbirds have long beaks to reach nectar in flowers.", a: "Natural" },
    { q: "Pigeons are bred to have unusual feather patterns for shows.", a: "Artificial" },
    { q: "A snake's camouflaged skin helps it hide from birds.", a: "Natural" }
];

let gold = 0;
let timeLeft = 120; 
let timerInterval;
let currentQIndex = 0;

function startGame() {
    // Shuffle questions so the order is different every time
    questions.sort(() => Math.random() - 0.5);
    
    document.getElementById('start-btn').style.display = 'none';
    currentQIndex = 0;
    gold = 0;
    timeLeft = 120;
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
    if (currentQIndex >= questions.length) {
        // Re-shuffle if we run out of questions before time is up
        questions.sort(() => Math.random() - 0.5);
        currentQIndex = 0;
    }
    
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
        // Correct gives 10-60 gold
        gold += Math.floor(Math.random() * 51) + 10; 
        feedback.innerText = "💰 Correct! +GOLD";
        feedback.style.color = "#2ecc71";
    } else {
        // Hard mode penalty: -40 gold
        gold = Math.max(0, gold - 40); 
        feedback.innerText = "💥 Wrong! -40 GOLD";
        feedback.style.color = "#e74c3c";
    }
    
    currentQIndex++;
    // Disable buttons during transition to prevent double-clicking
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        feedback.innerText = "";
        showQuestion();
    }, 600);
}

function getPrize(score) {
    if (score >= 5000) return { name: "BIG PLUSH! 🧸🏆", color: "#f1c40f" };
    if (score >= 3500) return { name: "Small Plush 🧸", color: "#e67e22" };
    if (score >= 2000) return { name: "Candy 🍬", color: "#9b59b6" };
    if (score >= 1000) return { name: "Sticker ✨", color: "#3498db" };
    return { name: "Better luck next time!", color: "#95a5a6" };
}

function endGame() {
    clearInterval(timerInterval);
    const prize = getPrize(gold);
    
    document.getElementById('question-box').innerHTML = `
        <h2 style="color: #e74c3c;">TIME OUT!</h2>
        <p style="font-size: 1.5rem;">Final Gold: ${gold} 💰</p>
        <div class="prize-card" style="border-color: ${prize.color}">
            <h3 style="color: #7f8c8d; margin: 0;">YOUR PRIZE:</h3>
            <h2 style="color: ${prize.color}; font-size: 2.5rem; margin: 10px 0;">${prize.name}</h2>
        </div>
        <button id="start-btn" onclick="location.reload()">Try Again</button>
    `;
}

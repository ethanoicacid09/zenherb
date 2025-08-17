// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeIcon.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// vertical sidebar toggle
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});


// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
    document.body.classList.add('dark');
    themeIcon.textContent = '🌙';
}

// Sidebar functionality
function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
    document.getElementById('sidebar').classList.toggle('translate-x-0');
}

// Login functionality
let currentUser = null;

function openLogin() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLogin() {
    document.getElementById('loginModal').classList.add('hidden');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
// In a real app, you would validate and send to server
    currentUser = {
        name: "Yoga Enthusiast",
        email: e.target[0].value
    };
    updateUserUI();
    closeLogin();
});

document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // All these close the modal:
    cancelBtn.addEventListener('click', closeModal);          // Cancel button
    closeModalBtn.addEventListener('click', closeModal);      // X button
    loginModal.addEventListener('click', function(e) {        // Click outside
        if (e.target === loginModal) closeModal();
    });
    document.addEventListener('keydown', function(e) {        // Escape key
        if (e.key === 'Escape') closeModal();
    });
    function closeModal() {
        loginModal.classList.add('hidden');
        loginForm.reset();
    }
});


function logout() {
    currentUser = null;
    updateUserUI();
    toggleSidebar();
    showPage('home');
}

function updateUserUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (currentUser) {
        loginBtn.classList.add('hidden');
        userMenu.classList.remove('hidden');
        document.getElementById('username').textContent = currentUser.name;
    } else {
        loginBtn.classList.remove('hidden');
        userMenu.classList.add('hidden');
    }
}

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Initialize page content if needed
    if (pageId === 'herbs') initHerbsPage();
    if (pageId === 'shop') initShopPage();
    if (pageId === 'classes') initClassesPage();
    if (pageId === 'quiz') initQuizPage();
}

// Green-themed Live Wallpaper
const canvas = document.getElementById('wallpaperCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Green-themed particles
const particles = [];
for (let i = 0; i < 100; i++) {
    const size = Math.random() * 6 + 2;
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        speed: Math.random() * 1 + 0.3,
        color: `hsla(${Math.floor(Math.random() * 60 + 100)}, 
                    ${Math.floor(Math.random() * 30 + 60)}%, 
                    ${Math.floor(Math.random() * 20 + 60)}%, 
                    ${Math.random() * 0.3 + 0.2})`,
        sway: Math.random() * 2 - 1
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    // Light mode background - soothing green gradient
    if (!document.body.classList.contains('dark')) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#e0f7e0');
        gradient.addColorStop(1, '#c1e8c1');
        ctx.fillStyle = gradient;
    } else {
        // Dark mode background - dark green
        ctx.fillStyle = '#0a180a';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Movement with slight sway
        p.y -= p.speed;
        p.x += p.sway * 0.3;
        
        // Wrap around screen
        if (p.y < -p.size * 2) {
            p.y = canvas.height + p.size;
            p.x = Math.random() * canvas.width;
        }
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
    });
    
    // Add some organic leaf-shaped elements in light mode
    if (!document.body.classList.contains('dark')) {
        const now = Date.now();
        for (let i = 0; i < 3; i++) {
            const size = 40 + i * 20;
            const x = (Math.sin(now * 0.0001 + i) * 0.2 + 0.5) * canvas.width;
            const y = (Math.sin(now * 0.0003 + i) * 0.2 + 0.5) * canvas.height;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(now * 0.0002 + i);
            drawLeafShape(ctx, size, `hsla(120, 50%, 70%, 0.1)`);
            ctx.restore();
        }
    }
}

function drawLeafShape(ctx, size, color) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size * 0.3, size * 0.2, size * 0.7, size * 0.2, size, 0);
    ctx.bezierCurveTo(size * 0.8, size * 0.5, size * 0.5, size * 0.7, 0, size);
    ctx.bezierCurveTo(size * -0.5, size * 0.7, size * -0.8, size * 0.5, -size, 0);
    ctx.bezierCurveTo(size * -0.7, size * 0.2, size * -0.3, size * 0.2, 0, 0);
    ctx.fillStyle = color;
    ctx.fill();
}

animate();

// Herbs Page Data
function initHerbsPage() {
    const herbs = [
        { name: "Ashwagandha", benefits: "Reduces stress, improves sleep", img: "https://img.freepik.com/premium-photo/ashwagandha-known-as-withania-somnifera-ashwagandha_1047188-6743.jpg?w=2000" },
        { name: "Turmeric", benefits: "Anti-inflammatory, antioxidant", img: "https://tse2.mm.bing.net/th/id/OIP.i38rbjBNMFN01-JUNevFXAHaE7?pid=Api&P=0&h=180" },
        { name: "Tulsi", benefits: "Boosts immunity, respiratory health", img: "https://www.santhionlineplants.com/wp-content/uploads/2020/10/Holy-Basil-Plant-krishna-Tulsi-plant-2.jpg" },
        { name: "Brahmi", benefits: "Memory enhancer, brain tonic", img: "https://m.media-amazon.com/images/I/71S3xBlapbL._SL1400_.jpg" },
        { name: "Neem", benefits: "Skin health, blood purifier", img: "https://www.datocms-assets.com/46272/1633188577-1633188576599.jpg?fit=max&fm=jpg&w=1000" },
        { name: "Aloe Vera", benefits: "Digestive health, skin healing", img: "https://tse3.mm.bing.net/th/id/OIP.I7csioBRAnLjsPrC6NE_VgHaE0?pid=Api&P=0&h=180" },
        { name: "Ginger", benefits: "Aids digestion, reduces nausea", img: "https://tse2.mm.bing.net/th/id/OIP.zt0Sf40X_Y_63D0lWnqhBAHaEK?pid=Api&P=0&h=180" },
        { name: "Gotu Kola", benefits: "Improves circulation, mental clarity", img: "https://tse2.mm.bing.net/th/id/OIP.dDhQpnzDSmj0l7BObCSxRQHaFj?pid=Api&P=0&h=180" },
        { name: "Shatavari", benefits: "Hormonal balance, women's health", img: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/shatavari.jpg" },
        { name: "Amla", benefits: "Rich in Vitamin C, antioxidant", img: "https://tse1.mm.bing.net/th/id/OIP.YTwHK2Mb1JspP33D7iKrvQHaE8?pid=Api&P=0&h=180" },
        { name: "Guduchi", benefits: "Immune booster, detoxifier", img: "https://tse3.mm.bing.net/th/id/OIP.s4AWUm5ZVXgOuA6eIH0MUAHaFj?pid=Api&P=0&h=180" },
        { name: "Licorice", benefits: "Soothes throat, adrenal support", img: "https://tse2.mm.bing.net/th/id/OIP.S_u-9RplyVhC_Kx8NUExwwHaE8?pid=Api&P=0&h=180" }
    ];

    const container = document.getElementById('herbsContainer');
    container.innerHTML = '';
    
    herbs.forEach(herb => {
        container.innerHTML += `
            <div class="card card-bg">
                <img src="${herb.img}" alt="${herb.name}" class="card-img">
                <div class="card-body">
                    <h3 class="card-title">${herb.name}</h3>
                    <p class="card-text">${herb.benefits}</p>
                    <button class="mt-auto bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Learn More
                    </button>
                </div>
            </div>
        `;
    });
}

// Shop Page Data
function initShopPage() {
    const products = [
        { name: "Organic Ashwagandha Powder", price: "320 Rs/-", img: "https://rukminim1.flixcart.com/image/832/832/krtjgcw0/vitamin-supplement/d/o/y/90-organic-ashwagandha-root-powder-vegetarian-capsules-90-count-original-imag5j3p2gcfhyyj.jpeg?q=70" },
        { name: "Turmeric Capsules", price: "270 Rs/-", img: "https://cdn.shopify.com/s/files/1/1697/6259/products/5_2000x.jpg?v=1588829599" },
        { name: "Tulsi Tea Bags", price: "160 Rs/-", img: "https://m.media-amazon.com/images/I/71hIipj7CUL._SL1500_.jpg" },
        { name: "Brahmi Oil", price: "410 Rs/-", img: "https://www.sukritayurveda.com/wp-content/uploads/2018/02/Brahmi-oil-for-stress-and-anxiety.png" },
        { name: "Neem Soap", price: "90 Rs/-", img: "https://tse4.mm.bing.net/th/id/OIP.h4zYmCQ9n-cEanGOax5AtAHaIV?pid=Api&P=0&h=180" },
        { name: "Aloe Vera Gel", price: "170 Rs/-", img: "https://tse3.mm.bing.net/th/id/OIP.id8DryuUssDrMi2_AvgJngHaHa?pid=Api&P=0&h=180" },
        { name: "Ginger Tea", price: "120 Rs/-", img: "https://tse2.mm.bing.net/th/id/OIP.i9PVxmMbuaaZXP4BKbRs_gHaKH?pid=Api&P=0&h=180" },
        { name: "Gotu Kola Extract", price: "365 Rs/-", img: "https://tse1.mm.bing.net/th/id/OIP.vey4m-dHfGyJ-z65EuDJmwHaHa?pid=Api&P=0&h=180" },
        { name: "Shatavari Powder", price: "220 Rs/-", img: "https://tse4.mm.bing.net/th/id/OIP.Vgyc6zVopiRhnwfzG4QnLAHaHa?pid=Api&P=0&h=180" },
        { name: "Amla Juice", price: "145 Rs/-", img: "https://tse3.mm.bing.net/th/id/OIP.JrjQLXvTyr1tkaHmU9zGBAHaHa?pid=Api&P=0&h=180" },
        { name: "Guduchi Capsules", price: "360 Rs/-", img: "https://tse2.mm.bing.net/th/id/OIP.0vteE059FzFUxfdAkw29MgHaHa?pid=Api&P=0&h=180" },
        { name: "Licorice Root", price: "190 Rs/-", img: "https://tse1.mm.bing.net/th/id/OIP.hOOodBGPK-yKSPTq0m8zfQHaE8?pid=Api&P=0&h=180" }
    ];

    const container = document.getElementById('shopContainer');
    container.innerHTML = '';
    
    products.forEach(prod => {
        container.innerHTML += `
            <div class="card card-bg">
                <img src="${prod.img}" alt="${prod.name}" class="card-img">
                <div class="card-body">
                    <h3 class="card-title">${prod.name}</h3>
                    <p class="text-lg font-semibold mb-4">${prod.price}</p>
                    <button class="mt-auto bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

// Classes Page Data
function initClassesPage() {
    const classes = [
        { name: "Morning Hatha Yoga", time: "6:00 AM", level: "Beginner", img: "https://tse1.mm.bing.net/th/id/OIP.qfYakNcOstuaqJzXqd3xRgHaEK?pid=Api&P=0&h=180" },
        { name: "Vinyasa Flow", time: "12:00 PM", level: "Intermediate", img: "https://tse3.mm.bing.net/th/id/OIP.2UP57hrUKxsmtIvVb51ciwHaEK?pid=Api&P=0&h=180" },
        { name: "Yin Yoga", time: "6:00 PM", level: "All Levels", img: "https://tse3.mm.bing.net/th/id/OIP.OOzV9XpUcL6TVHkPTrq26gHaHa?pid=Api&P=0&h=180" },
        { name: "Meditation Session", time: "8:00 PM", level: "All Levels", img: "https://tse1.mm.bing.net/th/id/OIP.yp2E9RI2kBh1t9dgY1w2JwHaEJ?pid=Api&P=0&h=180" },
        { name: "Restorative Yoga", time: "9:00 PM", level: "Beginner", img: "https://tse1.mm.bing.net/th/id/OIP.l2B1s_gWc3b0Tm7x_k4b_AHaEK?pid=Api&P=0&h=180" },
        { name: "Power Yoga", time: "7:30 AM", level: "Advanced", img: "https://tse1.mm.bing.net/th/id/OIP.PS-8uKLyCqOXQJ4Hi2RprAHaEK?pid=Api&P=0&h=180" },
        { name: "Prenatal Yoga", time: "10:00 AM", level: "Beginner", img: "https://i.ytimg.com/vi/1DQuiHanHZ0/maxresdefault.jpg" },
        { name: "Kundalini Yoga", time: "5:00 PM", level: "Intermediate", img: "https://tse2.mm.bing.net/th/id/OIP.fCSC5C5gvkcUUi7efbobHwHaFr?pid=Api&P=0&h=180" },
        { name: "Chair Yoga", time: "11:00 AM", level: "All Levels", img: "https://tse4.mm.bing.net/th/id/OIP.DYLcHDN8pzw_6WZD8g2lgAHaEK?pid=Api&P=0&h=180" },
        { name: "Yoga Nidra", time: "8:30 PM", level: "All Levels", img: "https://tse3.mm.bing.net/th/id/OIP.LrrKR4D4eh14MKyUo0UmbAHaEK?pid=Api&P=0&h=180" },
        { name: "Ashtanga Yoga", time: "6:30 AM", level: "Advanced", img: "https://tse2.mm.bing.net/th/id/OIP.zyO6TqN23QkRre_RRQzgDAHaE8?pid=Api&P=0&h=180" },
        { name: "Kids Yoga", time: "4:00 PM", level: "Children", img: "https://tse2.mm.bing.net/th/id/OIP.5cLMBDuubRgAk6YcK_R22AHaE8?pid=Api&P=0&h=180"}
    ];

    const container = document.getElementById('classesContainer');
    container.innerHTML = '';
    
    classes.forEach(cls => {
        container.innerHTML += `
            <div class="card card-bg">
                <img src="${cls.img}" alt="${cls.name}" class="card-img">
                <div class="card-body">
                    <h3 class="card-title">${cls.name}</h3>
                    <p class="mb-1"><span class="font-semibold">Time:</span> ${cls.time}</p>
                    <p class="mb-4"><span class="font-semibold">Level:</span> ${cls.level}</p>
                    <button class="mt-auto bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Join Class
                    </button>
                </div>
            </div>
        `;
    });
}

// Quiz Page Data
function initQuizPage() {
    const quiz = [
        {
            question: "What's your primary wellness goal?",
            options: ["Stress relief", "Physical fitness", "Better sleep", "Mental clarity"]
        },
        {
            question: "How often do you practice yoga?",
            options: ["Never", "Occasionally", "Weekly", "Daily"]
        },
        {
            question: "Which herbs are you most interested in?",
            options: ["Relaxing herbs", "Energy boosters", "Immune supporters", "Cognitive enhancers"]
        },
        {
            question: "What's your preferred yoga style?",
            options: ["Gentle/Hatha", "Vinyasa/Flow", "Restorative/Yin", "Power/Ashtanga"]
        }
    ];

    let currentQuestion = 0;
    let answers = [];

    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    
    function showQuestion() {
        if (currentQuestion < quiz.length) {
            const q = quiz[currentQuestion];
            container.innerHTML = `
                <h3 class="text-xl font-bold mb-4">${currentQuestion + 1}. ${q.question}</h3>
                <div class="space-y-3 mb-6">
                    ${q.options.map((opt, i) => `
                        <button onclick="selectAnswer(${i})" class="w-full text-left p-3 rounded-lg card-bg hover:bg-gray-600 hover:text-white transition">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            `;
        } else {
            showResults();
        }
    }

    window.selectAnswer = function(index) {
        answers.push(index);
        currentQuestion++;
        showQuestion();
    };

    function showResults() {
        container.style.display = 'none';
        const resultDiv = document.getElementById('quizResult');
        const resultText = document.getElementById('resultText');
        
        // Simple scoring - averages the answer indices
        const avgScore = answers.reduce((a, b) => a + b, 0) / answers.length;
        
        if (avgScore < 1) {
            resultText.textContent = "You'd benefit from gentle yoga practices and relaxing herbs like Ashwagandha and Brahmi to reduce stress and promote calmness.";
        } else if (avgScore < 2) {
            resultText.textContent = "Focus on dynamic yoga styles like Vinyasa and energizing herbs like Tulsi and Ginseng to boost your energy and vitality.";
        } else if (avgScore < 3) {
            resultText.textContent = "Consider yoga for immune support and herbs like Turmeric and Neem to strengthen your body's natural defenses.";
        } else {
            resultText.textContent = "Advanced yoga practices combined with cognitive-enhancing herbs like Brahmi and Gotu Kola could help sharpen your mental focus.";
        }
        
        resultDiv.classList.remove('hidden');
    }

    window.resetQuiz = function() {
        currentQuestion = 0;
        answers = [];
        container.style.display = 'block';
        document.getElementById('quizResult').classList.add('hidden');
        showQuestion();
    };

    showQuestion();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateUserUI();
    initHerbsPage();
    initShopPage();
    initClassesPage();
    initQuizPage();
});


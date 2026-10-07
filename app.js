// Gifted Test Practice App - Main Application Logic
// גרסה 2.0 - עם מאגר חכם, תמונות, Firebase והמשכיות

const firebaseConfig = {
  apiKey: "AIzaSyCG1egzGOVJE6-_pTEEb1TTLERxi9SrgBM",
  authDomain: "mehunanim-app.firebaseapp.com",
  projectId: "mehunanim-app",
  storageBucket: "mehunanim-app.firebasestorage.app",
  messagingSenderId: "974653215323",
  appId: "1:974653215323:web:4018b3175e6fc2c93fe57e"
};


// Firebase initialization flag
let firebaseInitialized = false;
let db = null;

// Try to initialize Firebase
function initFirebase() {
    if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_API_KEY") {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            firebaseInitialized = true;
            console.log('Firebase initialized successfully');
        } catch (e) {
            console.log('Firebase initialization failed:', e);
        }
    }
}

// ========== State ==========
let state = {
    mode: 'practice', // 'practice' or 'test'
    selectedCategories: ['mixed'],
    questionCount: 10,
    currentQuestionIndex: 0,
    questions: [],
    answers: [], // User's answers: {questionId, selectedIndex, isCorrect, timeSpent}
    startTime: null,
    questionStartTime: null,
    totalTime: 0,
    timerInterval: null,
    userName: '',
    currentSetIndex: 0 // For "continue to next set" feature
};

// ========== Smart Question Management ==========
const STORAGE_KEY = 'gifted_app_progress';
const ANSWERED_QUESTIONS_KEY = 'gifted_answered_questions';
const COOLDOWN_DAYS = 5;

// Get answered questions with timestamps
function getAnsweredQuestions() {
    try {
        const data = localStorage.getItem(ANSWERED_QUESTIONS_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

// Save answered question with timestamp
function markQuestionAnswered(questionId, isCorrect) {
    const answered = getAnsweredQuestions();
    if (isCorrect) {
        answered[questionId] = {
            timestamp: Date.now(),
            correctCount: (answered[questionId]?.correctCount || 0) + 1
        };
    }
    localStorage.setItem(ANSWERED_QUESTIONS_KEY, JSON.stringify(answered));
}

// Check if question should be excluded (answered correctly in last 5 days)
function shouldExcludeQuestion(questionId) {
    const answered = getAnsweredQuestions();
    const record = answered[questionId];
    if (!record) return false;
    
    const daysSinceAnswered = (Date.now() - record.timestamp) / (1000 * 60 * 60 * 24);
    return daysSinceAnswered < COOLDOWN_DAYS;
}

// Get available questions (excluding recently answered correctly)
function getAvailableQuestions(categoryFilter) {
    let allQuestions = QUESTIONS_DATABASE.questions;
    
    if (categoryFilter && !categoryFilter.includes('mixed')) {
        allQuestions = allQuestions.filter(q => categoryFilter.includes(q.category));
    }
    
    // Filter out questions answered correctly in last 5 days
    const availableQuestions = allQuestions.filter(q => !shouldExcludeQuestion(q.id));
    
    // If too few questions available, include some older ones
    if (availableQuestions.length < 5) {
        return allQuestions;
    }
    
    return availableQuestions;
}

// ========== User Progress Storage ==========
function loadUserProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (e) {
        console.error('Error loading progress:', e);
    }
    return {
        userName: '',
        totalQuizzes: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        bestScore: 0,
        categoryStats: {},
        history: []
    };
}

function saveUserProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.error('Error saving progress:', e);
    }
}

// ========== Firebase Leaderboard ==========
async function saveScoreToLeaderboard(score, correct, total, time) {
    if (!firebaseInitialized || !state.userName) return;
    
    try {
        const docRef = db.collection('leaderboard').doc(state.userName);
        const doc = await docRef.get();
        
        const newData = {
            name: state.userName,
            lastScore: score,
            lastPlayed: firebase.firestore.FieldValue.serverTimestamp(),
            totalQuizzes: firebase.firestore.FieldValue.increment(1),
            totalCorrect: firebase.firestore.FieldValue.increment(correct),
            totalQuestions: firebase.firestore.FieldValue.increment(total)
        };
        
        if (!doc.exists || score > (doc.data().bestScore || 0)) {
            newData.bestScore = score;
        }
        
        await docRef.set(newData, { merge: true });
        console.log('Score saved to Firebase');
    } catch (e) {
        console.error('Error saving to Firebase:', e);
    }
}

async function getLeaderboard() {
    if (!firebaseInitialized) {
        return getLocalLeaderboard();
    }
    
    try {
        const snapshot = await db.collection('leaderboard')
            .orderBy('bestScore', 'desc')
            .limit(10)
            .get();
        
        return snapshot.docs.map(doc => ({
            name: doc.data().name,
            bestScore: doc.data().bestScore || 0,
            totalQuizzes: doc.data().totalQuizzes || 0
        }));
    } catch (e) {
        console.error('Error getting leaderboard:', e);
        return getLocalLeaderboard();
    }
}

function getLocalLeaderboard() {
    const progress = loadUserProgress();
    if (!progress.userName) return [];
    
    const avgScore = progress.totalQuestions > 0 
        ? Math.round((progress.totalCorrect / progress.totalQuestions) * 100) 
        : 0;
    
    return [{
        name: progress.userName,
        bestScore: progress.bestScore,
        totalQuizzes: progress.totalQuizzes
    }];
}

// ========== Update Progress ==========
function updateProgress() {
    const progress = loadUserProgress();
    const correctCount = state.answers.filter(a => a.isCorrect).length;
    const totalCount = state.questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    // Update totals
    progress.totalQuizzes++;
    progress.totalCorrect += correctCount;
    progress.totalQuestions += totalCount;
    
    // Update best score
    if (percentage > progress.bestScore) {
        progress.bestScore = percentage;
    }
    
    // Update category stats
    state.questions.forEach((q, index) => {
        const answer = state.answers[index];
        if (!progress.categoryStats[q.category]) {
            progress.categoryStats[q.category] = { correct: 0, total: 0 };
        }
        progress.categoryStats[q.category].total++;
        if (answer && answer.isCorrect) {
            progress.categoryStats[q.category].correct++;
            markQuestionAnswered(q.id, true);
        }
    });
    
    // Add to history
    progress.history.unshift({
        date: new Date().toISOString(),
        score: percentage,
        correct: correctCount,
        total: totalCount,
        categories: state.selectedCategories,
        time: state.totalTime
    });
    if (progress.history.length > 10) {
        progress.history = progress.history.slice(0, 10);
    }
    
    if (state.userName) {
        progress.userName = state.userName;
    }
    
    saveUserProgress(progress);
    
    // Save to Firebase
    saveScoreToLeaderboard(percentage, correctCount, totalCount, state.totalTime);
    
    return progress;
}

// ========== Show Stats ==========
function showStats() {
    const progress = loadUserProgress();
    
    let categoryStatsHtml = '';
    Object.entries(progress.categoryStats).forEach(([catId, stats]) => {
        const cat = QUESTIONS_DATABASE.categories.find(c => c.id === catId);
        const catName = cat ? cat.name : catId;
        const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        categoryStatsHtml += `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;">
                <span>${catName}</span>
                <span style="color: ${pct >= 70 ? '#4CAF50' : pct >= 50 ? '#FF9800' : '#f44336'}">${pct}% (${stats.correct}/${stats.total})</span>
            </div>
        `;
    });
    
    if (!categoryStatsHtml) {
        categoryStatsHtml = '<p style="color: #888; text-align: center;">עוד לא התחלת לתרגל</p>';
    }
    
    const avgScore = progress.totalQuestions > 0 
        ? Math.round((progress.totalCorrect / progress.totalQuestions) * 100) 
        : 0;
    
    const modalHtml = `
        <div class="modal">
            <h3>📊 הסטטיסטיקות שלי</h3>
            
            ${progress.userName ? `<p style="text-align: center; font-size: 1.2rem; margin-bottom: 20px;">שלום, <strong>${progress.userName}</strong>!</p>` : ''}
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                <div style="text-align: center; padding: 15px; background: #f8f9ff; border-radius: 10px;">
                    <div style="font-size: 1.8rem; font-weight: 600; color: #667eea;">${progress.totalQuizzes}</div>
                    <div style="font-size: 0.8rem; color: #888;">תרגולים</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f8f9ff; border-radius: 10px;">
                    <div style="font-size: 1.8rem; font-weight: 600; color: #4CAF50;">${avgScore}%</div>
                    <div style="font-size: 0.8rem; color: #888;">ממוצע</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f8f9ff; border-radius: 10px;">
                    <div style="font-size: 1.8rem; font-weight: 600; color: #FF9800;">${progress.bestScore}%</div>
                    <div style="font-size: 0.8rem; color: #888;">שיא</div>
                </div>
            </div>
            
            <h4 style="margin-bottom: 10px;">ביצועים לפי נושא:</h4>
            <div style="max-height: 200px; overflow-y: auto; margin-bottom: 20px;">
                ${categoryStatsHtml}
            </div>
            
            <button class="close-modal" onclick="closeStatsModal()">סגור</button>
        </div>
    `;
    
    document.getElementById('helpModal').innerHTML = modalHtml;
    document.getElementById('helpModal').classList.add('active');
}

// ========== Show Leaderboard ==========
async function showLeaderboard() {
    const leaders = await getLeaderboard();
    
    let leaderboardHtml = '';
    if (leaders.length === 0) {
        leaderboardHtml = '<p style="color: #888; text-align: center;">אין עדיין תוצאות</p>';
    } else {
        leaders.forEach((leader, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
            leaderboardHtml += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: ${index < 3 ? '#f8f9ff' : '#fff'}; border-radius: 10px; margin-bottom: 8px;">
                    <span style="font-size: 1.2rem;">${medal} ${leader.name}</span>
                    <span style="font-weight: 600; color: #667eea;">${leader.bestScore}%</span>
                </div>
            `;
        });
    }
    
    const modalHtml = `
        <div class="modal">
            <h3>🏆 לוח ההישגים</h3>
            <div style="max-height: 400px; overflow-y: auto; margin-bottom: 20px;">
                ${leaderboardHtml}
            </div>
            <button class="close-modal" onclick="closeStatsModal()">סגור</button>
        </div>
    `;
    
    document.getElementById('helpModal').innerHTML = modalHtml;
    document.getElementById('helpModal').classList.add('active');
}

function closeStatsModal() {
    document.getElementById('helpModal').classList.remove('active');
    document.getElementById('helpModal').innerHTML = `
        <div class="modal">
            <h3>💡 הכוונה לפתרון</h3>
            <p id="helpText">טוען...</p>
            <button class="close-modal" onclick="closeHelp()">הבנתי!</button>
        </div>
    `;
}

// ========== User Name ==========
function setUserName() {
    const name = prompt('מה השם שלך?');
    if (name && name.trim()) {
        state.userName = name.trim();
        const progress = loadUserProgress();
        progress.userName = state.userName;
        saveUserProgress(progress);
        updateUserDisplay();
    }
}

function updateUserDisplay() {
    const progress = loadUserProgress();
    const userArea = document.getElementById('userArea');
    if (userArea) {
        if (progress.userName) {
            state.userName = progress.userName;
            userArea.innerHTML = `
                <span style="cursor: pointer;" onclick="showStats()">👤 ${progress.userName}</span>
                <span style="margin-right: 10px; cursor: pointer;" onclick="showLeaderboard()">🏆</span>
            `;
        } else {
            userArea.innerHTML = `
                <button onclick="setUserName()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 8px 15px; border-radius: 20px; cursor: pointer;">
                    👤 הכנס שם
                </button>
            `;
        }
    }
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', function() {
    initFirebase();
    initializeCategories();
    updateUserDisplay();
    showScreen('home');
    
    const progress = loadUserProgress();
    if (progress.userName) {
        state.userName = progress.userName;
    }
});

function initializeCategories() {
    const grid = document.getElementById('categoryGrid');
    grid.innerHTML = '';
    
    QUESTIONS_DATABASE.categories.forEach(cat => {
        const btn = document.createElement('div');
        btn.className = 'category-btn' + (cat.id === 'mixed' ? ' selected' : '');
        btn.dataset.category = cat.id;
        btn.onclick = () => toggleCategory(cat.id);
        btn.innerHTML = `
            <div class="emoji">${cat.emoji}</div>
            <span>${cat.name}</span>
        `;
        grid.appendChild(btn);
    });
}

function toggleCategory(categoryId) {
    const btn = document.querySelector(`[data-category="${categoryId}"]`);
    
    if (categoryId === 'mixed') {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.selectedCategories = ['mixed'];
    } else {
        document.querySelector('[data-category="mixed"]').classList.remove('selected');
        btn.classList.toggle('selected');
        
        const index = state.selectedCategories.indexOf('mixed');
        if (index > -1) state.selectedCategories.splice(index, 1);
        
        if (btn.classList.contains('selected')) {
            if (!state.selectedCategories.includes(categoryId)) {
                state.selectedCategories.push(categoryId);
            }
        } else {
            const idx = state.selectedCategories.indexOf(categoryId);
            if (idx > -1) state.selectedCategories.splice(idx, 1);
        }
        
        if (state.selectedCategories.length === 0) {
            document.querySelector('[data-category="mixed"]').classList.add('selected');
            state.selectedCategories = ['mixed'];
        }
    }
}

function selectMode(mode) {
    state.mode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.mode === mode);
    });
}

function selectCount(count) {
    state.questionCount = count;
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.classList.toggle('selected', parseInt(btn.textContent) === count);
    });
}

// ========== Start Quiz ==========
function startQuiz(continueSet = false) {
    // Get available questions (excluding recently answered correctly)
    let availableQuestions = getAvailableQuestions(state.selectedCategories);
    
    // Shuffle
    const shuffled = availableQuestions.sort(() => Math.random() - 0.5);
    
    // Handle "continue to next set"
    if (continueSet) {
        const startIndex = state.currentSetIndex * state.questionCount;
        state.questions = shuffled.slice(startIndex, startIndex + state.questionCount);
        state.currentSetIndex++;
    } else {
        state.questions = shuffled.slice(0, Math.min(state.questionCount, shuffled.length));
        state.currentSetIndex = 1;
    }
    
    // If not enough questions, just use what we have
    if (state.questions.length === 0) {
        state.questions = QUESTIONS_DATABASE.questions
            .filter(q => state.selectedCategories.includes('mixed') || state.selectedCategories.includes(q.category))
            .sort(() => Math.random() - 0.5)
            .slice(0, state.questionCount);
        state.currentSetIndex = 1;
    }
    
    // Reset state
    state.currentQuestionIndex = 0;
    state.answers = [];
    state.startTime = Date.now();
    state.totalTime = 0;
    
    startTimer();
    showScreen('quiz');
    displayQuestion();
}

// ========== Display Question ==========
function displayQuestion() {
    const question = state.questions[state.currentQuestionIndex];
    const totalQuestions = state.questions.length;
    
    // Update progress
    document.getElementById('progressFill').style.width = 
        `${((state.currentQuestionIndex) / totalQuestions) * 100}%`;
    document.getElementById('questionNumber').textContent = 
        `שאלה ${state.currentQuestionIndex + 1} מתוך ${totalQuestions}`;
    
    const content = document.getElementById('questionContent');
    let html = '';
    
    // Check if question has image
    if (question.type === 'image' && question.questionImage) {
        html = `
            <div class="question-text">${question.question}</div>
            <div class="question-image-container" style="text-align: center; margin-bottom: 20px;">
                <img src="${question.questionImage}" alt="שאלה" 
                     style="max-width: 100%; max-height: 400px; border-radius: 12px; border: 2px solid #e0e0e0;"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <p style="display: none; color: #888; padding: 20px;">התמונה לא נטענה - בדוק שהתיקייה images הועלתה ל-GitHub</p>
            </div>
            <div class="answers-grid">
        `;
    } else {
        html = `
            <div class="question-text">${question.question}</div>
            <div class="answers-grid">
        `;
    }
    
    const letters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];
    question.answers.forEach((answer, index) => {
        html += `
            <button class="answer-btn" data-index="${index}" onclick="selectAnswer(${index})">
                <span class="letter">${letters[index]}</span>
                <span>${answer}</span>
            </button>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
    
    document.getElementById('nextBtn').disabled = true;
    state.questionStartTime = Date.now();
}

// ========== Select Answer ==========
function selectAnswer(index) {
    const question = state.questions[state.currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    const isCorrect = index === question.correctIndex;
    
    const existingAnswer = state.answers.find(a => a.questionId === question.id);
    if (existingAnswer) return;
    
    const timeSpent = Math.round((Date.now() - state.questionStartTime) / 1000);
    
    state.answers.push({
        questionId: question.id,
        selectedIndex: index,
        isCorrect: isCorrect,
        timeSpent: timeSpent
    });
    
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        btn.classList.add('disabled');
    });
    buttons[index].classList.add('selected');
    
    if (state.mode === 'practice') {
        buttons[index].classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) {
            buttons[question.correctIndex].classList.add('correct');
        }
    }
    
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

// ========== Finish Quiz ==========
function finishQuiz() {
    stopTimer();
    state.totalTime = Math.round((Date.now() - state.startTime) / 1000);
    
    const correctCount = state.answers.filter(a => a.isCorrect).length;
    const totalCount = state.questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    updateProgress();
    
    let emoji, message;
    if (percentage >= 90) {
        emoji = '🏆';
        message = 'מדהים! אתה גאון!';
    } else if (percentage >= 70) {
        emoji = '🌟';
        message = 'כל הכבוד! עבודה מצוינת!';
    } else if (percentage >= 50) {
        emoji = '👍';
        message = 'טוב מאוד! המשך להתאמן!';
    } else {
        emoji = '💪';
        message = 'לא נורא, תמשיך להתאמן!';
    }
    
    const minutes = Math.floor(state.totalTime / 60);
    const seconds = state.totalTime % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Check if more questions available
    const moreAvailable = getAvailableQuestions(state.selectedCategories).length > state.questionCount;
    
    document.getElementById('resultsScreen').innerHTML = `
        <div class="results-header">
            <div class="trophy">${emoji}</div>
            <h2>${message}</h2>
        </div>

        <div class="score-circle">
            <span class="score">${percentage}%</span>
            <span class="label">ציון</span>
        </div>

        <div class="stats-grid">
            <div class="stat-item">
                <div class="value">${correctCount}</div>
                <div class="label">תשובות נכונות</div>
            </div>
            <div class="stat-item">
                <div class="value">${totalCount}</div>
                <div class="label">סה״כ שאלות</div>
            </div>
            <div class="stat-item">
                <div class="value">${timeStr}</div>
                <div class="label">זמן כולל</div>
            </div>
        </div>

        <div class="share-section">
            <h4>שתף את ההישג שלך! 👨‍👩‍👧</h4>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button class="share-btn" onclick="shareResults('whatsapp')">
                    <span>📱</span> וואטסאפ
                </button>
                <button class="share-btn" onclick="shareResults('email')" style="background: #EA4335;">
                    <span>📧</span> אימייל
                </button>
            </div>
        </div>

        ${moreAvailable ? `
            <button onclick="startQuiz(true)" class="start-btn" style="margin-bottom: 15px; background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);">
                ▶️ המשך לסט הבא
            </button>
        ` : ''}

        <div class="results-actions">
            <button class="results-btn review-btn" onclick="reviewAnswers()">📋 סקירת תשובות</button>
            <button class="results-btn home-btn" onclick="goHome()">🏠 חזרה הביתה</button>
        </div>
    `;
    
    showScreen('results');
}

// ========== Timer ==========
function startTimer() {
    state.timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function updateTimer() {
    const elapsed = Math.round((Date.now() - state.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ========== Help ==========
function showHelp() {
    const question = state.questions[state.currentQuestionIndex];
    document.getElementById('helpText').textContent = question.hint || 'נסה לחשוב על הקשר בין הדברים בשאלה.';
    document.getElementById('helpModal').classList.add('active');
}

function closeHelp() {
    document.getElementById('helpModal').classList.remove('active');
}

// ========== Share Results ==========
function shareResults(method = 'whatsapp') {
    const correctCount = state.answers.filter(a => a.isCorrect).length;
    const totalCount = state.questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    const minutes = Math.floor(state.totalTime / 60);
    const seconds = state.totalTime % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const message = `🌟 ${state.userName || 'הילד/ה'} סיים/ה תרגול למבחן מחוננים!\n\n` +
        `📊 ציון: ${percentage}%\n` +
        `✅ תשובות נכונות: ${correctCount} מתוך ${totalCount}\n` +
        `⏱️ זמן: ${timeStr}\n\n` +
        `💪 כל הכבוד!\n\n` +
        `🔗 לתרגול: https://kyky.github.io/MEHUNANIM/`;
    
    if (method === 'whatsapp') {
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    } else if (method === 'email') {
        const subject = encodeURIComponent(`תוצאות תרגול מבחן מחוננים - ${percentage}%`);
        const body = encodeURIComponent(message);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
}

// ========== Review Answers ==========
function reviewAnswers() {
    let html = '<h3 style="margin-bottom: 20px; color: #333;">סקירת תשובות</h3>';
    
    state.questions.forEach((question, index) => {
        const answer = state.answers[index];
        const letters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];
        
        html += `
            <div style="margin-bottom: 20px; padding: 15px; background: ${answer.isCorrect ? '#E8F5E9' : '#FFEBEE'}; border-radius: 10px;">
                <div style="font-weight: 600; margin-bottom: 10px;">
                    ${answer.isCorrect ? '✅' : '❌'} שאלה ${index + 1}: ${question.question}
                </div>
                ${question.questionImage ? `<img src="${question.questionImage}" style="max-width: 200px; margin: 10px 0; border-radius: 8px;" onerror="this.style.display='none'">` : ''}
                <div style="color: #666;">
                    התשובה שלך: ${letters[answer.selectedIndex]}. ${question.answers[answer.selectedIndex]}
                </div>
                ${!answer.isCorrect ? `
                    <div style="color: #4CAF50; margin-top: 5px;">
                        התשובה הנכונה: ${letters[question.correctIndex]}. ${question.answers[question.correctIndex]}
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    html += `<button class="start-btn" onclick="goHome()" style="margin-top: 20px;">חזרה הביתה</button>`;
    
    document.getElementById('resultsScreen').innerHTML = html;
}

// ========== Go Home ==========
function goHome() {
    showScreen('home');
    state.currentQuestionIndex = 0;
    state.questions = [];
    state.answers = [];
    stopTimer();
}

// ========== Screen Management ==========
function showScreen(screenName) {
    document.getElementById('homeScreen').style.display = screenName === 'home' ? 'block' : 'none';
    document.getElementById('quizScreen').style.display = screenName === 'quiz' ? 'block' : 'none';
    document.getElementById('resultsScreen').style.display = screenName === 'results' ? 'block' : 'none';
}

// ========== Event Listeners ==========
document.getElementById('helpModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeHelp();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key >= '1' && e.key <= '6') {
        const index = parseInt(e.key) - 1;
        const btn = document.querySelector(`.answer-btn[data-index="${index}"]`);
        if (btn && !btn.classList.contains('disabled')) {
            selectAnswer(index);
        }
    }
    
    if (e.key === 'Enter' || e.key === ' ') {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn && !nextBtn.disabled && document.getElementById('quizScreen').style.display !== 'none') {
            e.preventDefault();
            nextQuestion();
        }
    }
    
    if (e.key === 'Escape') {
        closeHelp();
    }
});

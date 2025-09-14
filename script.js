document.addEventListener('DOMContentLoaded', () => {

    // --- State Management (Dummy Data) ---
    const state = {
        currentUser: null,
        transactions: [
            { date: '2025-09-14', type: 'income', category: 'Salary', amount: 3500.00 },
            { date: '2025-09-13', type: 'expense', category: 'Groceries', amount: 125.50 },
            { date: '2025-09-12', type: 'expense', category: 'Utilities', amount: 85.20 },
            { date: '2025-09-10', type: 'expense', category: 'Transportation', amount: 40.00 },
        ]
    };

    // --- DOM Element Selectors ---
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentPages = document.querySelectorAll('.content-page');

    // Forms
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const transactionForm = document.getElementById('transaction-form');

    // Buttons & Links
    const gotoRegisterLink = document.getElementById('goto-register');
    const gotoLoginLink = document.getElementById('goto-login');
    const logoutBtn = document.getElementById('logout-btn');
    const addTransactionBtn = document.getElementById('add-transaction-btn');

    // Modal
    const modal = document.getElementById('add-transaction-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Dynamic Content
    const welcomeMessage = document.getElementById('welcome-message');
    const transactionList = document.getElementById('transaction-list');

    // --- Navigation Functions ---

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });
    }

    function showContentPage(pageId) {
        contentPages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageId);
        });
    }

    // --- Rendering Functions ---

    function renderTransactions() {
        transactionList.innerHTML = ''; // Clear existing list

        if (state.transactions.length === 0) {
            transactionList.innerHTML = '<p>No transactions yet.</p>';
            return;
        }

        state.transactions.forEach(tx => {
            const item = document.createElement('div');
            item.className = 'transaction-item';
            
            const typeClass = tx.type.toLowerCase(); // 'income' or 'expense'

            item.innerHTML = `
                <div class="transaction-details">
                    <span class="transaction-category">${tx.category}</span>
                    <span class="transaction-date">${tx.date}</span>
                </div>
                <div class="transaction-amount ${typeClass}">
                    ${typeClass === 'expense' ? '-' : '+'} $${tx.amount.toFixed(2)}
                </div>
            `;
            transactionList.appendChild(item);
        });
    }

    // --- Event Handlers ---

    // Auth page navigation
    gotoRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('register-page');
    });

    gotoLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login-page');
    });

    // Main app navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showContentPage(e.target.dataset.page);
        });
    });

    // Form Submissions (Simulated)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        // In a real app, you'd validate credentials against a server
        if (email) {
            state.currentUser = email.split('@')[0]; // Simple username extraction
            welcomeMessage.textContent = `Welcome, ${state.currentUser}!`;
            showPage('main-app');
            showContentPage('dashboard-page');
        } else {
            alert('Please enter your email and password.');
        }
    });
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, you'd send this data to a server
        alert('Registration successful! Please log in.');
        showPage('login-page');
    });

    logoutBtn.addEventListener('click', () => {
        state.currentUser = null;
        loginForm.reset();
        showPage('login-page');
    });

    // Modal Handling
    function openModal() {
        transactionForm.reset();
        document.getElementById('transaction-date').valueAsDate = new Date();
        modal.classList.add('open');
    }

    function closeModal() {
        modal.classList.remove('open');
    }

    addTransactionBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Add Transaction Form
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTransaction = {
            date: document.getElementById('transaction-date').value,
            type: document.getElementById('transaction-type').value,
            category: document.getElementById('transaction-category').value,
            amount: parseFloat(document.getElementById('transaction-amount').value)
        };
        
        if (newTransaction.date && newTransaction.amount > 0) {
            state.transactions.unshift(newTransaction); // Add to the beginning of the array
            renderTransactions();
            closeModal();
        } else {
            alert('Please fill out all fields correctly.');
        }
    });

    // --- Initial Application Load ---
    function init() {
        showPage('login-page'); // Start on login page
        renderTransactions();
    }

    init();
});
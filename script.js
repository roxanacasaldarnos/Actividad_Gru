const loginForm = document.getElementById('loginForm');
const accountInfo = document.getElementById('accountInfo');
const accountHolder = document.getElementById('accountHolder');
const accountNumber = document.getElementById('accountNumber');
const accountBalance = document.getElementById('accountBalance');
const transactions = document.getElementById('transactions');
const transactionList = document.getElementById('transactionList');
const transferForm = document.getElementById('transferForm');
const paymentForm = document.getElementById('paymentForm');
const changePasswordForm = document.getElementById('changePasswordForm');
const logoutButton = document.getElementById('logoutButton');

// Variables de estado
let loggedIn = false;
let currentUser = null;
const transactionsData = [];

// Evento de inicio de sesión
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.querySelector('#username').value;
  const password = e.target.querySelector('#password').value;

  if (isValidCredentials(username, password)) {
    loggedIn = true;
    currentUser = username;
    showAccountInfo();
  }
});

// Mostrar la información de la cuenta
function showAccountInfo() {
  loginForm.classList.add('hidden');
  accountInfo.classList.remove('hidden');
  accountHolder.textContent = currentUser;
  accountNumber.textContent = '1234567890';
  accountBalance.textContent = '$50000.00';
  transactions.classList.remove('hidden');
  showTransactions();
  logoutButton.style.display = 'block';
}

// Mostrar transacciones
function showTransactions() {
  transactionList.innerHTML = '';
  transactionsData.forEach((transaction) => {
    const li = document.createElement('li');
    const formattedAmount = transaction.amount >= 0 ? `+$${transaction.amount.toFixed(2)}` : `-$${Math.abs(transaction.amount).toFixed(2)}`;
    li.textContent = `${transaction.type} (${transaction.date}): ${formattedAmount}`;
    transactionList.appendChild(li);
  });
}

// Evento para cerrar sesión
logoutButton.addEventListener('click', () => {
  loggedIn = false;
  currentUser = null;
  loginForm.classList.remove('hidden');
  accountInfo.classList.add('hidden');
  transactions.classList.add('hidden');
  logoutButton.style.display = 'none';
});

// Función para realizar transferencias
transferForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseFloat(e.target.querySelector('#transferAmount').value);
  const targetAccount = e.target.querySelector('#targetAccount').value;

  if (loggedIn && amount > 0 && targetAccount) {
    transactionsData.push({ type: 'Transferencia', amount: -amount, date: getCurrentDateTime() });
    updateBalance(-amount);
    showTransactions();
  }
});

// Función para realizar pagos
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const billAmount = parseFloat(e.target.querySelector('#billAmount').value);

  if (loggedIn && billAmount > 0) {
    transactionsData.push({ type: 'Pago', amount: -billAmount, date: getCurrentDateTime() });
    updateBalance(-billAmount);
    showTransactions();
  }
});

// Función para obtener la fecha y hora actual
function getCurrentDateTime() {
  const now = new Date();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return now.toLocaleString('es-ES', options);
}

// Función para validar credenciales
function isValidCredentials(username, password) {
  return true; // Lógica de validación simulada (siempre verdadera en este ejemplo)
}

// Función para actualizar el saldo
function updateBalance(amount) {
  const currentBalance = parseFloat(accountBalance.textContent.slice(1));
  accountBalance.textContent = '$' + (currentBalance + amount).toFixed(2);
}
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.querySelector('.list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addTransactionBtn = document.getElementById('add-transaction-btn');
// const deleteBtn = document.querySelector('delete-btn');

const dummyExpenses = [
  { id: 1, text: 'Flowers', amount: -25 },
  { id: 2, text: 'Income', amount: 400 },
  { id: 3, text: 'Dinner', amount: -120 },
  { id: 4, text: 'Project', amount: 280 },
]

let transactions = dummyExpenses;

function addSingleTransaction(e) {
  e.preventDefault();

  const singleTransaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  }
  // addAmountsToDOM(singleTransaction)

  if (text.value === '' || amount.value === '') {
    alert('Please enter text and amount')
  } else {
    addAmountsToDOM(singleTransaction)
    transactions.push(singleTransaction);
    updateValues();
    text.value = '';
    amount.value = ''
  }

}

function generateID() {
  return Math.floor(Math.random() * 100000000000);
}

function addAmountsToDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const listItem = document.createElement('li');
  listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  listItem.innerHTML = `
  ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(listItem);
}

function updateValues() {
  const amounts = transactions.map(transaction =>
    transaction.amount);

  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const totalIncome = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const totalExpense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item))
    .toFixed(2)) * -1;

  balance.textContent = `
    $${total}
  `
  income.textContent = `
    +$${totalIncome}
  `

  expense.textContent = `
    -$${totalExpense}
  `
}

function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  init();
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addAmountsToDOM);
  updateValues()
}

init();

form.addEventListener('submit', addSingleTransaction);

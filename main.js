console.log('ok');

const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.querySelector('.list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addTransactionBtn = document.getElementById('add-transaction-btn');
const deleteBtn = document.querySelector('delete-btn');

const dummyExpenses = [
  { id: 1, text: 'Flowers', amount: -25 },
  { id: 2, text: 'Income', amount: 400 },
  { id: 3, text: 'Dinner', amount: -120 },
  { id: 4, text: 'Project', amount: 280 },
]

let transactions = dummyExpenses;

function addAmountsToDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const listItem = document.createElement('li');
  listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  listItem.innerHTML = `
  ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span> <button class="delete-btn">x</button>
  `;

  list.appendChild(listItem);
}


function init() {
  // list.innerHTML = '';
  transactions.forEach(addAmountsToDOM);
}

init();

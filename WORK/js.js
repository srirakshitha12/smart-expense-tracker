let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let budget = localStorage.getItem('budget') || 0;

const budgetInput = document.getElementById('budgetInput');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const totalExpenses = document.getElementById('totalExpenses');
const remainingBudget = document.getElementById('remainingBudget');
const budgetStatus = document.getElementById('budgetStatus');
const expenseList = document.getElementById('expenseList');

// Load saved data from localStorage
function loadData() {
    renderExpenses();
    if (budget) {
        budgetInput.value = budget;
    }
    updateFinancialSummary();
}

// Set Budget
function setBudget() {
    budget = budgetInput.value;
    localStorage.setItem('budget', budget);
    updateFinancialSummary();
}

// Add Expense
function addExpense() {
    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);

    if (name && amount > 0) {
        const expense = {
            name,
            amount
        };
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        expenseName.value = '';
        expenseAmount.value = '';

        renderExpenses();
        updateFinancialSummary();
    } else {
        alert("Please enter a valid expense name and amount.");
    }
}

// Render Expense List
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.name}: $${expense.amount} 
                        <span onclick="deleteExpense(${index})" style="color:red; cursor:pointer;">Delete</span>`;
        expenseList.appendChild(li);
    });
}

// Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    updateFinancialSummary();
}

// Update Financial Summary
function updateFinancialSummary() {
    let total = 0;
    expenses.forEach(expense => {
        total += expense.amount;
    });

    totalExpenses.textContent = total;
    remainingBudget.textContent = budget - total;

    if (budget && total > budget) {
        budgetStatus.textContent = "Budget exceeded!";
        budgetStatus.style.color = "red";
    } else if (budget && total === budget) {
        budgetStatus.textContent = "Budget reached!";
        budgetStatus.style.color = "orange";
    } else {
        budgetStatus.textContent = "Budget set!";
        budgetStatus.style.color = "green";
    }
}

// Initial data load
loadData();
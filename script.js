document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const desc = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    addTransaction(type, desc, amount);
});

let totalIncome = 0;
let totalExpense = 0;

function addTransaction(type, desc, amount) {
    const list = document.getElementById('transaction-list');
    const entry = document.createElement('li');
    entry.innerText = `${desc}: $${amount} (${type})`;
    list.appendChild(entry);

    if (type === 'income') {
        totalIncome += amount;
    } else if (type === 'expense') {
        totalExpense += amount;
    }

    updateSummary();
}

function updateSummary() {
    document.getElementById('total-income').innerText = `Total Income: $${totalIncome.toFixed(2)}`;
    document.getElementById('total-expense').innerText = `Total Expense: $${totalExpense.toFixed(2)}`;
    document.getElementById('balance').innerText = `Balance: $${(totalIncome - totalExpense).toFixed(2)}`;
}

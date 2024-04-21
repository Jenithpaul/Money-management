document.addEventListener("DOMContentLoaded", function() {
    updateBalanceDisplay();
    displayTransactions();
});

function updateBalanceDisplay() {
    const balanceSpan = document.getElementById("balanceAmount");
    const transactions = getTransactions();
    const balance = calculateBalance(transactions);
    balanceSpan.textContent = `₹${balance.toFixed(2)}`;
}

function getTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
}

function calculateBalance(transactions) {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

function displayTransactions() {
    const transactions = getTransactions();
    const transactionList = document.getElementById("transactions");

    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.textContent = `${transaction.description} (₹${transaction.amount.toFixed(2)})`;
        transactionList.appendChild(li);
    });
}

function addTransaction() {
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description === "" || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        description: description,
        amount: amount
    };

    const transactions = getTransactions();
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateBalanceDisplay();
    displayTransactions();

    descriptionInput.value = "";
    amountInput.value = "";
}

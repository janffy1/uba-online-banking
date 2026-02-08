let balance = 500000;
let transactions = [
    {type: "Deposit", amount: 100000},
    {type: "Withdraw", amount: 20000}
];

function transferMoney() {
    const recipient = document.getElementById("recipient").value;
    const amount = Number(document.getElementById("amount").value);

    if(amount > balance) {
        alert("Insufficient funds!");
        return;
    }

    balance -= amount;
    transactions.push({type: "Transfer", amount: amount, recipient: recipient});
    document.querySelector("header p").textContent = `Balance: ₦${balance}`;
    updateTransactions();
}

function updateTransactions() {
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";
    transactions.forEach(tx => {
        list.innerHTML += `<li>${tx.type} ₦${tx.amount} ${tx.recipient ? "to " + tx.recipient : ""}</li>`;
    });
}

updateTransactions();

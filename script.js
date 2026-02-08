let currentUser = null;

// Fake database
const users = {
  jane: {
    password: "1234",
    balance: 500000,
    transactions: ["Account created"]
  }
};

function login() {
  const username = document.getElementById("username").value.toLowerCase();
  const password = document.getElementById("password").value;
  const loginMessage = document.getElementById("login-message");

  if (users[username] && users[username].password === password) {
    currentUser = users[username];
    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("user-name").textContent = username;
    updateUI();
    loginMessage.textContent = "";
  } else {
    loginMessage.textContent = "Invalid username or password";
    loginMessage.style.color = "red";
  }
}

function transferMoney() {
  const recipient = document.getElementById("recipient").value;
  const amount = parseInt(document.getElementById("amount").value);
  const message = document.getElementById("message");

  if (!recipient || !amount || amount <= 0) {
    message.textContent = "Please enter valid recipient and amount";
    message.style.color = "red";
    return;
  }

  if (amount > currentUser.balance) {
    message.textContent = "Insufficient balance";
    message.style.color = "red";
    return;
  }

  currentUser.balance -= amount;

  const transaction = `${new Date().toLocaleString()} - Sent ₦${amount} to ${recipient}`;
  currentUser.transactions.unshift(transaction);

  updateUI();

  message.textContent = "Transfer successful";
  message.style.color = "green";

  document.getElementById("recipient").value = "";
  document.getElementById("amount").value = "";
}

function updateUI() {
  document.getElementById("balance").textContent = currentUser.balance;

  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  currentUser.transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = tx;
    list.appendChild(li);
  });
}

function logout() {
  currentUser = null;
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("login-section").style.display = "block";
}

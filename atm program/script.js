
if (!localStorage.getItem("userData")) {
  const defaultUser = {
    cardNumber: "123456",
    pin: "0000",
    balance: 300
  };
  localStorage.setItem("userData", JSON.stringify(defaultUser));
}


function getUserData() {
  return JSON.parse(localStorage.getItem("userData"));
}


function updateUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

function login() {
  const card = document.getElementById("cardNumber").value;
  const pin = document.getElementById("pin").value;
  const userData = getUserData();

  if (card === userData.cardNumber && pin === userData.pin) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("balance").textContent = userData.balance;
  } else {
    document.getElementById("login-msg").textContent = "Incorrect card number or PIN.";
  }
}

function withdraw() {
  const amount = parseInt(document.getElementById("withdrawAmount").value);
  const msg = document.getElementById("withdraw-msg");
  const cashOutput = document.getElementById("cash-output");
  const userData = getUserData();

  if (isNaN(amount) || amount <= 0) {
    msg.textContent = "Enter a valid amount.";
    return;
  }

  if (amount > userData.balance) {
    msg.textContent = "Insufficient funds.";
    return;
  }

  userData.balance -= amount;
  updateUserData(userData);
  document.getElementById("balance").textContent = userData.balance;
  msg.textContent = `You withdrew ${amount} DH.`;


  cashOutput.innerHTML = "";
  let remaining = amount;
  const bills = [200, 100, 50, 20, 10];

  bills.forEach(bill => {
    while (remaining >= bill) {
      const img = document.createElement("img");
      img.src = `images/med_${bill}.jpg`;
      img.className = "cash-note";
      cashOutput.appendChild(img);
      remaining -= bill;
    }
  });
}

function deposit() {
  const amount = parseInt(document.getElementById("depositAmount").value);
  const msg = document.getElementById("deposit-msg");
  const userData = getUserData();

  if (isNaN(amount) || amount <= 0) {
    msg.textContent = "Enter a valid amount.";
    return;
  }

  userData.balance += amount;
  updateUserData(userData);
  document.getElementById("balance").textContent = userData.balance;
  msg.textContent = `You deposited ${amount} DH.`;
}
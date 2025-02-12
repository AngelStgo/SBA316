const transactions = 
// JSON.parse(localStorage.getItem('transactions')) || [];
[
    {
        id: 1,
        name: 'salary',
        amount: 5000,
        date: new Date(),
        type: 'income',
    },
    {
        id: 2,
        name: 'haircut',
        amount: 30,
        date: new Date(),
        type: 'expenses',
    },
    {
        id: 3,
        name: 'concert ticket',
        amount: 200,
        date: new Date(), 
        type: 'expenses',
    },
];


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'always',
})


const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expenses = document.getElementById("expenses");

form.addEventListener("submit", addTransaction)

function updateTotal() {
    const incomeTotal = transactions
    .filter(trx => trx.type === "income")
    .reduce((total, trx) => total + trx.amount, 0);

        const expensesTotal = transactions
        .filter(trx => trx.type === "expenses")
        .reduce((total, trx) => total + trx.amount, 0);

        const balanceTotal = incomeTotal - expensesTotal;

        balance.textContent = formatter.format(balanceTotal).substring(1);
        income.textContent = formatter.format(incomeTotal);
        expenses.textContent = formatter.format(expensesTotal * -1);
    }

function renderList () {
    list.innerHTML = "";

    if (transactions.length === 0) {
        status.textContent = 'No transactions.';
        return;
    }
    transactions.forEach(({ id, name, amount, date, type}) => {
        const sign = "income" === type ? 1 : -1;
        const li = document.createElement("li");

        // use backticks `
        li.innerHTML = ` 
            <div class="name">
          <h4>${name}</h4>
          <p>${new Date(date).toLocaleDateString()}</p>
          </div>

          <div class="amount ${type}"> 
          <span>${formatter.format(amount * sign)}</span>
          </div>

          <div class="action" onclick="deleteTransaction(${id})"> 
          delete  
          </div>
         

         `;
        list.appendChild(li);
    })
}

renderList();
// saveTransaction();
updateTotal();

function deleteTransaction(id) {
    const index = transactions.findIndex((trx) => trx.id === id);
    transactions.splice(index, 1);

    renderList();
    updateTotal();
}

function addTransaction (e) {
    e.preventDefault();

    const formData = new FormData(this);

    transactions.push({
        id: transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get('date')),
        type: 'on' === formData.get('type') ? "income" : "expenses",
    });

    this.reset();

    updateTotal();
    // saveTransaction();
    renderList();
}

//* local storage, but need to understand it more
// function saveTransaction() {
//     transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

//     localStorage.setItem("transactions", JSON.stringify(transactions));
// }
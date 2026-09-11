/* =========================
   TASK MANAGER
========================= */

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


function saveData() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


function addTask() {

    const input =
        document.getElementById("taskInput");

    const text =
        input.value.trim();


    if (text === "") {
        return;
    }


    tasks.push({

        text: text,

        completed: false

    });


    input.value = "";

    saveData();

    renderTasks();

}


function renderTasks() {

    const container =
        document.getElementById("tasks");


    container.innerHTML = "";


    tasks.forEach((task, index) => {

        const div =
            document.createElement("div");


        div.className = "task";


        div.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})"
            >

            <span
                class="${task.completed ? "completed" : ""}">
                ${escapeHTML(task.text)}
            </span>

            <button
                class="delete"
                onclick="deleteTask(${index})">
                ✕
            </button>

        `;


        container.appendChild(div);

    });


    updateProgress();

}


function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;


    saveData();

    renderTasks();

}


function deleteTask(index) {

    tasks.splice(index, 1);

    saveData();

    renderTasks();

}


/* Prevent HTML injection */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================
   PROGRESS
========================= */

function updateProgress() {

    const percentage =
        document.getElementById("percentage");

    const progressBar =
        document.getElementById("progressBar");


    if (tasks.length === 0) {

        percentage.textContent = "0%";

        progressBar.style.width = "0%";

        return;

    }


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const progress =
        Math.round(
            completed / tasks.length * 100
        );


    percentage.textContent =
        progress + "%";


    progressBar.style.width =
        progress + "%";

}


/* =========================
   POMODORO TIMER
========================= */

let timeLeft = 25 * 60;

let timerInterval = null;


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;


    document.getElementById("timer")
        .textContent =
        String(minutes).padStart(2, "0")
        + ":"
        + String(seconds).padStart(2, "0");

}


function startTimer() {

    if (timerInterval !== null) {
        return;
    }


    timerInterval =
        setInterval(() => {

            timeLeft--;

            updateTimer();


            if (timeLeft <= 0) {

                clearInterval(timerInterval);

                timerInterval = null;

                alert(
                    "Focus session complete! 🌷 Take a short break."
                );


                timeLeft = 5 * 60;

                updateTimer();

            }

        }, 1000);

}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();

}


/* =========================
   DAILY GOAL
========================= */

function saveGoal() {

    const goal =
        document.getElementById("goalInput")
            .value.trim();


    localStorage.setItem(
        "dailyGoal",
        goal
    );


    displayGoal();

}


function displayGoal() {

    const goal =
        localStorage.getItem(
            "dailyGoal"
        );


    const input =
        document.getElementById(
            "goalInput"
        );


    const saved =
        document.getElementById(
            "savedGoal"
        );


    if (goal) {

        input.value = goal;

        saved.textContent =
            "Saved: " + goal;

    }

}


/* =========================
   NOTES
========================= */

const notes =
    document.getElementById("notes");


notes.value =
    localStorage.getItem("notes") || "";


notes.addEventListener(
    "input",
    function () {

        localStorage.setItem(
            "notes",
            notes.value
        );

    }
);


/* =========================
   MOTIVATIONAL QUOTES
========================= */

const quotes = [

    "You don't have to do everything today. Just do the next important thing.",

    "Small progress is still progress. Keep going 🌷",

    "Future you is going to be proud of what you do today.",

    "Take a breath. You are doing better than you think.",

    "One focused hour can change the whole day.",

    "You are capable of more than you think. ❤️"

];


function newQuote() {

    const random =
        Math.floor(
            Math.random() * quotes.length
        );


    document.getElementById("quote")
        .textContent =
        "“" + quotes[random] + "”";

}


/* =========================
   EXPENSE TRACKER
========================= */

let expenses =
    JSON.parse(
        localStorage.getItem("expenses")
    ) || [];


function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}


function addExpense() {

    const name =
        document.getElementById(
            "expenseName"
        );


    const amount =
        document.getElementById(
            "expenseAmount"
        );


    if (
        name.value.trim() === "" ||
        amount.value === ""
    ) {

        return;

    }


    expenses.push({

        name: name.value.trim(),

        amount: Number(amount.value)

    });


    name.value = "";

    amount.value = "";


    saveExpenses();

    renderExpenses();

}


function renderExpenses() {

    const container =
        document.getElementById(
            "expenses"
        );


    container.innerHTML = "";


    let total = 0;


    expenses.forEach(
        (expense, index) => {

            total += expense.amount;


            const div =
                document.createElement(
                    "div"
                );


            div.className = "task";


            div.innerHTML = `

                <span>
                    ${escapeHTML(expense.name)}
                </span>

                <strong>
                    ₹${expense.amount}
                </strong>

                <button
                    class="delete"
                    onclick="deleteExpense(${index})">
                    ✕
                </button>

            `;


            container.appendChild(div);

        }
    );


    document.getElementById(
        "total"
    ).textContent = total;

}


function deleteExpense(index) {

    expenses.splice(index, 1);

    saveExpenses();

    renderExpenses();

}


/* =========================
   INITIAL LOAD
========================= */

renderTasks();

renderExpenses();

displayGoal();

updateTimer();

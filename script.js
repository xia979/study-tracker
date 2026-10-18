
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const summary = document.querySelector("#task-summary");

let total = 0;
let completed = 0;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = input.value.trim();

    if (taskName === "") {
        alert("请输入学习任务！");
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    span.textContent = taskName;

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            li.classList.add("completed");
            completed++;
        } else {
            li.classList.remove("completed");
            completed--;
        }

        updateSummary();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);

    total++;
    input.value = "";
    input.focus();

    updateSummary();
});

function updateSummary() {
    summary.textContent =
        `已完成 ${completed} 项，共 ${total} 项任务`;
}

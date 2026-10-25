
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const summary = document.querySelector("#task-summary");

// 读取之前保存的任务；第一次打开时使用空数组
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// 保存任务到 localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 根据 tasks 数组重新渲染页面
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");
        const deleteBtn = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        span.textContent = task.name;
        deleteBtn.textContent = "删除";

        if (task.completed) {
            li.classList.add("completed");
        }

        // 勾选或取消完成
        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        // 删除任务
        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    // 根据任务数组计算统计信息
    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const total = tasks.length;
    const pending = total - completed;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

    summary.textContent =
        `任务总数：${total} 项 | 已完成：${completed} 项 | 未完成：${pending} 项 | 完成率：${rate}%`;

    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${rate}%`;
}

// 添加新任务
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = input.value.trim();

    if (taskName === "") {
        alert("请输入学习任务！");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
    input.focus();
});

// 页面打开时显示已保存的任务
renderTasks();

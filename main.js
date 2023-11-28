function openFolder() {
    var password = document.getElementById("folderPassword").value;
    // Check password (you may want to implement proper authentication)
    if (password === "yourpassword") {
        document.getElementById("folderContent").style.display = "block";
    } else {
        alert("Invalid password");
    }
}

function addTask() {
    var folderContent = document.getElementById("folderContent");
    var taskCount = folderContent.getElementsByClassName("task").length + 1;
    var taskId = "task" + taskCount;
    var newTask = document.createElement("div");
    newTask.className = "task";
    newTask.id = taskId;
    newTask.innerHTML = `
        <h3>Task ${taskCount}</h3>
        <p>Description: <input type="text" id="desc${taskCount}"></p>
        <p>Points: <input type="number" id="points${taskCount}" value="10"></p>
        <p>User: <select id="user${taskCount}"><option value="user1">User 1</option></select></p>
        <label>Done: <input type="checkbox" id="done${taskCount}"></label>
        <button onclick="editTask('${taskId}')">Edit</button>
        <button onclick="deleteTask('${taskId}')">Delete</button>
    `;
    folderContent.appendChild(newTask);
}

function editTask(taskId) {
    // Implement edit functionality as needed
    alert("Edit task: " + taskId);
}

function deleteTask(taskId) {
    var task = document.getElementById(taskId);
    task.parentNode.removeChild(task);
}

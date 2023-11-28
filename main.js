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
        <p>Description: <span id="desc${taskCount}">Lorem ipsum dolor sit amet.</span></p>
        <p>Points: <span id="points${taskCount}">10</span></p>
        <p>User: <span id="user${taskCount}">User 1</span></p>
        <button onclick="editTask('${taskId}')">Edit</button>
    `;
    folderContent.appendChild(newTask);
}

function editTask(taskId) {
    var task = document.getElementById(taskId);
    var editButton = task.querySelector('button');

    // Disable the "Edit" button
    editButton.disabled = true;

    // Add "Save" button to allow saving changes
    var saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "edit-button";
    saveButton.onclick = function () {
        // Implement save functionality as needed
        alert("Save task: " + taskId);
        // Re-enable the "Edit" button after saving changes
        editButton.disabled = false;
    };
    task.appendChild(saveButton);
}

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
        <p>Description: <span id="desc${taskCount}" contenteditable="true"></span></p>
        <p>Points: <span id="points${taskCount}" contenteditable="true">10</span></p>
        <p>User: <select id="user${taskCount}"><option value="user1">User 1</option></select></p>
        <label>Done: <input type="checkbox" id="done${taskCount}"></label>
        <button onclick="editTask('${taskId}')">Edit</button>
        <button onclick="deleteTask('${taskId}')">Delete</button>
    `;
    folderContent.appendChild(newTask);
}

function editTask(taskId) {
    var task = document.getElementById(taskId);
    var editButtons = task.getElementsByClassName("edit-button");
    
    // Disable contenteditable for all tasks
    var allTasks = document.getElementsByClassName("task");
    for (var i = 0; i < allTasks.length; i++) {
        var taskElements = allTasks[i].querySelectorAll('[contenteditable="true"]');
        for (var j = 0; j < taskElements.length; j++) {
            taskElements[j].setAttribute("contenteditable", "false");
        }
    }

    // Enable contenteditable only for the clicked task
    var taskElementsToEdit = task.querySelectorAll('[contenteditable="true"]');
    for (var k = 0; k < taskElementsToEdit.length; k++) {
        taskElementsToEdit[k].setAttribute("contenteditable", "true");
    }

    // Add "Save" button to allow saving changes
    if (editButtons.length === 0) {
        var saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.className = "edit-button";
        saveButton.onclick = function () {
            // Implement save functionality as needed
            alert("Save task: " + taskId);
        };
        task.appendChild(saveButton);
    }
}

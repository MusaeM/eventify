function openFolder() {
    var password = document.getElementById("folderPassword").value;
    // Check password (you may want to implement proper authentication)
    if (password === "yourpassword") {
        document.getElementById("folderContent").style.display = "block";
        document.getElementById("taskListContainer").removeChild(document.getElementById("folderPassword"));
        document.getElementById("taskListContainer").removeChild(document.querySelector("button"));
    } else {
        alert("Invalid password");
    }
}

function showAddForm() {
    document.getElementById("entryForm").style.display = "block";
}

function addTask() {
    var taskList = document.getElementById("taskList");
    var entryName = document.getElementById("entryName").value;
    var entryDescription = document.getElementById("entryDescription").value;
    var entryPoints = document.getElementById("entryPoints").value;
    var entryUser = document.getElementById("entryUser").value;

    var taskEntry = document.createElement("div");
    taskEntry.className = "task";
    taskEntry.innerHTML = `
        <h3>${entryName}</h3>
        <p>Description: <span>${entryDescription}</span></p>
        <p>Points: <span>${entryPoints}</span></p>
        <p>User: <span>${entryUser}</span></p>
        <button onclick="toggleDescription(this)">Toggle Description</button>
        <button onclick="editTask(this)">Edit</button>
    `;
    taskList.appendChild(taskEntry);

    // Clear the form and hide it
    document.getElementById("taskForm").reset();
    document.getElementById("entryForm").style.display = "none";
}

function toggleDescription(button) {
    var task = button.parentElement;
    var description = task.querySelector("span");
    description.style.display = description.style.display === "none" ? "inline" : "none";
}

function editTask(button) {
    var task = button.parentElement;
    var taskData = {
        name: task.querySelector("h3").textContent,
        description: task.querySelector("span").textContent,
        points: task.querySelector("p:nth-child(3) span").textContent,
        user: task.querySelector("p:nth-child(4) span").textContent
    };

    // Convert the task to a form for editing
    task.innerHTML = `
        <form id="editForm">
            <label for="editName">Name:</label>
            <input type="text" id="editName" value="${taskData.name}" required>
            <label for="editDescription">Description:</label>
            <textarea id="editDescription">${taskData.description}</textarea>
            <label for="editPoints">Points:</label>
            <input type="number" id="editPoints" value="${taskData.points}" required>
            <label for="editUser">User:</label>
            <input type="text" id="editUser" value="${taskData.user}" required>
            <button type="button" onclick="saveEdit(this)">Save</button>
        </form>
    `;
}

function saveEdit(button) {
    var editedForm = button.parentElement;
    var task = editedForm.parentElement;

    // Get the edited data
    var editedData = {
        name: editedForm.querySelector("#editName").value,
        description: editedForm.querySelector("#editDescription").value,
        points: editedForm.querySelector("#editPoints").value,
        user: editedForm.querySelector("#editUser").value
    };

    // Update the task with the edited data
    task.innerHTML = `
        <h3>${editedData.name}</h3>
        <p>Description: <span>${editedData.description}</span></p>
        <p>Points: <span>${editedData.points}</span></p>
        <p>User: <span>${editedData.user}</span></p>
        <button onclick="toggleDescription(this)">Toggle Description</button>
        <button onclick="editTask(this)">Edit</button>
    `;
}

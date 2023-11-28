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
    document.querySelector("button").style.display = "none";
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
    document.querySelector("button").style.display = "block";
}

function toggleDescription(button) {
    var task = button.parentElement;
    var description = task.querySelector("span");
    description.style.display = description.style.display === "none" ? "inline" : "none";
}

function editTask(button) {
    // Implement edit functionality as needed
    alert("Edit task: " + button.parentElement.querySelector("h3").textContent);
}

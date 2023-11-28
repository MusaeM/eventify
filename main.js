function openFolder() {
    var password = document.getElementById("folderPassword").value;
    // Check password (you may want to implement proper authentication)
    if (password === "eventify") {
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
    var taskTable = document.getElementById("taskListTable");
    var entryName = document.getElementById("entryName").value;
    var entryDescription = document.getElementById("entryDescription").value;
    var entryPoints = document.getElementById("entryPoints").value;
    var entryUser = document.getElementById("entryUser").value;

    // Create a new row for the table
    var newRow = taskTable.insertRow();

    // Assign entry name as the ID for the row
    newRow.id = entryName;

    // Insert cells in the row with corresponding data
    newRow.insertCell(0).textContent = entryName;
    newRow.insertCell(1).textContent = entryDescription;
    newRow.insertCell(2).textContent = entryPoints;
    newRow.insertCell(3).textContent = entryUser;

    // Create a button for the "Action" column (Edit)
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
        // Call the editTask function with the corresponding entry ID
        editTask(entryName);
    };

    // Create a button for the "Action" column (Delete)
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        // Call the deleteTask function with the corresponding entry ID
        deleteTask(entryName);
    };

    // Create a div for the buttons and append them
    var buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("entry-buttons");
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    // Insert the buttons div in the "Action" column
    newRow.insertCell(4).appendChild(buttonsDiv);

    // Clear the form and hide it
    document.getElementById("taskForm").reset();
    document.getElementById("entryForm").style.display = "none";
}

function editTask(entryName) {
    // Retrieve the row corresponding to the entryName
    var taskRow = document.getElementById(entryName);

    // Extract existing data from the row
    var existingName = taskRow.cells[0].textContent;
    var existingDescription = taskRow.cells[1].textContent;
    var existingPoints = taskRow.cells[2].textContent;
    var existingUser = taskRow.cells[3].textContent;

    // Populate the form with existing data
    document.getElementById("entryName").value = existingName;
    document.getElementById("entryDescription").value = existingDescription;
    document.getElementById("entryPoints").value = existingPoints;
    document.getElementById("entryUser").value = existingUser;

    // Show the form for editing
    document.getElementById("entryForm").style.display = "block";

    // Remove the existing row from the table
    taskRow.parentElement.removeChild(taskRow);
}

function deleteTask(entryName) {
    // Retrieve the row corresponding to the entryName
    var taskRow = document.getElementById(entryName);

    // Remove the row from the table
    taskRow.parentElement.removeChild(taskRow);
}

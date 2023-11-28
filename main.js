let currentFolder = null;
let foldersData = []; // Array to store folder information

// Function to display folders in tabular form
async function displayFolders() {
    const folderListContainer = document.getElementById('folderList');

    try {
        const response = await fetch('./data.json');
        foldersData = await response.json();

        const table = createFolderListTable(foldersData);
        folderListContainer.innerHTML = '';
        folderListContainer.appendChild(table);
    } catch (error) {
        console.error('Error fetching folders:', error);
    }
}

// Function to create table for folder list
function createFolderListTable(folderList) {
    const table = document.createElement('table');
    table.id = 'folderListTable';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Actions'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    folderList.forEach(folder => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${folder.name}</td>
                        <td>
                            <button onclick="openFolder('${folder.name}')">Open</button>
                            <button onclick="editFolder('${folder.name}')">Edit</button>
                            <button onclick="deleteFolder('${folder.name}')">Delete</button>
                        </td>`;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
}

// Function to open a folder
async function openFolder(folderName) {
    const passwordInput = prompt('Enter the password for the folder:');
    
    // Fetch folder data from the 'data.json' file
    const response = await fetch('data.json');
    const foldersData = await response.json();
    
    // Find the folder with the specified name
    const selectedFolder = foldersData.find(folder => folder.name === folderName);

    // Validate the password
    if (selectedFolder && passwordInput === selectedFolder.password) {
        currentFolder = folderName;
        document.getElementById('folderList').style.display = 'none';
        document.getElementById('folderContent').style.display = 'block';
        document.getElementById('entryForm').style.display = 'block';
    } else {
        alert('Incorrect password. Please try again.');
    }
}


// Function to edit a folder
async function editFolder(folderName) {
    const updatedFolderName = prompt('Enter the new folder name:', folderName);

    if (updatedFolderName !== null && updatedFolderName !== '') {
        try {
            const updatedFolder = foldersData.find(folder => folder.name === folderName);
            if (updatedFolder) {
                updatedFolder.name = updatedFolderName;
                await updateDataFile();
                await displayFolders();
            }
        } catch (error) {
            console.error('Error updating folder:', error);
        }
    }
}

// Function to delete a folder
async function deleteFolder(folderName) {
    const confirmDelete = confirm(`Are you sure you want to delete the folder '${folderName}'?`);

    if (confirmDelete) {
        try {
            foldersData = foldersData.filter(folder => folder.name !== folderName);
            await updateDataFile();
            await displayFolders();
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    }
}

// Function to update the data file
async function updateDataFile() {
    try {
        await fetch('./data.json', {
            method: 'PUT',
            body: JSON.stringify(foldersData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating data file:', error);
    }
}

// Function to reset the app
function resetApp() {
    currentFolder = null;
    document.getElementById('folderPassword').value = '';
    document.getElementById('folderList').style.display = 'block';
    document.getElementById('folderContent').style.display = 'none';
    document.getElementById('entryForm').style.display = 'none';
}

// Initial display of folders
displayFolders();

// Existing functions for managing tasks (addTask, editTask, deleteTask, etc.) go here

// Function to check the password and proceed to the folder content
function checkPassword() {
    const passwordInput = document.getElementById('folderPassword').value;

    // Placeholder logic: Assume password checking logic here (replace with your own logic)
    const isPasswordCorrect = true; // Replace with actual password validation

    if (isPasswordCorrect) {
        document.getElementById('folderList').style.display = 'none';
        document.getElementById('folderContent').style.display = 'block';
        document.getElementById('entryForm').style.display = 'block';
    } else {
        alert('Incorrect password. Please try again.');
    }
}

// Function to show the add entry form
function showAddForm() {
    document.getElementById('entryForm').style.display = 'block';
}

// Function to add a task
function addTask() {
    const taskTable = document.getElementById('taskListTable');
    const entryName = document.getElementById('entryName').value;
    const entryDescription = document.getElementById('entryDescription').value;
    const entryPoints = document.getElementById('entryPoints').value;
    const entryUser = document.getElementById('entryUser').value;

    // Create a new row for the table
    const newRow = taskTable.insertRow();

    // Assign entry name as the ID for the row
    newRow.id = entryName;

    // Insert cells in the row with corresponding data
    newRow.insertCell(0).textContent = entryName;
    newRow.insertCell(1).textContent = entryDescription;
    newRow.insertCell(2).textContent = entryPoints;
    newRow.insertCell(3).textContent = entryUser;

    // Create a button for the "Action" column (Edit)
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        // Call the editTask function with the corresponding entry ID
        editTask(entryName);
    };

    // Create a button for the "Action" column (Delete)
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        // Call the deleteTask function with the corresponding entry ID
        deleteTask(entryName);
    };

    // Create a div for the buttons and append them
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('entry-buttons');
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    // Insert the buttons div in the "Action" column
    newRow.insertCell(4).appendChild(buttonsDiv);

    // Clear the form and hide it
    document.getElementById('taskForm').reset();
    document.getElementById('entryForm').style.display = 'none';
}

// Function to edit a task
function editTask(entryName) {
    // Retrieve the row corresponding to the entryName
    const taskRow = document.getElementById(entryName);

    // Extract existing data from the row
    const existingName = taskRow.cells[0].textContent;
    const existingDescription = taskRow.cells[1].textContent;
    const existingPoints = taskRow.cells[2].textContent;
    const existingUser = taskRow.cells[3].textContent;

    // Populate the form with existing data
    document.getElementById('entryName').value = existingName;
    document.getElementById('entryDescription').value = existingDescription;
    document.getElementById('entryPoints').value = existingPoints;
    document.getElementById('entryUser').value = existingUser;

    // Show the form for editing
    document.getElementById('entryForm').style.display = 'block';

    // Remove the existing row from the table
    taskRow.parentElement.removeChild(taskRow);
}

// Function to delete a task
function deleteTask(entryName) {
    // Retrieve the row corresponding to the entryName
    const taskRow = document.getElementById(entryName);

    // Remove the row from the table
    taskRow.parentElement.removeChild(taskRow);
}

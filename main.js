let currentFolder = null;

// Function to display folders in tabular form
function displayFolders() {
    const folderListContainer = document.getElementById('folderList');

    // Create a table for the folder list
    const table = document.createElement('table');
    table.id = 'folderListTable';

    // Create table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Folder Name', 'Actions'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    foldersData.forEach(folder => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${folder.name}</td>
                        <td>
                            <button onclick="editFolder('${folder.name}')">Edit</button>
                            <button onclick="deleteFolder('${folder.name}')">Delete</button>
                        </td>`;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    // Append the table to the folder list container
    folderListContainer.innerHTML = '';
    folderListContainer.appendChild(table);
}

// Function to create a new folder
function createFolder() {
    const newFolderName = document.getElementById('newFolderName').value.trim();

    if (newFolderName !== '') {
        // Check if the folder already exists
        const folderExists = foldersData.some(folder => folder.name === newFolderName);

        if (!folderExists) {
            // Create a new folder and its corresponding JSON file
            foldersData.push({ name: newFolderName });
            createFolderFile(newFolderName);
            displayFolders();
            openFolder(newFolderName); // Open the newly created folder
        } else {
            alert('Folder already exists.');
        }
    }

    // Clear the input field
    document.getElementById('newFolderName').value = '';
}

// Function to create a JSON file for a new folder
async function createFolderFile(folderName) {
    try {
        const jsonData = JSON.stringify([]);
        await fetch(`data/${folderName}_entries.json`, {
            method: 'PUT',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(`Error creating JSON file for folder ${folderName}:`, error);
    }
}

// Function to edit a folder
function editFolder(folderName) {
    const updatedFolderName = prompt('Enter the new folder name:', folderName);

    if (updatedFolderName !== null && updatedFolderName !== '') {
        // Update the folder name and its corresponding JSON file
        const folderIndex = foldersData.findIndex(folder => folder.name === folderName);
        if (folderIndex !== -1) {
            const oldFolderName = foldersData[folderIndex].name;
            foldersData[folderIndex].name = updatedFolderName;
            updateFolderFile(oldFolderName, updatedFolderName);
            displayFolders();
        }
    }
}

// Function to update the JSON file for a folder
async function updateFolderFile(oldFolderName, newFolderName) {
    try {
        // Fetch existing entries from the old folder
        const entries = await fetchEntries(oldFolderName);

        // Create the new folder and its corresponding JSON file
        await createFolderFile(newFolderName);

        // Save the existing entries to the new folder
        if (entries) {
            await saveEntries(newFolderName, entries);
        }

        // Delete the JSON file for the old folder
        await deleteFolderFile(oldFolderName);
    } catch (error) {
        console.error(`Error updating JSON files for folders:`, error);
    }
}

// Function to delete a folder
function deleteFolder(folderName) {
    const confirmDelete = confirm(`Are you sure you want to delete the folder '${folderName}'?`);

    if (confirmDelete) {
        // Delete the folder and its corresponding JSON file
        foldersData = foldersData.filter(folder => folder.name !== folderName);
        deleteFolderFile(folderName);
        displayFolders();

        // If the deleted folder is the current folder, reset the app
        if (currentFolder === folderName) {
            resetApp();
        }
    }
}

// Function to delete the JSON file for a folder
async function deleteFolderFile(folderName) {
    try {
        await fetch(`data/${folderName}_entries.json`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error(`Error deleting JSON file for folder ${folderName}:`, error);
    }
}

// Function to reset the app
function resetApp() {
    currentFolder = null;
    document.getElementById('passwordForm').style.display = 'none';
    document.getElementById('folderContent').style.display = 'none';
    document.getElementById('folderList').style.display = 'block';
}

// Function to cancel folder creation
function cancelFolderCreation() {
    document.getElementById('folderForm').style.display = 'none';
    document.getElementById('folderList').style.display = 'block';
}

// Function to open a folder
function openFolder(folderName) {
    currentFolder = folderName;
    document.getElementById('folderList').style.display = 'none';
    document.getElementById('folderForm').style.display = 'none';
    document.getElementById('passwordForm').style.display = 'block';

    // Clear the password input field
    document.getElementById('folderPassword').value = '';
}

// Function to check the password and proceed to the folder content
function checkPassword() {
    const password = document.getElementById('folderPassword').value;

    // Placeholder logic: Assume password checking logic here (replace with your own logic)
    const isPasswordCorrect = true; // Replace with actual password validation

    if (isPasswordCorrect) {
        document.getElementById('passwordForm').style.display = 'none';
        document.getElementById('folderContent').style.display = 'block';
        displayEntries();
    } else {
        alert('Incorrect password. Please try again.');
    }
}

// Function to display entries for the current folder
async function displayEntries() {
    const folderContentContainer = document.getElementById('folderContent');

    // Fetch entries for the current folder
    const entries = await fetchEntries(currentFolder);

    // Create a table for the entry list
    const table = document.createElement('table');
    table.id = 'folderContentTable';

    // Create table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Description', 'Points', 'User', 'Actions'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    entries.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${entry.name}</td>
                        <td>${entry.description}</td>
                        <td>${entry.points}</td>
                        <td>${entry.user}</td>
                        <td>
                            <button onclick="editEntry('${entry.name}')">Edit</button>
                            <button onclick="deleteEntry('${entry.name}')">Delete</button>
                        </td>`;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    // Append the table to the folder content container
    folderContentContainer.innerHTML = '';
    folderContentContainer.appendChild(table);
}

// Function to fetch entries from a JSON file for a specific folder
async function fetchEntries(folderName) {
    try {
        const response = await fetch(`data/${folderName}_entries.json`);

        if (!response.ok) {
            throw new Error(`Error fetching entries for ${folderName}: ${response.statusText}`);
        }

        const entries = await response.json();
        return entries || [];
    } catch (error) {
        console.error(`Error fetching entries for ${folderName}:`, error);
        return [];
    }
}

// Function to create or update entries in a JSON file for a specific folder
async function saveEntries(folderName, entries) {
    try {
        const jsonData = JSON.stringify(entries);
        await fetch(`data/${folderName}_entries.json`, {
            method: 'PUT',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(`Error saving entries for ${folderName}:`, error);
    }
}

// Function to edit an entry
function editEntry(entryName) {
    // Assume entry editing logic here (replace with your own logic)
    alert(`Editing entry '${entryName}'.`);
}

// Function to delete an entry
function deleteEntry(entryName) {
    // Assume entry deletion logic here (replace with your own logic)
    alert(`Deleting entry '${entryName}'.`);
}

// Initial display of folders
displayFolders();

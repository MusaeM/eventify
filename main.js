let currentFolder = null;
let foldersData = []; // Array to store folder information

// Function to check the entered password
function checkPassword() {
    const enteredPassword = document.getElementById('appPassword').value;
    const correctPassword = 'eventify1e3T'; // Replace with your actual password

    if (enteredPassword === correctPassword) {
        // Password correct, display the app content
        document.getElementById('passwordPrompt').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    } else {
        // Password incorrect, show an alert
        alert('Incorrect password. Please try again.');
    }
}

// Initial check if the user needs to enter the password
window.onload = function () {
    const passwordPrompt = document.getElementById('passwordPrompt');
    const appContainer = document.querySelector('.container');

    // Check if the password is set (you can use a more secure way to store this)
    const hasPassword = true; // Set to true if you want to use a password

    if (hasPassword) {
        passwordPrompt.style.display = 'block';
        appContainer.style.display = 'none';
    }
};

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


//Open FOlder
async function openFolder(folderName) {
    const passwordInput = prompt('Enter the password for the folder:');

    try {
        // Fetch folder data from the 'data.json' file
        const response = await fetch('./data.json');
        const foldersData = await response.json();

        // Find the folder with the specified name
        const selectedFolder = foldersData.find(folder => folder.name === folderName);

        // Validate the password
        if (selectedFolder && passwordInput === selectedFolder.password) {
            currentFolder = folderName;

            // Display entries in a popup
            displayEntriesPopup(selectedFolder.entries);
        } else {
            alert('Incorrect password. Please try again.');
        }
    } catch (error) {
        console.error('Error opening folder:', error);
    }
}

// Function to get password input with Enter key support
function getPasswordInput(promptMessage) {
    return new Promise(resolve => {
        const passwordInput = prompt(promptMessage);

        // Resolve the promise when Enter key is pressed
        document.addEventListener('keydown', function onKeydown(event) {
            if (event.key === 'Enter') {
                document.removeEventListener('keydown', onKeydown); // Remove the event listener
                resolve(passwordInput);
            }
        });
    });
}

// Function to display entries in a popup
function displayEntriesPopup(entries) {
    let popupContent = '<h2>Folder Entries</h2><table>';
    popupContent += '<tr><th>Name</th><th>Description</th><th>Points</th><th>User</th></tr>';

    entries.forEach(entry => {
        popupContent += `<tr>
                            <td>${entry.name}</td>
                            <td>${entry.description}</td>
                            <td>${entry.points}</td>
                            <td>${entry.user}</td>
                         </tr>`;
    });

    popupContent += '</table>';
    
    // Open a new window with the entries popup content
    const entriesPopup = window.open('', 'EntriesPopup', 'width=600,height=400');
    entriesPopup.document.body.innerHTML = popupContent;
}






// Function to create table for folder entries
function createEntryTable(entries) {
    const table = document.createElement('table');
    table.id = 'entryTable';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Description', 'Points', 'User'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    entries.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${entry.name}</td>
                        <td>${entry.description}</td>
                        <td>${entry.points}</td>
                        <td>${entry.user}</td>`;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
}




// Function to create table for folder entries
function createEntryTable(entries) {
    const table = document.createElement('table');
    table.id = 'entryTable';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Description', 'Points', 'User'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    entries.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${entry.name}</td>
                        <td>${entry.description}</td>
                        <td>${entry.points}</td>
                        <td>${entry.user}</td>`;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
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
    document.getElementById('taskForm').style.display = 'none';
}

// Initial display of folders
displayFolders();

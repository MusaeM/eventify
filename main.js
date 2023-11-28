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

            // Check if elements are not null before accessing their properties
            const folderListElement = document.getElementById('folderList');
            const folderContentElement = document.getElementById('folderContent');
            const entryFormElement = document.getElementById('taskForm');

            if (folderListElement && folderContentElement && entryFormElement) {
                // Hide folder table and entry form
                folderListElement.style.display = 'none';
                entryFormElement.style.display = 'none';

                // Display entries in a new table underneath the folder table
                const entryTable = createEntryTable(selectedFolder.entries);
                
                // Find or create a tbody in the folderContentElement
                let tbody = folderContentElement.querySelector('#entryTableBody');
                if (!tbody) {
                    tbody = document.createElement('tbody');
                    tbody.id = 'entryTableBody';
                }

                // Clear existing content and append the entries table
                tbody.innerHTML = '';
                tbody.appendChild(entryTable);

                // Append the tbody to the folderContentElement
                folderContentElement.appendChild(tbody);

                // Show folder content
                folderContentElement.style.display = 'block';
            } else {
                console.error('Error: One or more elements are null.');
            }
        } else {
            alert('Incorrect password. Please try again.');
        }
    } catch (error) {
        console.error('Error opening folder:', error);
    }
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

const USERS = [
    { email: "a@b.c", password: "1345678900" },
    { email: "d@b.c", password: "1345678901" },
    { email: "e@b.c", password: "1345678902" },
    { email: "f@b.c", password: "1345678903" },
];

// Function to render users in a table
function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    table.className = 'user-table';

    // Table headers
    const headers = ['Email', 'Actions'];
    const headerRow = table.insertRow();
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    // Table rows
    USERS.forEach((user, index) => {
        const row = table.insertRow();
        const emailCell = row.insertCell();
        emailCell.textContent = user.email;

        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
        `;
    });

    userList.appendChild(table);
}

// Function to edit user (implement your logic)
function editUser(index) {
    const newEmail = prompt("Enter new email:", USERS[index].email);
    if (newEmail) {
        USERS[index].email = newEmail; // Update user email
        renderUsers(); // Re-render the user list
    }
}

// Function to delete user
function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        USERS.splice(index, 1); // Remove user from the array
        renderUsers(); // Re-render the user list
    }
}

// Initial render
renderUsers();

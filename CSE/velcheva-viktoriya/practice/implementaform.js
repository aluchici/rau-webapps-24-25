async function registerUser(event) {
    event.preventDefault();
    
    // Collect form data (you should collect real values here)
    const data = {
        username: document.getElementById('firstname').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Server response:", result);
    } catch (error) {
        console.error("Error with request:", error);
        alert("There was an issue connecting to the server. Please try again later.");
    }
}
const API = "http://localhost:3000";

const data = {
    title: "Mothers' Day",
    description: "Buy a present for a mother's day"
};

fetch(`${API}/tasks/1`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
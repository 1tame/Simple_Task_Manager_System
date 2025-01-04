const API_URL = "http://localhost:4000/tasks"; // Update with your backend URL

// Fetch all tasks
const getTasks = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

// Add a new task
const addTask = async (task) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return await response.json();
};

// Delete a task
const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// Mark a task as completed
const updateTask = async (id, updatedTask) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  return await response.json();
};

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Fetch and display tasks on page load
document.addEventListener("DOMContentLoaded", async () => {
  const tasks = await getTasks();
  tasks.forEach(addTaskToDOM);
});

// Handle form submission
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTask = { title: taskInput.value, completed: false };
  const savedTask = await addTask(newTask);
  addTaskToDOM(savedTask);
  taskInput.value = ""; // Clear the input field
});

// Add a task to the DOM
const addTaskToDOM = (task) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${task.title}</span>
    <div>
      <button onclick="toggleComplete('${task._id}', ${task.completed})">
        ${task.completed ? "Unmark" : "Complete"}
      </button>
      <button onclick="removeTask('${task._id}')">Delete</button>
    </div>
  `;
  li.className = task.completed ? "completed" : "";
  taskList.appendChild(li);
};

// Toggle task completion
const toggleComplete = async (id, completed) => {
  const updatedTask = await updateTask(id, { completed: !completed });
  refreshTasks();
};

// Delete a task
const removeTask = async (id) => {
  await deleteTask(id);
  refreshTasks();
};

// Refresh the task list
const refreshTasks = async () => {
  taskList.innerHTML = ""; // Clear the list
  const tasks = await getTasks();
  tasks.forEach(addTaskToDOM);
};

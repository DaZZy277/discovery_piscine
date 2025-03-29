// Function to get cookies by name
function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let [key, value] = cookie.trim().split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

// Function to set cookies
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
}

// Function to delete cookies
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Load tasks from cookies when page loads
window.onload = function() {
    let tasks = getCookie('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }
}

// Save tasks to cookies
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push(item.textContent);
    });
    setCookie('tasks', JSON.stringify(tasks), 7);
}

// Add task to the DOM
function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'todo-item';
    taskDiv.textContent = task;
    taskDiv.onclick = function() {
        if (confirm(`Do you want to delete this task: "${task}"?`)) {
            taskDiv.remove();
            saveTasks();
        }
    };
    const list = document.getElementById('ft_list');
    list.insertBefore(taskDiv, list.firstChild); // Insert at the top
}

// Handle new task creation
document.getElementById('new-task-btn').onclick = function() {
    const task = prompt('Enter your new task:');
    if (task) {
        addTaskToDOM(task);
        saveTasks();
    }
};
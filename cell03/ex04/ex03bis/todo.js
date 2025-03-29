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
$(document).ready(function() {
    let tasks = getCookie('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }
});

// Save tasks to cookies
function saveTasks() {
    const tasks = [];
    $('.todo-item').each(function() {
        tasks.push($(this).text());
    });
    setCookie('tasks', JSON.stringify(tasks), 7);
}

// Add task to the DOM
function addTaskToDOM(task) {
    const taskDiv = $('<div></div>').addClass('todo-item').text(task);
    
    taskDiv.on('click', function() {
        if (confirm(`Do you want to delete this task: "${task}"?`)) {
            $(this).remove();
            saveTasks();
        }
    });
    
    $('#ft_list').prepend(taskDiv); // Insert at the top
}

// Handle new task creation
$('#new-task-btn').on('click', function() {
    const task = prompt('Enter your new task:');
    if (task) {
        addTaskToDOM(task);
        saveTasks();
    }
});
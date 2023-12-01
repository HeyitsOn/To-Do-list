// Get elements
const addButton = document.getElementById('addToDo');
const sortButton = document.getElementById('addtodo');
const inputField = document.getElementById('inputField');
const todoContainer = document.getElementById('ToDoContainer');

// Event listeners
addButton.addEventListener('click', addItem);
sortButton.addEventListener('click', sortItems);

// Check if local storage has items, if not, set it to an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render todos
function renderTodos() {
    todoContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.innerHTML = `${todo.name} (Created: ${todo.createdDate}, Completed: ${todo.completed ? 'Yes' : 'No'})`;

        // Add a click event listener to each todo item
        todoItem.addEventListener('click', () => toggleCompletion(todo.id));

        todoContainer.appendChild(todoItem);
    });
}

// Function to add item
function addItem() {
    const itemName = inputField.value.trim();

    // Validate constraints
    if (itemName.length > 3 && itemName !== '') {
        const newItem = {
            id: Date.now(),
            name: itemName.charAt(0).toUpperCase() + itemName.slice(1),
            createdDate: new Date().toLocaleString(),
            completed: false
        };

        todos.push(newItem);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        inputField.value = '';
    }
}

// Function to sort items
function sortItems() {
    todos.sort((a, b) => (a.name > b.name) ? 1 : -1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Function to remove item
function removeItem(itemId) {
    // Filter out the todo item with the given ID
    todos = todos.filter(todo => todo.id !== itemId);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Function to toggle completion status
function toggleCompletion(itemId) {
    // Find the todo item with the given ID
    const todoToUpdate = todos.find(todo => todo.id === itemId);

    // Toggle the completed status
    todoToUpdate.completed = !todoToUpdate.completed;

    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Initial rendering
renderTodos();

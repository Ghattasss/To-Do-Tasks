let form = document.querySelector("form");
let list = document.getElementById("list");

document.addEventListener("DOMContentLoaded", () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    addTaskToList(task.text, task.done);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let taskInput = document.getElementById("task");
  let taskValue = taskInput.value.trim(); 

  if (taskValue !== "") {
    addTaskToList(taskValue, false);
    saveTask(taskValue, false);
    taskInput.value = ""; 
  }
});

function addTaskToList(taskValue, isDone) {
  let element = document.createElement("li");

  let taskText = document.createElement("span");
  taskText.textContent = taskValue;
  taskText.classList.add("task-text");

  if (isDone) {
    taskText.classList.add("check");
  }

  // Delete button
  let buttonDE = document.createElement("button");
  buttonDE.textContent = "Delete";
  buttonDE.classList.add("delete-btn");
  buttonDE.addEventListener("click", () => {
    element.remove();
    deleteTask(taskValue);
  });

  // Done button
  let buttonDO = document.createElement("button");
  buttonDO.textContent = "Done";
  buttonDO.classList.add("done-btn");
  buttonDO.addEventListener("click", () => {
    taskText.classList.toggle("check"); 
    toggleTaskDone(taskValue); 
  });

  // Append elements
  element.appendChild(taskText);
  element.appendChild(buttonDE);
  element.appendChild(buttonDO);
  list.appendChild(element);
}

function saveTask(taskValue, isDone) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskValue, done: isDone });
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function deleteTask(taskValue) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskValue);
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function toggleTaskDone(taskValue) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    if (task.text === taskValue) {
      task.done = !task.done; 
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

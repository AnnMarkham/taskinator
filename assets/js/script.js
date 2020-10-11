
//--Form variables, querySelector and EventListener -- target entire form - not just button(use submit instead of click so that fucntion only runs at submit, not on every click.
// on button element with type attribute with value submit, or press enter on keyboard = submit

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {

  event.preventDefault();

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);

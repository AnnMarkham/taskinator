

var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");


var taskFormHandler = function (event) {
  event.preventDefault();
  //console.log(event);

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (!taskNameInput || !taskTypeInput) {
    alert("Need to fill out the task form")
    return false;
  }

  formEl.reset();

  // package up data as an object
  var dataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // send it as an argument to create task El
  createTaskEl(dataObj);
}

var createTaskEl = function (dataObj) {
  // build a list item 
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //put the content in div
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + dataObj.name + "</h3><span class='task-type'>" + dataObj.type + "</span>";

  // put the package in the li item
  listItemEl.appendChild(taskInfoEl);


  // add the whole schabang as a child
  tasksToDoEl.appendChild(listItemEl);
}


formEl.addEventListener("submit", taskFormHandler);

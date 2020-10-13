var pageContentEl = document.querySelector("#page-content");

var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;




var taskFormHandler = function (event) {
  event.preventDefault();
  //console.log(event);

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //check to see if form is being used to edit
  var isEdit = formEl.hasAttribute("data-task-id");

  // verify that form in header has some content
  if (!taskNameInput || !taskTypeInput) {
    alert("Need to fill out the task form")
    return false;
  }

  formEl.reset();

  //has data attibute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    comletedEditTask(taskNameInput, taskTypeInput, taskId);
  }
  //no dat attribute, so create object as normal and pass to createTaskEl function
  else {
    // package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
  }

}
var completedEditTask = function (taskName, taskType, taskId) {
  console.log(taskName, taskType, taskId);

  // find the matching task list item with task id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");


  // set new values from the form in the header
  taskSelected.querySelector("h3.task-name").textContent = taskName
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");


  //Reset the form
  formEl.removeAttribute("task-data-id");
  document.querySelector("#save-task").textContent = "Add Task";
};


var createTaskEl = function (taskDataObj) {
  // build a list item 
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //add data-* to the task element
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  //put the content in a div
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  // put the package in a line item
  listItemEl.appendChild(taskInfoEl);

  //build the task ele3ment and append to list element
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);


  // add the whole schabang as a child
  tasksToDoEl.appendChild(listItemEl);

  //add one to the task counter each time the function runs
  taskIdCounter++;
};




var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);


  //dropdown for status
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("naem", "status-change");
  statusSelectEl.setAttribute("data-dask-id", taskId);

  //array for dropdown choices
  var statusChoices = ["To Do", "In Progress", "Completed"];

  //for loop to make the selection
  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);
  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

//Button handler function
var taskButtonHandler = function (event) {

  // if the edit button is clicked
  if (event.target.matches(".edit-btn")) {

    var taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }

  // if the delete button is clicked
  if (event.target.matches(".delete-btn")) {
    // get the element id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

// edit task by sending task name and type to the form in the header
var editTask = function (taskId) {
  console.log("editing task #" + taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  console.log(taskSelected);

  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save-Task";
  formEl.setAttribute("data-task-id", taskId);
}

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}

var taskStatusChangeHandler = function (event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");
  console.log(event.target)

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "To Do") {
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "In progress") {
    tasksInProgressEl.appendChild(taskSelected);
  }
  else if (statusValue === "Completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

};


formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
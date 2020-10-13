var pageContentEl = document.querySelector("#page-content");

var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var tasks = [];



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
      type: taskTypeInput,
      status: "to do",
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    console.log(taskDataObj);
    console.log(taskDataObj.status);
  }

}
var completedEditTask = function (taskName, taskType, taskId) {
  console.log(taskName, taskType, taskId);

  // find the matching task list item with task id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");


  // set new values from the form in the header
  taskSelected.querySelector("h3.task-name").textContent = taskName
  taskSelected.querySelector("span.task-type").textContent = taskType;

  //loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

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
  listItemEl.setAttribute("draggable", "true");

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

  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);

  var pushedArr = [1, 2, 3];


  pushedArr.push(4);
  // pushedArr is now [1,2,3,4]

  pushedArr.push("Taskinator");
  // pushedArr is now [1,2,3,4,"Taskinator"]

  pushedArr.push(10, "push", false);
  // pushedArr is now [1,2,3,4,"Taskinator",10,"push",false]


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
  statusSelectEl.setAttribute("name", "status-change");
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

  // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into a new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  //reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;


}

//Task Status Change Handler
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
  //update task's in task array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = status.Value;
    }
  }

};

//DragTask handler
var dragTaskHandler = function (event) {

  //use Dom element to get unique task id
  var taskId = event.target.getAttribute("data-task-id");

  //store the taskId in the dataTransfer property of the event. (setData() method receives 2 arguments - data's value and the data's format
  event.dataTransfer.setData("text/plain", taskId);

  // to verify that dataTransfer property stored the data-task-id attibute
  var getId = event.dataTransfer.getData("text/plain");

}

//verify that the event listener is working
var dropZoneDragHandler = function (event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    event.preventDefault();
    taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
  }
};

var dropTaskHandler = function (event) {
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-task-id='" + id + "']");
  var dropZoneEl = event.target.closest(".task-list");
  var statusType = dropZoneEl.id;

  // set status of task based on dropZone id
  var statusSelectEl = draggableElement.querySelector("select[name='status-change']");

  if (statusType === "tasks-to-do") {
    statusSelectEl.selectedIndex = 0;
  }
  else if (statusType === "tasks-in-progress") {
    statusSelectEl.selectedIndex = 1;
  }
  else if (statusType === "tasks-completed") {
    statusSelectEl.selectedIndex = 2;
  }

  dropZoneEl.removeAttribute("style");
  dropZoneEl.appendChild(draggableElement);

  // loop through tasks array to find and update the updated task's status
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(id)) {
      tasks[i].status = statusSelectEl.value.toLowerCase();
    }
  }

  console.log(tasks);

};

var dragLeaveHandler = function (event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    taskListEl.removeAttribute("style");
  }
}

// var tasks=[
//   {id:1,
//   name:"Add localStorage persistence",
// type: "Web",
// status:"in progress"
// },
// {
//   id: 2,
// name:"Learn JavaScript",
// type: "Web",
// status: "in progress"
// },
// {
//   id: 3,
//   name: "Refactor code",
//   type: "Web",
//   status: "to do"
// }
// ];

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
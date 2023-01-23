var allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
var currentState = "all";
function addTask() {
  var taskName = document.querySelector("#task-name");
  allTasks.push({ id: new Date().getTime(), name: taskName.value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  showTask(allTasks);
  taskName.value = "";
}

function showTask(tasks) {
  var ul = document.querySelector("ul");
  var html = "";
  tasks.forEach((element) => {
    html +=
      `<li class="bg-gray-200 px-3 py-3 my-2 flex justify-between">
        <div class="">
            <input ${element.completed ? "checked" : ""
      } type="checkbox" onclick="completeCheck(this,` +
      element.id +
      `)" value="` +
      element.id +
      `" class="w-4 h-4">
            <label for="" class="${element.completed ? "line-through" : ""}">` +
      element.name +
      `</label>
        </div>
        <button type="button" class="" onclick="deleteTask(` +
      element.id +
      `)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>  
        </button>
        </li>`;
  });
  ul.innerHTML = html;
  var activeTasks = allTasks.filter((task) => {
    return task.completed == false;
  });
  document.getElementById("item-count").innerHTML =
    activeTasks.length + " items left";

  let checkbtn = document.getElementById("check");
  checkbtn.innerText = activeTasks.length ? 'Check All' : "UnCheckAll";
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function checkState(current){
  switch (current) {
    case "complete":
      showcompletedTask();
      break;
    case "active":
      showActiveTask();
      break;
    default:
      showAllTasks();
  }
}

function showActiveTask() {
  currentState = "active";
  var activeTasks = allTasks.filter((task) => {
    return task.completed == false;
  });
  showTask(activeTasks);
}

function showcompletedTask() {
  currentState = "complete";
  var completeTasks = allTasks.filter((task) => {
    return task.completed == true;
  });
  showTask(completeTasks);
}

function showAllTasks() {
  currentState = "all";
  showTask(allTasks);
}

function toogleCheck(){
  var activeTasks = allTasks.filter((task) => {
    return task.completed == false;
  });
  if (activeTasks.length) {
    allTasks.forEach((task) => {
      task.completed = true;
    })
  }
  else {
    allTasks.forEach((task) => {
      task.completed = false;
    })
  }
  checkState(currentState);
}

function deleteTask(index) {
  var id = allTasks.findIndex((task) => {
    return task.id == index;
  });
  allTasks.splice(id, 1);
  checkState(currentState);
}

function completeCheck(el, index) {
  var task = allTasks.find((task) => {
    return task.id == index;
  })
  task.completed = el.checked;
  checkState(currentState);
}

function clearCompleted() {
  allTasks = allTasks.filter((task) => {
    return task.completed == false;
  });
  checkState(currentState);
}

showAllTasks();

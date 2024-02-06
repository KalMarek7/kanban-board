function clicksAndActions() {
  const taskElements = document.querySelectorAll(".task");
  taskElements.forEach((taskElement) => {
    taskElement.addEventListener("dblclick", function () {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobile) {
        this.remove();
        saveData();
      } else {
        taskElement.contentEditable = "true";
        placeCursorAtEnd(taskElement);
      }
    });
    taskElement.addEventListener("blur", () => {
      if (taskElement.textContent === "") {
        taskElement.remove();
      }
      taskElement.contentEditable = "false";
      saveData();
    });
    taskElement.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter") {
        taskElement.blur();
      }
    });
  });
}

function saveData() {
  const kanbanHTMLCollection = document.getElementsByClassName("taskContainer");
  const dataObject = {
    0: {},
    1: {},
    2: {},
  };
  for (let i = 0; i < kanbanHTMLCollection.length; i++) {
    if (kanbanHTMLCollection[i].children.length === 0) {
      dataObject[i] = {};
    } else {
      for (let j = 0; j < kanbanHTMLCollection[i].children.length; j++) {
        dataObject[i][j] = {};
        dataObject[i][j]["id"] = kanbanHTMLCollection[i].children[j].id;
        dataObject[i][j]["textContent"] =
          kanbanHTMLCollection[i].children[j].textContent;
      }
    }
  }
  localStorage.setItem("kanbanData", JSON.stringify(dataObject));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("kanbanData"));
  if (data === null) {
    console.log("nothing in here");
    return;
  }
  for (let i = 0; i < 3; i++) {
    for (const j of Object.keys(data[i])) {
      if (i === 0) {
        // #notStarted
        displayData("notStarted", data[i][j].id, data[i][j].textContent);
      } else if (i === 1) {
        // #inProgress
        displayData("inProgress", data[i][j].id, data[i][j].textContent);
      } else if (i === 2) {
        // #completed
        displayData("completed", data[i][j].id, data[i][j].textContent);
      }
    }
  }
  clicksAndActions();
}

function displayData(ContainerId, taskId, textContent) {
  const taskContainer = document.getElementById(ContainerId);
  const task = document.createElement("p");

  task.textContent = textContent;
  task.value = textContent;
  task.className = "task";
  task.id = taskId;
  task.draggable = "true";
  task.addEventListener("dragstart", drag);
  taskContainer.appendChild(task);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text/html", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text/html");

  if (
    ev.target.tagName.toLowerCase() === "p" ||
    ev.target.tagName.toLowerCase() === "div"
  ) {
    ev.target
      .closest(".kanbanContainer")
      .querySelector(".taskContainer")
      .appendChild(document.getElementById(data));
  } else {
    ev.target
      .querySelector(".taskContainer")
      .appendChild(document.getElementById(data));
  }
  saveData();
}

function placeCursorAtEnd(element) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

document.addEventListener("DOMContentLoaded", loadData);

document.getElementById("addButton").addEventListener("click", () => {
  const newTask = document.getElementById("newTask");
  const notStartedContainer = document.getElementById("notStarted");
  const userInput = document.createElement("p");
  if (newTask.value === "") {
    newTask.placeholder = "Enter a task";
    return;
  }
  userInput.textContent = newTask.value;
  userInput.value = newTask.value;
  userInput.className = "task";
  userInput.id = Math.floor(Math.random() * 100 * (Math.random() * 100));
  userInput.draggable = "true";
  userInput.addEventListener("dragstart", drag);
  notStartedContainer.appendChild(userInput);
  newTask.value = "";
  newTask.placeholder = "New task";

  clicksAndActions();
  saveData();
});

document.getElementById("newTask").addEventListener("keypress", (ev) => {
  if (ev.key === "Enter") {
    document.getElementById("addButton").click();
  }
});

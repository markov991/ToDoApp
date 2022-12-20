import {
  renderingTaskForm,
  renderingTasks,
  renderingTaskInfo,
  renderingTaskContainers,
} from "./renFunctions.js";
export {
  events,
  sendingParToRenderingTask,
  delitingEmptyContainers,
  openingTaskDetail,
  setLocalStorage,
};

const addbutton = document.querySelector(".add-new-task");
const modal = document.querySelector(".modal");
const defaultevents = document.querySelector(".default");
const eventsContainer = document.querySelector(".events");
const events = ["Frontend"];
const tasks = [
  {
    taskName: "Learn React",
    description:
      "Lorem ipsum dolor sit amet consectetur,adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "2023-02-01",
    eventName: "Frontend",
    status: "ongoing",
    dateCreated: "2022-01-01",
  },
  {
    taskName: "Learn HTML",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "",
    eventName: "Frontend",
    status: "finished",
    dateCreated: "2022-01-01",
  },
  {
    taskName: "Learn CSS",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "",
    eventName: "Frontend",
    status: "finished",
    dateCreated: "2022-01-01",
  },
  {
    taskName: "Learn JS",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "",
    eventName: "Frontend",
    status: "finished",
    dateCreated: "2022-01-01",
  },
  {
    taskName: "Learn Python",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "2020-06-08",
    eventName: "Frontend",
    status: "unfinished",
    dateCreated: "2022-01-01",
  },
];

const addingTask = function () {
  addbutton.addEventListener("click", function () {
    modal.classList.toggle("hidden");
    modal.innerHTML = "";
    renderingTaskForm();
    collectingDataForTasks();
    document.getElementById("event-input").insertAdjacentHTML(
      "afterbegin",
      events.forEach((event) => `<option value="${event}">${event}</option>`)
    );
  });
};
// addEventListener("load", () => renderingEvents());
const collectingDataForTasks = function () {
  const subbTask = document.querySelector(".subb-button");
  if (!modal.classList.contains("hidden")) {
    subbTask.addEventListener("click", function () {
      const taskName = document.getElementById("task-name");
      const taskDescription = document.getElementById("task-description");
      const dateInput = document.getElementById("date-input");
      const eventInput = document.querySelector(".event-input");
      if (
        !(taskName.value.length === 0 || taskDescription.value.length === 0)
      ) {
        modal.classList.toggle("hidden");
        tasks.push({
          taskName: taskName.value,
          description: taskDescription.value,
          date: dateInput.value,
          eventName: eventInput.value,
          status: "ongoing",
          dateCreated: getCurentDate(),
        });
        if (
          !(events.includes(eventInput.value) || eventInput.value.length === 0)
        )
          events.push(eventInput.value);
      } else {
        document.getElementById("task-description").style.borderColor = "red";
        document.getElementById("task-name").style.borderColor = "red";

        const warnings = document
          .querySelector(".reqierd-fields")
          .querySelectorAll("span");
        warnings.forEach((element) => element.classList.remove("hidden"));
      }

      eventsContainer.innerHTML = "";
      renderingEvents();
      setLocalStorage();
    });
  }
};
const renderingEvents = function () {
  events.forEach((event) => {
    eventsContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="event">${event}</div>`
    );
  });

  const event = eventsContainer.getElementsByTagName("div");

  for (let i = 0; i < event.length; i++) {
    event[i].addEventListener("click", () => {
      document.querySelector(".main-bar").innerHTML = "";
      renderingTaskContainers();
      sendingParToRenderingTask(event[i].innerText);

      openingTaskDetail();
      delitingEmptyContainers();
    });
  }
  
};
const sendingParToRenderingTask = function (
  eventName,
  stat,
  creaDate,
  deadline
) {
  tasks.forEach((task, index) => {
    if (
      eventName === task.eventName

      // &&
      // task.status === "ongoing"
    ) {
      // openingTaskDetail(index);
     
      renderingTasks(
        document.querySelector(`.${task.status}-tasks-containter`),
        task.status,
        task.taskName,
        task.description,
        index
      );
    }
    if (stat === task.status) {
      renderingTasks(
        document.querySelector(`.${task.status}-tasks-containter`),
        task.status,
        task.taskName,
        task.description,
        index
      );
    }
    if (creaDate === task.dateCreated) {
      renderingTasks(
        document.querySelector(`.${task.status}-tasks-containter`),
        task.status,
        task.taskName,
        task.description,
        index
      );
    }
    if (deadline === task.date) {
      renderingTasks(
        document.querySelector(`.${task.status}-tasks-containter`),
        task.status,
        task.taskName,
        task.description,
        index
      );
    }
  });
};

//Problem when need to render tasks that are not in original task array
const openingTaskDetail = function () {
  const eventTasks = document.querySelectorAll(`.task`);
  for (let i = 0; i < eventTasks.length; i++) {
    eventTasks[i].addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.innerHTML = "";
      renderingTaskInfo(
        tasks[eventTasks[i].id],
        tasks[eventTasks[i].id].taskName,
        tasks[eventTasks[i].id].description,
        tasks[eventTasks[i].id].date,
        tasks[eventTasks[i].id].status,
        tasks[eventTasks[i].id].dateCreated
      );
    });
  }
  
};

addingTask();

const delitingEmptyContainers = function () {
  const statuses = ["ongoing", "finished", "unfinished"];
  statuses.forEach((status) => {
    if (
      document.querySelector(`.${status}-tasks-containter`).children.length ===
      0
    ) {
      document.querySelector(`.${status}-list`).remove();
    }
  });
};
const ongoingEvents = function () {
  document.querySelector(".main-bar").innerHTML = "";
  renderingTaskContainers();
  sendingParToRenderingTask(undefined, "ongoing");
  delitingEmptyContainers();
  openingTaskDetail();
};

addEventListener("load", () => {
  getLocalStorage();

  checkingStatus();
  checkingForEvents();
  renderingEvents();
  ongoingEvents();
});
defaultevents.addEventListener("click", () => ongoingEvents());
const dateSelector = document.querySelector("#date");

document.querySelector("#filter-by-in-date").addEventListener("click", () => {
  if (dateSelector.value.length > 0) {
    document.querySelector(".main-bar").innerHTML = "";
    renderingTaskContainers();
    sendingParToRenderingTask(undefined, undefined, dateSelector.value);
    delitingEmptyContainers();
    openingTaskDetail();
  }
});

document.querySelector("#filter-by-dedline").addEventListener("click", () => {
  if (dateSelector.value.length > 0) {
    document.querySelector(".main-bar").innerHTML = "";
    renderingTaskContainers();
    sendingParToRenderingTask(
      undefined,
      undefined,
      undefined,
      dateSelector.value
    );
    delitingEmptyContainers();
    openingTaskDetail();
  }
});

const getCurentDate = function () {
  let now = new Date();
  return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
};

const checkingStatus = function () {
  tasks.forEach((task) => {
    let date = task.date;
    for (let i = 0; i < date.length; i++) {
      if (date[i] === getCurentDate()[i]) {
        continue;
      }
      if (date[i] < getCurentDate()[i]) {
        task.status = "unfinished";
      } else {
        break;
      }
    }
  });
};

const setLocalStorage = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("tasks"));

  if (!data) return;
  data.forEach((task, index) => {
    if (!(JSON.stringify(task) === JSON.stringify(tasks[index]))) {
      tasks.push(task);
    }
  });
};

const checkingForEvents = function () {
  tasks.forEach((task) => {
    if (!(events.includes(task.eventName) || task.eventName.length === 0))
      events.push(task.eventName);
  });
};

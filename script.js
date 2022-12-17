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
  // console.log(x);
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
      console.log(task.taskName);
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
  //  addEventListener("click", () => console.log(element));
};

const renderingTaskContainers = function () {
  document.querySelector(".main-bar").insertAdjacentHTML(
    "afterbegin",
    `
  <div class="ongoing-list">
    <h3 class="task-header">ONGOING TASKS</h3>
    <div class="ongoing-tasks-containter"></div>
    
  </div>
  <div class="finished-list">
    <h3 class="task-header">FINISHED TASKS</h3>
    <div class="finished-tasks-containter"></div>
    
  </div>

  <div class="unfinished-list">
    <h3 class="task-header">UNFINISHED TASKS</h3>
    <div class="unfinished-tasks-containter"></div>

  </div>
`
  );
};

const renderingTaskInfo = function (
  taskId,
  taskName,
  taskDescription,
  taskDate,
  taskStatus,
  dateAdded = "no info"
) {
  modal.insertAdjacentHTML(
    "afterbegin",
    ` 
      <div class="modal-taskname">${taskName}</div>
      <div class = "modal-task-descripton-container">
        <div class="modal-task-descripton">${taskDescription}</div>
        <div class="modal-other-info">
          <div>Date added: ${dateAdded}</div>
          <div>Dedline date: ${taskDate}</div>
          <div >Task status: <span class="status-marker-${taskStatus}">${taskStatus.toUpperCase()}</span></div>
        
        </div>
        </div>
        <div class="modal-buttons">
          <button class="confirm-button">Confirm</button>
          <button class = "close-button">Close</button>
        </div>


`
  );

  document.querySelector(".confirm-button").addEventListener("click", () => {
    taskId.status = "finished";
    modal.classList.toggle("hidden");

    document.querySelector(".main-bar").innerHTML = "";
    renderingTaskContainers();
    sendingParToRenderingTask(taskId.eventName);
    delitingEmptyContainers();

    openingTaskDetail();

    console.log(taskId);
  });
  document.querySelector(".close-button").addEventListener("click", () => {
    modal.classList.toggle("hidden");
    modal.innerHTML = "";
  });
};

const renderingTasks = function (
  location,
  status,
  taskName,
  taskDescription,
  taskId
) {
  location.insertAdjacentHTML(
    "beforeend",
    `
  
    
      <div class="${status}-task task" id="${taskId}">
        <h4 class="task-name">${taskName}</h4>
        <div class="task-description">
          <p>${taskDescription}
            
          </p>
        </div>
      </div>
    </div>`
  );
};

const renderingTaskForm = function () {
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="new-task-form">
      <div class="input-container">
        <div class="reqierd-fields">
          <label for="task-name">Task name</label>
          <input type="text" id="task-name" name="task-name" size="20" />
          <span id ="warning" class='warning hidden'>This field is reqierd</span>
          <label for="task-description">Task description</label>
          <textarea
            name="task-description"
            id="task-description"
            cols="30"
            rows="5"
          ></textarea>
          <span id ="warning" class='warning hidden'>This field is reqierd</span>
        </div>
        <div class="optonal-fields">
          <label for="date">Chose a date</label>
          <input type="date" id="date-input" />
          <label for="event">Event</label>
          <select name="event"id="event-input" class= "event-input">
            <option value=""></option>
				    <option value="New">New</option>
            
							
			</select><br>

      
      <input type="text" class= "event-input hidden" id="event-input-new" name="task-name" size="20" placeholder="Plaese enter event name" />

        </div>
      </div>
      <button class="subb-button">Subbmit</button>
    </div>
  `
  );
  events.forEach((event) => {
    document
      .getElementById("event-input")
      .insertAdjacentHTML(
        "beforeend",
        `<option value="${event}">${event}</option>`
      );
  });

  document.getElementById("event-input").addEventListener("click", () => {
    if (document.getElementById("event-input").value === "New") {
      document.getElementById("event-input-new").classList.toggle("hidden");
      document.getElementById("event-input").classList.toggle("event-input");
    }
  });
};

defaultevents.addEventListener("click", () => console.log("hello"));

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
      if (!(date[i] >= getCurentDate()[i])) {
        task.status = "unfinished";
        break;
      } else break;
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

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
    date: "",
    eventName: "Frontend",
    status: "ongoing",
  },
  {
    taskName: "Learn HTML",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "",
    eventName: "Frontend",
    status: "finished",
  },
  {
    taskName: "Learn CSS",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "",
    eventName: "Frontend",
    status: "finished",
  },
  {
    taskName: "Learn JS",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "",
    eventName: "Frontend",
    status: "finished",
  },
  {
    taskName: "Learn Python",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odit quos in reprehenderit ipsum maiores",
    date: "2020-06-08",
    eventName: "Frontend",
    status: "unfinished",
  },
];

const addingTask = function () {
  addbutton.addEventListener("click", function () {
    modal.classList.toggle("hidden");
    modal.innerHTML = "";
    renderingTaskForm();
    collectingDataForTasks();
  });
};

const collectingDataForTasks = function () {
  const subbTask = document.querySelector(".subb-button");
  if (!modal.classList.contains("hidden")) {
    subbTask.addEventListener("click", function () {
      const taskName = document.getElementById("task-name");
      const taskDescription = document.getElementById("task-description");
      const dateInput = document.getElementById("date-input");
      const eventInput = document.getElementById("event-input");
      tasks.push({
        taskName: taskName.value,
        description: taskDescription.value,
        date: dateInput.value,
        eventName: eventInput.value,
        status: "ongoing",
      });
      if (!events.includes(eventInput.value)) {
        events.push(eventInput.value);
      }
      modal.classList.toggle("hidden");
      eventsContainer.innerHTML = "";
      renderingEvents();
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

      tasks.forEach((task) => {
        if (
          event[i].innerText === task.eventName
          // &&
          // task.status === "ongoing"
        ) {
          console.log(task.taskName);
          renderingTasks(
            document.querySelector(`.${task.status}-tasks-containter`),
            task.status,
            task.taskName,
            task.description
          );
        }
      });
    });
  }
  // console.log(x);
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

const renderingTasks = function (location, status, taskName, taskDescription) {
  location.insertAdjacentHTML(
    "beforeend",
    `
  
    
      <div class="${status}-task">
        <h4 class="task-name">${taskName}</h4>
        <div class="task-description">
          <p>${taskDescription}
            
          </p>
        </div>
      </div>
    </div>`
  );
};
addEventListener("load", () => renderingEvents());
const renderingTaskForm = function () {
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="new-task-form">
      <div class="input-container">
        <div class="reqierd-fields">
          <label for="task-name">Task name</label>
          <input type="text" id="task-name" name="task-name" size="20" />
          <label for="task-description">Task description</label>
          <textarea
            name="task-description"
            id="task-description"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div class="optonal-fields">
          <label for="date">Chose a date</label>
          <input type="date" id="date-input" />
          <label for="event">Event</label>
          <input type="text" name="event" id="event-input" size="20" />
        </div>
      </div>
      <button class="subb-button">Subbmit</button>
    </div>
  `
  );
};

defaultevents.addEventListener("click", () => console.log("hello"));

addingTask();

//logic for deleting empty containers
// _____________IN PROGRES__________________
/*
const delitingEmptyContainers = function () {
  const statuses = ["ongoing", "finished", "unfinished"];
  statuses.forEach((status) => {
    if (
      !document.querySelector(`.${status}-tasks-containter`).children[0]
        .className === `${status}-task`
    ) {
      document.querySelector(`.${status}-list`).remove();
    }
  });
  // const y = document.querySelector(".finished-tasks-containter").children;
  // console.log(y[0].className === "finished-task");
};

// const y = document.querySelector(".event").value;
// for (element of y) {
//   console.log(element);
// }
// y.forEach((element) => console.log(element));
*/

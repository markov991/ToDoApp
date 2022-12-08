const addbutton = document.querySelector(".add-new-task");
const modal = document.querySelector(".modal");
const defaultevents = document.querySelector(".default");
const events = [];
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
    taskName: "Learn React",
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
      });
      events.push(eventInput.value);
      modal.classList.toggle("hidden");
    });
  }
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

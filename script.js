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
    document.getElementById("event-input").insertAdjacentHTML(
      "afterbegin",
      events.forEach((event) => `<option value="${event}">${event}</option>`)
    );
  });
};
addEventListener("load", () => renderingEvents());
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
        });
        if (
          !(events.includes(eventInput.value) || eventInput.value.length === 0)
        )
          events.push(eventInput.value);
      } else {
      }

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
      delitingEmptyContainers();
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

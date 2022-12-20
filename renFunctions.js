import {
  events,
  sendingParToRenderingTask,
  delitingEmptyContainers,
  openingTaskDetail,
  setLocalStorage,
} from "./script.js";
const modal = document.querySelector(".modal");
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
    setLocalStorage();
  });
  document.querySelector(".close-button").addEventListener("click", () => {
    modal.classList.toggle("hidden");
    modal.innerHTML = "";
  });
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

export {
  renderingTaskForm,
  renderingTasks,
  renderingTaskInfo,
  renderingTaskContainers,
};

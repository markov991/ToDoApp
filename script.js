const addbutton = document.querySelector(".add-new-task");
const modal = document.querySelector(".modal");
const defaultevents = document.querySelector(".default");

const addtask = function () {
  addbutton.addEventListener("click", function () {
    modal.classList.toggle("hidden");
    modal.innerHTML = "";
    renderingTaskForm();
  });
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
          <input type="date" />
          <label for="event">Event</label>
          <input type="text" name="event" id="event" size="20" />
        </div>
      </div>
      <button class="subb-button">Subbmit</button>
    </div>
  `
  );
};

defaultevents.addEventListener("click", () => console.log("hello"));

addtask();
let events = [];

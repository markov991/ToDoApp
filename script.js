const addbutton = document.querySelector(".add-new-task");
const modal = document.querySelector(".modal");

const addtask = function () {
  addbutton.addEventListener("click", function () {
    modal.classList.toggle("hidden");
  });
};

addtask();
let events = [];

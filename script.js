const toDoList = document.querySelector(".todo-list");
const createBtn = document.querySelector(".create-btn");

let toDos = [];

createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
  const item = {
    text: "",
    id: Date.now(),
    complete: false,
  };

  toDos.push(item);
  const { itemEl, inputEl } = createToDoElement(item);
  toDoList.prepend(itemEl);
  inputEl.removeAttribute("disabled");
  inputEl.focus();
  saveToDos();
}

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
  const target = event.target.parentElement.parentElement;
  target.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(target.id));
  saveToDos();
}

function createToDoElement(item) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  itemEl.id = item.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  if (item.complete) {
    itemEl.classList.add("complete");
  }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");

  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;
    saveToDos();
  });

  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", true);
  });

  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtnEl = document.createElement("button");
  editBtnEl.classList.add("material-symbols-outlined");
  editBtnEl.innerText = "edit";

  const deleteBtnEl = document.createElement("button");
  deleteBtnEl.classList.add("material-symbols-outlined", "remove-btn");
  deleteBtnEl.innerText = "do_not_disturb_on";

  editBtnEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });

  deleteBtnEl.addEventListener("click", deleteToDo);

  actionsEl.append(editBtnEl);
  actionsEl.append(deleteBtnEl);

  itemEl.append(checkbox);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;

    if (item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }

    saveToDos();
  });

  return { itemEl, inputEl };
}

const savedToDos = localStorage.getItem("todos");

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach((item) => {
    const { itemEl } = createToDoElement(item);
    toDoList.prepend(itemEl);
  });
}

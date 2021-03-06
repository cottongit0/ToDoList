"use strict";

const todoSection = document.getElementById("todo");
const list = todoSection.querySelector("#list");
const input = todoSection.querySelector("input");
const item = todoSection.querySelector("#item");
const delBtn = todoSection.querySelector(".delBtn");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGE = "lineThrough";

// 투 두 리스트 팝업
document.querySelector(".material-icons.list").addEventListener("click", () => {
  todoSection.style.display = "flex";
});
todoSection.querySelector(".fas.fa-times").addEventListener("click", () => {
  todoSection.style.display = "none";
});

let LIST, id;

let data = localStorage.getItem("TODO");

// 투 두 리스트 로컬 저장
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// 투 두 리스트 출력
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGE : "";

  const item = `
  <li class="item">
    <i class="far ${DONE}" job="complete" id="0"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fas fa-trash-alt delBtn" job="delete" id="${id}"></i>
  </li>
  `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// 투 두 리스트 입력
item.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    const toDo = input.value;

    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      saveToDo();
      id++;
    }
    input.value = "";
  }
});

// 로컬 저장소에 저장
function saveToDo() {
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

// 투 두 리스트 완료 시, 체크 기능
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGE);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// 투 두 리스트 제거 기능
function removeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  list.removeChild(li);
  const cleanToDo = LIST.filter((LIST) => {
    LIST.id !== parseInt(li.id);
  });
  LIST = cleanToDo;
  saveToDo();
}

list.addEventListener("click", (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(event);
  }
  saveToDo();
});

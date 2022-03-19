"use strict";
const input = document.querySelector(".add_task_input");
const button = document.querySelector(".button_add");
const result = document.querySelector(".wrapper_task");
let c = document.querySelector(".header_span2");
let filter = document.querySelector(".filter");

let massiv = [];
let count = 0;
let filterValue;
if (localStorage.getItem("todo")) {
  massiv = JSON.parse(localStorage.getItem("todo"));
  addMassage();
  changecolor();
}
if (localStorage.getItem("count")) {
  count = JSON.parse(localStorage.getItem("count"));
  plus();
}
if (localStorage.getItem("active")) {
  filterValue = JSON.parse(localStorage.getItem("active"));
  if (count !== 0) {
    filter.value = filterValue;
    activechoose();
  }
}
// localStorage.clear();
button.addEventListener("click", pushBTN);
// ------------------------------------------------------------------------------------- обработчик на кнопку
input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13 && input.value !== "") {
    pushBTN();
    changecolor();
  }
});
// --------------------------------------------------------------------------------------обработчик на enter
result.addEventListener("click", (event) => {
  let removeDIVRESULT = document.querySelectorAll(".add_task_result");
  let getIdButton = event.target.getAttribute("id");
  if (event.target.closest("button")) {
    // let getIdButton = event.target.getAttribute('id');
    removeDIVRESULT.forEach((item, index) => {
      if (item.getAttribute("id") === getIdButton) {
        if (massiv[index].checked !== true) {
          console.log("Чекбокс не стоит");
          count--;
          plus();
        } else {
          console.log("чекбокс стоит");
        }
        massiv.splice(index, 1);
        item.remove();
        // console.log(item.getAttribute("id"), getIdButton);
        console.log(massiv);
      }
    });
    localStorage.setItem("todo", JSON.stringify(massiv));
    localStorage.setItem("count", JSON.stringify(count));
  }
  if (event.target.closest(".checkbox_task")) {
    // let getIdButton = event.target.getAttribute('id');
    for (let i = 0; i < massiv.length; i++) {
      if (removeDIVRESULT[i].getAttribute("id") === getIdButton) {
        massiv[i].checked = !massiv[i].checked;
        if (massiv[i].checked === true && count !== 0) {
          count--;
          plus();
        } else {
          count++;
          plus();
        }
        if (filter.value === "all-active" && massiv[i].checked === true) {
          let c = document.querySelectorAll(".add_task_result");
          // let b = c[i].classList.add("add_task_input2");
          setTimeout(() => {
            c[i].classList.add("add_task_input2");
          }, 1000);
        }
        if (filter.value === "all-inactive" && massiv[i].checked === false) {
          let c = document.querySelectorAll(".add_task_result");
          // let b = c[i].classList.add("add_task_input2");
          setTimeout(() => {
            c[i].classList.add("add_task_input2");
          }, 1000);
        }
        break;
      }
    }
    changecolor();
    localStorage.setItem("todo", JSON.stringify(massiv));
    localStorage.setItem("count", JSON.stringify(count));
  }
});
// ----------------------------------------------------------------------------------------------- обработчик на удалить и на checkbox

//Функции
function pushBTN() {
  if (input.value !== "") {
    count++;
    let addobjectinmassiv = {
      name: input.value,
      checked: false,
    };
    massiv.push(addobjectinmassiv);
    addMassage();
    changecolor();
    plus();
    activechoose();
    console.log(massiv);
    input.value = "";
    localStorage.setItem("todo", JSON.stringify(massiv));
    localStorage.setItem("count", JSON.stringify(count));
  } else {
    alert("вы ничего не ввели");
  }
}
// ---------------------------- функция кнопка добавить
function addMassage() {
  let displayMassage = "";
  massiv.forEach((item, index) => {
    displayMassage += `<div class="add_task_result" id = "id_${index}">
        <span class="add_task_result_text" "id_${index}">${item.name}</span>
        <div>
        <input type ="checkbox" class = "checkbox_task" ${
          item.checked ? "checked" : ""
        } id = "id_${index}">
        <button class="add_task_result_text_remove"id = "id_${index}">удалить</button></label>
        </div>
        </div>`;
    result.innerHTML = displayMassage;
  });
}
// --------------------------------- функция добовляет текст на страницу

function changecolor() {
  let c = document.querySelectorAll(".add_task_result");
  let b = document.querySelectorAll(".add_task_result_text");
  for (let i = 0; i < massiv.length; i++) {
    if (massiv[i].checked) {
      c[i].classList.add("add_task_input1");
      b[i].classList.add("add_task_result_text1");
    } else {
      c[i].classList.remove("add_task_input1");
      b[i].classList.remove("add_task_result_text1");
    }
  }
}
// -----------------------------------------------функция меняет цвет у элемента

filter.addEventListener("change", () => {
  filterValue = filter.value;
  activechoose();
  localStorage.setItem("active", JSON.stringify(filterValue));
});

function plus() {
  c.innerHTML = count;
}

function activechoose() {
  let c = document.querySelectorAll(".add_task_result");
  if (filterValue === "all") {
    massiv.forEach((item, index) => {
      c[index].classList.remove("add_task_input2");
    });

    // console.log("выбраны все ");
  }
  if (filterValue === "all-active") {
    massiv.forEach((item, index) => {
      if (item.checked === true) {
        c[index].classList.add("add_task_input2");
      } else {
        c[index].classList.remove("add_task_input2");
      }
    });

    // console.log("выбраны активные");
  }
  if (filterValue === "all-inactive") {
    massiv.forEach((item, index) => {
      if (item.checked === false) {
        c[index].classList.add("add_task_input2");
      } else {
        c[index].classList.remove("add_task_input2");
      }
    });
    // console.log("выбраны отмеченные");
  }
}

// localStorage.clear();

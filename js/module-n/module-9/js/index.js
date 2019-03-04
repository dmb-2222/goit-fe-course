"use strict";
/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/

  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/
let counter = 0;
let timerId = null;
let isActive = false;
// Доступ к значению секундомера
let minutesContainer = document.querySelector(".js-time");
// Доступ к кнопкам start lap stop
let start = document.querySelector(".js-start");
let lap = document.querySelector(".js-take-lap");
let reset = document.querySelector(".js-reset");
// Доступ куда будем записывать значение Lap
let ulLap = document.querySelector(".js-laps");
// Запись laps
lap.addEventListener("click", handleLap);
function handleLap() {
  let li = document.createElement("li");
  li.textContent = upDateConterValue();
  ulLap.append(li);
  // if (handleReset()){
  //   li.remove();
  // }
}

// запуск таймера
start.addEventListener("click", handleStart);
function handleStart() {
  if (!isActive) {
    isActive = true;
    timerId = setInterval(upDateConterValue, 10);
    start.textContent = "Pause";
  } else if (isActive) {
    isActive = false;
    clearInterval(timerId);
    start.textContent = "Continue";
  }
}
// Изменение данных в таймере
function upDateConterValue() {
  counter++;
  let miliseconds = counter % 100;
  let sec = Math.floor((counter / 100) % 60);
  let min = Math.floor((counter / 6000) % 60);
  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  minutesContainer.textContent = `${min}:${sec}.${miliseconds}`;
  return minutesContainer.textContent;
}
// Запускаем функцию reset
reset.addEventListener("click", handleReset);
function handleReset() {
  clearInterval(timerId);
  counter = 0;
  isActive = false;
  start.textContent = "Start";
  minutesContainer.textContent = `00:00.0`;
}

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/

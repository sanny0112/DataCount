const MonthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const SecName = ['секунд', 'секунда', 'секунды'];
const MinName = ['минут', 'минута', 'минуты'];
const HourName = ['часов', 'час', 'часа'];
const DayName = ['дней', 'день', 'дня'];


let DateFor = new Date('dec 28 2024 16:00:0');
document.getElementsByClassName('final-date')[0].innerText = DateFor.getDate() + ' ' + MonthName[DateFor.getMonth()] + ' ' + DateFor.getFullYear() + ' ' + Normalize(DateFor.getHours(),1) + ':' + Normalize(DateFor.getMinutes(),1);


document.querySelector('.final-date').onclick = CalendClickActive;
document.querySelector('.calendar').onchange = CalendClick;
TimerUpdate();
setInterval(TimerUpdate, 1000);

function CalendClickActive() {
  document.querySelector('.calendar').classList.toggle('active')
}

function CalendClick() {
  let CalendDateSelect = document.querySelector('.calendar').value;
  if (new Date(CalendDateSelect) - new Date() > 0) {
    DateFor = new Date(CalendDateSelect);
    document.getElementsByClassName('final-date')[0].innerText = DateFor.getDate() + ' ' + MonthName[DateFor.getMonth()] + ' ' + DateFor.getFullYear() + ' ' + Normalize(DateFor.getHours(),1) + ':' + Normalize(DateFor.getMinutes(),1);
    document.querySelector('.calendar').classList.toggle('active')
  }
}

function TimerUpdate() {
  let dif = DateFor - new Date();
  let days = Normalize(Math.floor(dif / 1000 / 60 / 60 / 24));
  let hours = Normalize(Math.floor(dif / 1000 / 60 / 60) % 24);
  let minutes = Normalize(Math.floor(dif / 1000 / 60) % 60);
  let seconds = Normalize(Math.floor(dif / 1000) % 60);

  if (document.getElementById('days').innerText != days)
    document.getElementById('days').innerText = days;
  if (document.getElementById('hours').innerText != hours)
    document.getElementById('hours').innerText = hours;
  if (document.getElementById('minutes').innerText != minutes)
    document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;

  document.querySelectorAll('.name').forEach(element => {
    element.innerText = FixName(element.previousElementSibling.innerText, element.innerText.substr(0, 1));
  });
}

function Normalize(num, flag=0) {
  if (flag == 0)
	return (num < 10 && num != 0) ? '0' + num : num;
  return (num < 10) ? '0' + num : num;
}

function FixName(ValueText, key = 'с') {
  Value = +ValueText;
  let WorkArray;
  if (key == 'с')
    WorkArray = SecName;
  else if (key == 'м')
    WorkArray = MinName;
  else if (key == 'ч')
    WorkArray = HourName;
  else if (key == 'д')
    WorkArray = DayName;
  if (Value >= 10 && Value <= 19)
    return WorkArray[0];
  let modValue = Value % 10;
  if (modValue == 0 || (modValue >= 5 && modValue <= 9))
    return WorkArray[0];
  if (modValue >= 2 && modValue <= 4)
    return WorkArray[2];
  if (modValue == 1)
    return WorkArray[1];
}
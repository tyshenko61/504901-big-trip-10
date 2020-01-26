import flatpickr from "flatpickr";
import moment from "moment";
import {Russian} from "flatpickr/dist/l10n/ru.js";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

export const setFlatpickr = (element, date) => {
  return flatpickr(element, {
    allowInput: true,
    defaultDate: date,
    enableTime: true,
    locale: Russian,
    dateFormat: `m/d/y H:i`,
    altInput: true,
    altFormat: `d/m/y H:i`,
  });
};
const MONTHNAMES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];
/* export const formatDateTime = (date) => {
  const time = formatTime(date);
  const day = date.getDate();
  const dayDate = day < 10 ? `0${day}` : `${day}`;
  const month = date.getMonth() + 1;
  const monthDate = month < 10 ? `0${month}` : `${month}`;
  const year = date.getFullYear().toString(10).slice(2);
  return `${dayDate}/${monthDate}/${year} ${time}`;
};
*/
export const formatDate = (date) => {
  return moment(date).format(`DD/MM/YY`);
  /*const day = date.getDate();
   const dayDate = day < 10 ? `0${day}` : `${day}`;
  const month = date.getMonth() + 1;
  const monthDate = month < 10 ? `0${month}` : `${month}`;
  const year = date.getFullYear().toString(10).slice(2);
  return `${dayDate}/${monthDate}/${year}`;*/
};
/*
export const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursDate = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesDate = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursDate}:${minutesDate}`;
};
*/
export let duration;
duration = (date1, date2) => {
  const diffTime = moment(date2).diff(date1);
  const mDuration = moment.duration(diffTime);
  let day = mDuration.days();
  let hours = mDuration.hours();
  let minutes = mDuration.minutes();
  if (day === 0) {
    day = ``;
  } else if (day >= 9) {
    day = `${day}D `;
  } else {
    day = `0${day}D `;
  }
  if (!day) {
    if (hours === 0) {
      hours = ``;
    } else if (hours < 9) {
      hours = `0${hours}H `;
    } else {
      hours = `${hours}H `;
    }
  } else {
    hours = (hours < 9) ? `0${hours}H ` : `${hours}H `;
  }

  minutes = (minutes < 9) ? `0${minutes}M` : `${minutes}M`;
  return `${day}${hours}${minutes}`;
};
export const formatInfoDate = (date1, date2) => {
  const month1 = MONTHNAMES[date1.getMonth()];
  const month2 = MONTHNAMES[date2.getMonth()];
  const day1 = date1.getDate();
  const day2 = date2.getDate();
  if (date1.getMonth() > date2.getMonth()) {
    return `${day1} ${month1} &mdash;&nbsp;${day2} ${month2} `;
  } else {
    return `${month1} ${day1} &mdash;&nbsp;${day2}`;
  }
};
export const formatDateList = (date) => {
  const num = parseInt(date.slice(3, 5), 10) - 1;
  const month = MONTHNAMES[num];
  const day = parseInt(date.slice(0, 2), 10);
  return `${month} ${day}`;
};
export const getDestination = (name, group) => {
  return name[0].toUpperCase() + name.slice(1) + ` ` + group;
}


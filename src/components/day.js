import {formatDateList} from "../utils/format.js";
import AbstractComponent from "./abstract-component.js";
import {formatDate} from "../utils/format";

const getDaysEvents = (points) => {
  const uniqueDays = points.map((point) => {
    return formatDate(point.date[0]);
  });
  return Array.from(new Set(uniqueDays));
};
export const generateTripDays = (points) => {
  let tripDays = [];
  let currentCards = [];
  const days = getDaysEvents(points);
  days.forEach((day) => {
    currentCards = points.filter((point) => formatDate(point.date[0]) === day);
    tripDays.push(currentCards);
  });
  return tripDays;
};
const createDayBoardTemplates = (tripDays) => (
  `<ul class="trip-days">${createDayBoardTemplate(tripDays)}</ul>`
);
const createDayBoardTemplate = (tripDays) => {
  return (tripDays.map((day, i) => {
    const dayDate = day[0].date[0];
    const date = formatDate(dayDate);
    const dateList = formatDateList(date);
    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${i + 1}</span>
          <time class="day__date" datetime="${date}">${dateList}</time>
        </div>
        <ul class="trip-events__list" data-date="${date}"></ul>
      </li>`
    );
  }).join(`\n`));
};
export default class Day extends AbstractComponent {
  constructor(tripDays) {
    super();
    this._tripDays = tripDays;
  }

  getTemplate() {
    return createDayBoardTemplates(this._tripDays);
  }
}

import {formatDateList, formatDate} from "../utils";
import {createCardTemplate} from "./card";
import {createCardEditTemplate} from "./edit-card";

const listDate = (points) => {
  let dates = [];
  let date1 = ``;
  let date2 = ``;
  points.map((point) => {
    date1 = date2;
    date2 = formatDate(point.date[0]);
    if (date1 !== date2) {
      dates.push(date2);
    }
  });
  return dates;
};
const dayListTemplate = (points) => {
  return Array.from(points).map((point) => {
    return createCardTemplate(point);
  }).join(`\n`);
};

const markupDay = (days, points) => {
  let day = 0;
  return Array.from(days)
    .map((it) => {
      day++;
      const date = formatDateList(it);
      const pointsDate = points.filter((point) => {
        return formatDate(point.date[0]) === it;
      });
      let listTemplate;
      if (day === 1) {
        listTemplate = createCardEditTemplate(points[0]) + dayListTemplate(pointsDate.slice(1));
      } else {
        listTemplate = dayListTemplate(pointsDate);
      }
      return (`<li class="trip-days__item  day">
            <div class="day__info">
                <span class="day__counter">${day}</span>
                <time class="day__date" datetime="2019-03-18">${date}</time>
            </div>
            <ul class="trip-events__list">
               ${listTemplate}
            </ul>
        </li>`
      );
    });
};

export const createTripEventsListTemplate = (points) => {
  const setDates = listDate(points);
  const itemsDay = markupDay(setDates, points);
  return `<ul class="trip-days">
        ${itemsDay} 
      </ul>`;
};


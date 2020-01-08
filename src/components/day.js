import {formatDateList} from "../utils/format.js";
import AbstractComponent from "./abstract-component.js";

const createTemplateDay = (day, index) => {
  const {date} = day;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="2019-03-18">
          ${formatDateList(date)}
        </time>
      </div>
    </li>`
  );
};
export default class Day extends AbstractComponent {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createTemplateDay(this._day, this._index);
  }

}

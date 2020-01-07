import {createElement} from "../utils";

const createTripEventsListTemplate = () => {
  /* const setDates = listDate(points);
  const itemsDay = markupDay(setDates, points); */
  return `<ul class="trip-days">
        
      </ul>`;
};
export default class TripEventsList {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createTripEventsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

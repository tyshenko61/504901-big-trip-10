import {createElement} from "../utils";

const createTemplateEvents = () => {
  return (
    `<ul class="trip-events__list">

    </ul>`
  );
};

export default class Events {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTemplateEvents();
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

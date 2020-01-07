import {FILTERNAMES} from '../constant.js';
import {createElement} from "../utils";
const createFilterMarkup = (filter, isChecked) => {
  return (
    `<div class="trip-filters__filter">
        <input
            id="filter-${filter}"
            class="trip-filters__filter-input  visually-hidden" 
            type="radio" 
            name="trip-filter" 
            value="${filter}"
            ${isChecked ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`
  );
};

const createFilterTemplate = () => {
  const filtersMarkup = FILTERNAMES.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersMarkup}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
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

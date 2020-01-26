import {filters} from '../constant.js';
import AbstractComponent from "./abstract-component.js";
const createTripFilterTemplate = (filter) => (
  `<div class="trip-filters__filter">
      <input id="filter-${filter.value.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.value}.toLowerCase()" ${filter.checked}>
      <label class="trip-filters__filter-label" for="filter-${filter.value}">${filter.value}</label>
    </div>`
);
const createFilterTemplate = () => {
  const filtersItems = filters.map((filter) => createTripFilterTemplate(filter)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
export default class Filter extends AbstractComponent {

  getTemplate() {
    return createFilterTemplate();
  }
}


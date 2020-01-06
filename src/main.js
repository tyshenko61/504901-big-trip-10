import {createSiteMenuTemplate} from './components/site-menu.js';
import {createTripEventsListTemplate} from './components/trip-events-list.js';
import {createTripInfoTemplate} from './components/trip-info';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {generatePoints} from './mock/card.js';
import {compare} from './mock/card.js';
// import {createCardEditTemplate} from "./components/edit-card";
// import {createCardTemplate} from "./components/card";

const TASK_COUNT = 3;
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
let points = generatePoints(TASK_COUNT + 1);
points.sort(compare);
const tripMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(siteHeaderElement, createTripInfoTemplate(points), `afterBegin`);
const siteControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const siteMenuElement = siteControlElement.querySelector(`.visually-hidden`);
render(siteMenuElement, createSiteMenuTemplate(), `afterEnd`);

const siteFilterElement = siteControlElement.querySelector(`.trip-controls__trip-tabs+.visually-hidden`);
render(siteFilterElement, createFilterTemplate(), `afterEnd`);
const tripEventsElement = document.querySelector(`.page-body__page-main`);
const orderElement = tripEventsElement.querySelector(`.visually-hidden`);
render(orderElement, createSortTemplate(), `afterEnd`);
const listElement = tripEventsElement.querySelector(`.trip-events__trip-sort`);

render(listElement, createTripEventsListTemplate(points), `afterEnd`);

/* const taskListElement = tripEventsElement.querySelector(`.trip-events__list`);
// eslint-disable-next-line no-undef
render(taskListElement, createCardEditTemplate(points[0]), `beforeEnd`);
for (let i = 0; i < TASK_COUNT; i++) {
  // eslint-disable-next-line no-undef
  render(taskListElement, createCardTemplate(points[i + 1]), `beforeEnd`);
}
*/


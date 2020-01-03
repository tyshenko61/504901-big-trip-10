import {createSiteMenuTemplate} from './components/site-menu.js';
import {createTripEventsListTemplate} from './components/trip-events-list.js';
import {createTripInfoTemplate} from './components/trip-info';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createCardEditTemplate} from './components/edit-card';
import {createCardTemplate} from './components/card';

const TASK_COUNT = 3;
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const tripMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(siteHeaderElement, createTripInfoTemplate(), `afterBegin`);
const siteControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const siteMenuElement = siteControlElement.querySelector(`.visually-hidden`);
render(siteMenuElement, createSiteMenuTemplate(), `afterEnd`);
const siteFilterElement = siteControlElement.querySelector(`.trip-controls__trip-tabs+.visually-hidden`);
render(siteFilterElement, createFilterTemplate(), `afterEnd`);
const tripEventsElement = document.querySelector(`.page-body__page-main`);
const orderElement = tripEventsElement.querySelector(`.visually-hidden`);
render(orderElement, createSortTemplate(), `afterEnd`);
const listElement = tripEventsElement.querySelector(`.trip-events__trip-sort`);
render(listElement, createTripEventsListTemplate(), `afterEnd`);
const taskListElement = tripEventsElement.querySelector(`.trip-events__list`);
render(taskListElement, createCardEditTemplate(), `beforeEnd`);
for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createCardTemplate(), `beforeEnd`);
}

import SiteMenuComponent from './components/site-menu.js';
import TripEventsListComponent from './components/trip-events-list.js';
import TripInfoComponent from './components/trip-info';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import DayComponent from './components/day.js';
import EventsComponent from './components/events.js';
import {generatePoints} from './mock/card.js';
import {generateDays} from "./mock/day";
import {compare} from './mock/card.js';
import {render, RenderPosition, renderEvent} from "./utils";
// import {createCardEditTemplate} from "./components/edit-card";
// import {createCardTemplate} from "./components/card";

const TASK_COUNT = 3;

let points = generatePoints(TASK_COUNT + 1);
points.sort(compare);
const days = generateDays(points);
const tripMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(siteHeaderElement, new TripInfoComponent(points).getElement(), RenderPosition.AFTERBEGIN);
const siteControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const siteMenuElement = siteControlElement.querySelector(`.visually-hidden`);
render(siteMenuElement, new SiteMenuComponent().getElement(), RenderPosition.AFTERBEGIN);

const siteFilterElement = siteControlElement.querySelector(`.trip-controls__trip-tabs+.visually-hidden`);
render(siteFilterElement, new FilterComponent().getElement(), RenderPosition.AFTEREND);
const tripEventsElement = document.querySelector(`.page-body__page-main .trip-events`);
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
// const listElement = tripEventsElement.querySelector(`.trip-events__trip-sort`);
const daysComponent = new TripEventsListComponent();
render(tripEventsElement, daysComponent.getElement(), RenderPosition.BEFOREEND);
days.forEach((day, index) => {
  const dayComponent = new DayComponent(day, index);
  render(daysComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);
  const eventsComponent = new EventsComponent();
  render(dayComponent.getElement(), eventsComponent.getElement(), RenderPosition.BEFOREEND);
  day.points.forEach((point) => renderEvent(point, eventsComponent.getElement()));
});

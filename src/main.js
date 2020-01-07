import SiteMenuComponent from './components/site-menu.js';
import TripEventsListComponent from './components/trip-events-list.js';
import TripInfoComponent from './components/trip-info';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import DayComponent from './components/day.js';
import EventsComponent from './components/events.js';
import NoPointsComponent from './components/noPoints';
import {generatePoints} from './mock/card.js';
import {generateDays} from "./mock/day";
import {compare} from './mock/card.js';
import {render, RenderPosition, renderEvent} from "./utils";
// import {createCardEditTemplate} from "./components/edit-card";
// import {createCardTemplate} from "./components/card";

const TASK_COUNT = 3;

const renderTripEvents = (tripEventsComponent, points) => {
  const isAllPointsPast = points.every((point) => point.isPast);

  if (isAllPointsPast) {
    render(tripEventsComponent.getElement(), new NoPointsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  render(tripMainElement, new TripInfoComponent(points).getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  const daysComponent = new TripEventsListComponent();
  render(tripEventsElement, daysComponent.getElement(), RenderPosition.BEFOREEND);
  days.forEach((day, index) => {
    const dayComponent = new DayComponent(day, index);
    render(daysComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);
    const eventsComponent = new EventsComponent();
    render(dayComponent.getElement(), eventsComponent.getElement(), RenderPosition.BEFOREEND);
    day.points.forEach((point) => renderEvent(point, eventsComponent.getElement()));
  });
};
let points = generatePoints(TASK_COUNT);
points.sort(compare);
const days = generateDays(points);
const tripMainElement = document.querySelector(`.trip-main`);
const siteControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
render(siteControlElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteControlElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
const tripEventsElement = document.querySelector(`.page-body__page-main .trip-events`);
const tripEventsComponent = new TripEventsListComponent();
render(tripEventsElement, tripEventsComponent.getElement(), RenderPosition.BEFOREEND);
renderTripEvents(tripEventsComponent, points);

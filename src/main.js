import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter';
import TripInfoComponent from "./components/trip-info";
import {generatePoints} from './mock/card.js';
import {compare} from './mock/card.js';
import {render, RenderPosition} from "./utils/render.js";
import TripController from "./controllers/trip-controller";
import SortComponent from "./components/sort";
import {controls, sortItems} from "./constant.js";
import NoPointsComponent from "./components/noPoints";
const TASK_COUNT = 10;

let points = generatePoints(TASK_COUNT);
points.sort(compare);
const siteControlElement = document.querySelector(`.trip-main__trip-controls`);
const tripInfo = document.querySelector(`.trip-info`);
const tripEvents = document.querySelector(`.trip-events`);

render(siteControlElement, new SiteMenuComponent(controls), RenderPosition.BEFOREEND);
render(siteControlElement, new FilterComponent(), RenderPosition.BEFOREEND);
if (points.length === 0) {
  render(tripEvents, new NoPointsComponent(), RenderPosition.BEFOREEND);
} else {
  render(tripInfo, new TripInfoComponent(points), RenderPosition.AFTERBEGIN);
  const tripEventsComponent = new TripController(tripEvents);
  tripEventsComponent.render(points);
}

import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter';
import {generatePoints} from './mock/card.js';
import {compare} from './mock/card.js';
import {render, RenderPosition} from "./utils/render.js";
import TripController from "./controllers/trip-controller";

const TASK_COUNT = 3;

let points = generatePoints(TASK_COUNT);
points.sort(compare);
const tripMainElement = document.querySelector(`.trip-main`);
const siteControlElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
render(siteControlElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteControlElement, new FilterComponent(), RenderPosition.BEFOREEND);
const tripEventsElement = document.querySelector(`.page-body__page-main .trip-events`);
const tripEventsComponent = new TripController(tripEventsElement);
tripEventsComponent.render(points);


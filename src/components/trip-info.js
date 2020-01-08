import {formatInfoDate} from "../utils/format.js";
import AbstractComponent from "./abstract-component.js";
const listCyties = (points) => {
  const str = [`Ekaterinburg`];
  points.map((point) => {
    if (point.city) {
      str.push(point.city);
    }
  });
  return str;
};
const strPoints = (arr) => {
  const last = arr.slice(-1);
  switch (arr.length) {
    case 1: return `${arr[0]} ... ${arr[0]}`;
    case 2: return `${arr[0]} &mdash; ${arr[1]}`;
    case 3: return `${arr[0]} &mdash; ${arr[1]} &mdash; ${arr[2]}`;
    default: return `${arr[0]} ... ${last}`;
  }
};
const dopCost = (point) => {
  let sum = 0;
  const {offers} = point;
  offers.map((it) => {
    if (it.isCheck) {
      sum += it.cost;
    }
  });
  return sum;
};
export const allCost = (points) => {
  let cost = 0;
  points.map((point) => {
    cost += point.cost;
    cost += dopCost(point);
  });
  return cost;
};
const createTripInfoTemplate = (points) => {
  const point1 = points[0];
  const point2 = points[points.length - 1];
  const duration = formatInfoDate(point1.date[0], point2.date[1]);
  const list = listCyties(points);
  const str = strPoints(list);
  const cost = allCost(points);
  const tripInfoCost = document.querySelector(`.trip-info__cost span`);
  tripInfoCost.innerHTML = `${cost}`;
  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">${str}</h1>
        <p class="trip-info__dates">${duration}</p>
     </div>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }
  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}



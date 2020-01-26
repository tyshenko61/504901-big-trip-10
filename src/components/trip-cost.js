import AbstractComponent from './abstract-component';

const createTripCostTemplate = (cost) => {
  alert(cost);
  const {tripCost} = cost;
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
  </p>`;
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
const allCost = (points) => {
  let cost = 0;
  points.map((point) => {
    cost += point.cost;
    cost += dopCost(point);
  });
  return cost;
}
export default class TripCost extends AbstractComponent {
  constructor(points) {
    super();
    this.points = points;
    if (points) {
      this._tripCost = allCost(this.points);
    }
  }

  getTemplate() {
    return createTripCostTemplate(this._tripCost);
  }
}


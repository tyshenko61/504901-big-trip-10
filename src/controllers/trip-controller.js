import PointController from "./point-controller";
import {generateTripDays} from "../components/day.js";
import DayComponent from "../components/day";
import {RenderPosition, render, remove} from "../utils/render";
import EventsComponent from "../components/events.js";
import SortComponent from "../components/sort";
import {formatDate} from "../utils/format";
import {sortItems} from "../components/sort";

const renderPoints = (pointListElement, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointListElement, onDataChange, onViewChange);
    pointController.render(point);
    return pointController;
  });
};
const renderDaysPoints = (points, onDataChange, onViewChange) => {
  const pointControllers = [];
  points.forEach((card) => {
    const tripEventsList = document.querySelectorAll(`.trip-events__list`);
    tripEventsList.forEach((tripEventItem) => {
      if ((tripEventItem.dataset.date) === `${formatDate(card.date[0])}`) {
        const pointController = new PointController(tripEventItem, onDataChange, onViewChange);
        pointController.render(card);
        pointControllers.push(pointController);
      }
    });
  });
  return pointControllers;
};


export default class TripController {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._showedPointControllers = [];
    this._daysPointsControllers = [];
    this._pointControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent = new SortComponent(sortItems);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

  }

  render(points) {
    this._points = points;
    this._tripDays = generateTripDays(this._points);
    this._dayBoardComponent = new DayComponent(this._tripDays);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._dayBoardComponent, RenderPosition.BEFOREEND);
    // this._showSortEvents(this._sortEventsDefault());
    this._daysPointsControllers = renderDaysPoints(this._points, this._onDataChange, this._onViewChange);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  _onViewChange() {
    this._daysPointsControllers.map((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];

    switch (sortType) {

      case `default`:
        sortedPoints = this._points;
        break;

      case `Price`:
        sortedPoints = this._points.slice().sort((a, b) => b.cost - a.cost);
        break;

      case `time`:

        sortedPoints = this._points.slice().sort((a, b) => (
          b.date[1] - b.date[0]) - (a.date[1] - a.date[0]));

        break;
    }
    if (this._dayBoardComponent) {
      remove(this._dayBoardComponent);
    }
    if (this._eventsSort) {
      remove(this._eventsSort);
    }
    if (sortType === `default`) {

      this._dayBoardComponent = new DayComponent(this._tripDays);
      render(this._container, this._dayBoardComponent, RenderPosition.BEFOREEND);
      this._daysPointsControllers = renderDaysPoints(this._points, this._onDataChange, this._onViewChange);

    } else {
      if (this._dayBoardComponent) {
        remove(this._dayBoardComponent);
      }
      this._eventsSort = new EventsComponent();
      render(this._container, this._eventsSort, RenderPosition.BEFOREEND);
      this._daysPointsControllers = renderPoints(this._eventsSort.getElement(), sortedPoints, this._onDataChange, this._onViewChange);
    }
  }
}


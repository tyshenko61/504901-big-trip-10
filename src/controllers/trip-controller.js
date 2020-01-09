import CardComponent from "../components/card";
import CardEditComponent from "../components/edit-card";
import {render, RenderPosition, replace} from "../utils/render";
import NoPointsComponent from "../components/noPoints";
import TripInfoComponent from "../components/trip-info";
import SortComponent from "../components/sort";
import TripEventsListComponent from "../components/trip-events-list";
import DayComponent from "../components/day";
import EventsComponent from "../components/events";
import BoardComponent from "../components/board";
import {generateDays} from "../mock/day";
import {SortType} from '../components/sort.js';
export const renderEvent = (event, element) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(card, cardEdit);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const card = new CardComponent(event);
  const cardEdit = new CardEditComponent(event);
  card.setButtonRollupClickHandler(() => {
    replace(cardEdit, card);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardEdit.setSubmitHandler(() => {
    replace(card, cardEdit);
  });

  cardEdit.setButtonRollupClickHandler(() => {
    replace(card, cardEdit);
  });
  render(element, card, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._daysComponent = new TripEventsListComponent();
    this._boardComponent = new BoardComponent();


  }
  render(points) {
    const tripMainElement = document.querySelector(`.trip-main`);
    const renderSort = (pointsSort) => {
      const eventsComponent = new EventsComponent();
      render(this._boardComponent.getElement(), eventsComponent, RenderPosition.BEFOREEND);
      pointsSort.forEach((point) => renderEvent(point, eventsComponent.getElement()));
    };
    const renderDays = () => {
      // render(tripEventsElement, this._daysComponent, RenderPosition.BEFOREEND);
      render(this._boardComponent.getElement(), this._daysComponent, RenderPosition.BEFOREEND);
      const days = generateDays(points);
      days.forEach((day, index) => {
        const dayComponent = new DayComponent(day, index);
        render(this._daysComponent.getElement(), dayComponent, RenderPosition.BEFOREEND);
        const eventsComponent = new EventsComponent();
        render(dayComponent.getElement(), eventsComponent, RenderPosition.BEFOREEND);
        day.points.forEach((point) => renderEvent(point, eventsComponent.getElement()));
      });
    };
    const isAllPointsPast = points.every((point) => point.isPast);

    if (isAllPointsPast) {
      render(this._container, new NoPointsComponent(), RenderPosition.BEFOREEND);
      return;
    }
    render(tripMainElement, new TripInfoComponent(points), RenderPosition.AFTERBEGIN);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._boardComponent, RenderPosition.BEFOREEND);
    renderDays();
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.TIME:
          sortedTasks = points.slice().sort((a, b) => (b.date[1] - b.date[0]) - (a.date[1] - a.date[0]));
          break;
        case SortType.PRICE:
          sortedTasks = points.slice().sort((a, b) => b.cost - a.cost);
          break;
        case SortType.DEFAULT:
          sortedTasks = points;

          break;
        default:
          break;
      }
      document.querySelector(`.board`).innerHTML = ``;
      if (sortType === SortType.DEFAULT) {

        renderDays();
      } else {
        renderSort(sortedTasks);
      }
    });
  }
}

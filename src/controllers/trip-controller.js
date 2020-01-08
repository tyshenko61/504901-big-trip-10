import CardComponent from "../components/card";
import CardEditComponent from "../components/edit-card";
import {render, RenderPosition, replace} from "../utils/render";
import NoPointsComponent from "../components/noPoints";
import TripInfoComponent from "../components/trip-info";
import SortComponent from "../components/sort";
import TripEventsListComponent from "../components/trip-events-list";
import DayComponent from "../components/day";
import EventsComponent from "../components/events";
import {generateDays} from "../mock/day";
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
  }
  render(points) {
    const isAllPointsPast = points.every((point) => point.isPast);

    if (isAllPointsPast) {
      render(this._container, new NoPointsComponent(), RenderPosition.BEFOREEND);
      return;
    }
    const tripMainElement = document.querySelector(`.trip-main`);
    render(tripMainElement, new TripInfoComponent(points), RenderPosition.AFTERBEGIN);
    const tripEventsElement = document.querySelector(`.page-body__page-main .trip-events`);
    render(tripEventsElement, new SortComponent(), RenderPosition.BEFOREEND);
    const daysComponent = new TripEventsListComponent();
    render(tripEventsElement, daysComponent, RenderPosition.BEFOREEND);
    const days = generateDays(points);
    days.forEach((day, index) => {
      const dayComponent = new DayComponent(day, index);
      render(daysComponent.getElement(), dayComponent, RenderPosition.BEFOREEND);
      const eventsComponent = new EventsComponent();
      render(dayComponent.getElement(), eventsComponent, RenderPosition.BEFOREEND);
      day.points.forEach((point) => renderEvent(point, eventsComponent.getElement()));
    });
  }
}

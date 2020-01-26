import {duration, getDestination} from '../utils/format.js';
import AbstractComponent from './abstract-component.js';
import moment from "moment";

const listOffers = (offers) => {
  return Array.from(offers.slice(0, 3)).map((offer) => {
    const {name} = offer;
    const name1 = name.name1;
    return (
      `<li class="event__offer">
            <span class="event__offer-title">${name1}</span>
                        &plus;
                        &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
        </li>`
    );
  }).join(`\n`);
};
const createCardTemplate = (point) => {
  const {type, date, offers, cost} = point;
  const {name, icon, action} = type;
  const destination = getDestination(name, action);
  const diffTime = duration(date[0], date[1]);
  const activeOffers = offers.filter((it) => {
    return it.isCheck;
  });
  const offersList = listOffers(activeOffers);
  return (
    `<li class="trip-events__item">
        <div class="event">
            <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="${icon}" alt="Event type icon">
            </div>
            <h3 class="event__title">${destination}</h3>
    
            <div class="event__schedule">
                <p class="event__time">
                    <time class="event__start-time" datetime="${moment(date[0]).format(`YYYY-MM-DDTHH:mm`)}">${moment(date[0]).format(`HH:mm`)}</time>
                        &mdash;
                    <time class="event__end-time" datetime="${moment(date[1]).format(`YYYY-MM-DDTHH:mm`)}">${moment(date[1]).format(`HH:mm`)}</time>
                </p>
                <p class="event__duration">${diffTime}</p>
                </div>

                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${cost}</span>
                </p>

                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersList}
                </ul>

                <button class="event__rollup-btn" type="button">
                   <span class="visually-hidden">Open event</span>
                </button>
         </div>
     </li>`
  );
};

export default class Card extends AbstractComponent {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createCardTemplate(this._point);
  }
  setButtonRollupClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, handler);
  }
}

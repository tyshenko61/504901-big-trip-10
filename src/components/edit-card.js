import {TYPES} from "../constant";
import {CITIES} from "../constant.js";
import {formatDateTime} from '../utils/format.js';
import AbstractComponent from "./abstract-component.js";

const createImages = (url) => {
  return (
    `<img class="event__photo" src="${url}" alt="Event photo">
    `
  );
};
const createOptions = () => {
  return Array.from(CITIES)
    .map((it) => {
      return (
        `<option value="${it}"></option>`
      );
    }).join((`\n`));
};
const createItems = (types, nameChecked) => {
  return Array.from(types)
    .map((type) => {
      const {name} = type;
      const Name = name[0].toUpperCase() + name.slice(1);
      const isChecked = name === nameChecked;
      return (
        `<div class="event__type-item">
             <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${isChecked ? `checked` : ``}>
             <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${Name}</label>
        </div>`
      );
    }).join(`\n`);
};
const createOffers = (offers) => {
  return Array.from(offers)
    .map((offer) => {
      const {name, cost, isCheck} = offer;
      const {name1, name2} = name;
      const check = isCheck ? `checked` : ``;
      return (
        `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name2}-1" type="checkbox" name="event-offer-${name2}" ${check}>
            <label class="event__offer-label" for="event-offer-${name2}-1">
                <span class="event__offer-title">${name1}</span>
                    &plus; &euro;&nbsp;<span class="event__offer-price">${cost}</span>
            </label>
        </div>`
      );
    }).join(`\n`);
};

const createCardEditTemplate = (point) => {
  const {type, date, offers, city, cost, url, description} = point;
  const {name, icon, action} = type;
  const from = formatDateTime(date[0]);
  const to = formatDateTime(date[1]);
  let typesTo = TYPES.filter((it) => {
    // eslint-disable-next-line no-shadow
    const {action} = it;
    return `to` === action;
  });
  let typesIn = TYPES.filter((it) => {
    // eslint-disable-next-line no-shadow
    const {action} = it;
    return `in` === action;
  });
  const itemsTypeTo = createItems(typesTo, name);
  const itemsTypeIn = createItems(typesIn, name);
  const destination = name[0].toUpperCase() + name.slice(1) + ` ` + action;
  const options = createOptions();
  const available = createOffers(offers);
  const image1 = createImages(url);
  const image2 = createImages(url);
  return (
    `<li class="trip-events__item">
                  <form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="${icon}" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                        <div class="event__type-list">
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Transfer</legend>
                                ${itemsTypeTo}
                          </fieldset>

                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Activity</legend>
                                ${itemsTypeIn}
                          </fieldset>
                        </div>
                      </div>

                      <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${destination}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
                        <datalist id="destination-list-1">
                          ${options}
                        </datalist>
                      </div>

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${from}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${to}">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
                      </div>

                      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                      <button class="event__reset-btn" type="reset">Delete</button>

                      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

                      <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                      </button>
                    </header>

                    <section class="event__details">

                      <section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                        <div class="event__available-offers">
                          ${available}
                        </div>
                      </section>

                      <section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${description}</p>

                        <div class="event__photos-container">
                          <div class="event__photos-tape">
                            ${image1}
                            ${image2}
                          </div>
                        </div>
                      </section>
                    </section>
                  </form>
                </li>`
  );
};

export default class CardEdit extends AbstractComponent {
  constructor(point) {
    super();
    this._point = point;
    this._type = this._point.type;
    this._date = this._point.date;
    this._offers = this._point.offers;
    this._city = this._point.city;
    this._cost = this._point.cost;
    this._url = this._point.url;
    this._description = this._point.description;
    this._isPast = this._point.isPast;
  }

  getTemplate() {
    return createCardEditTemplate(this._point);
  }

  setButtonRollupClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }
}

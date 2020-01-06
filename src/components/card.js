import {formatTime} from '../utils.js';
import {duration} from '../utils.js';
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
  });
};
export const createCardTemplate = (point) => {
  const {type, date, offers, cost} = point;
  const {name, icon, action} = type;
  const time1 = formatTime(date[0]);
  const time2 = formatTime(date[1]);
  const destination = name[0].toUpperCase() + name.slice(1) + ` ` + action;
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
                    <time class="event__start-time" datetime="2019-03-18T10:30">${time1}</time>
                        &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${time2}</time>
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

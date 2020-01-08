import AbstractComponent from "./abstract-component.js";

const createTripEventsListTemplate = () => {
  return `<ul class="trip-days">
        
      </ul>`;
};
export default class TripEventsList extends AbstractComponent {

  getTemplate() {
    return createTripEventsListTemplate();
  }
}

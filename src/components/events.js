import AbstractComponent from "./abstract-component.js";

const createTemplateEvents = () => {
  return (
    `<ul class="trip-events__list">

    </ul>`
  );
};

export default class Events extends AbstractComponent {

  getTemplate() {
    return createTemplateEvents();
  }
}

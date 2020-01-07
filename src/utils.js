import CardComponent from './components/card';
import CardEditComponent from './components/edit-card';
const MONTHNAMES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];
export const formatDateTime = (date) => {
  const time = formatTime(date);
  const day = date.getDate();
  const dayDate = day < 10 ? `0${day}` : `${day}`;
  const month = date.getMonth() + 1;
  const monthDate = month < 10 ? `0${month}` : `${month}`;
  const year = date.getFullYear().toString(10).slice(2);
  return `${dayDate}/${monthDate}/${year} ${time}`;
};

export const formatDate = (date) => {
  const day = date.getDate();
  const dayDate = day < 10 ? `0${day}` : `${day}`;
  const month = date.getMonth() + 1;
  const monthDate = month < 10 ? `0${month}` : `${month}`;
  const year = date.getFullYear().toString(10).slice(2);
  return `${dayDate}/${monthDate}/${year}`;
};

export const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursDate = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesDate = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursDate}:${minutesDate}`;
};
export let duration;
duration = (date1, date2) => {
  const diffDate = date2 - date1;
  let minutes = Math.round(diffDate / (60 * 1000));
  let hours = Math.floor(minutes / 60);
  let day = Math.floor(hours / 24);
  minutes -= hours * 60;
  hours -= day * 24;
  if (day === 0) {
    day = ``;
  } else if (day >= 9) {
    day = `${day}D `;
  } else {
    day = `0${day}D `;
  }
  if (!day) {
    if (hours === 0) {
      hours = ``;
    } else if (hours < 9) {
      hours = `0${hours}H `;
    } else {
      hours = `${hours}H `;
    }
  } else {
    hours = (hours < 9) ? `0${hours}H ` : `${hours}H `;
  }

  minutes = (minutes < 9) ? `0${minutes}M` : `${minutes}M`;
  return `${day}${hours}${minutes}`;
};
export const formatInfoDate = (date1, date2) => {
  const month1 = MONTHNAMES[date1.getMonth()];
  const month2 = MONTHNAMES[date2.getMonth()];
  const day1 = date1.getDate();
  const day2 = date2.getDate();
  if (date1.getMonth() > date2.getMonth()) {
    return `${day1} ${month1} &mdash;&nbsp;${day2} ${month2} `;
  } else {
    return `${month1} ${day1} &mdash;&nbsp;${day2}`;
  }
};
export const formatDateList = (date) => {
  const num = parseInt(date.slice(3, 5), 10) - 1;
  const month = MONTHNAMES[num];
  const day = parseInt(date.slice(0, 2), 10);
  return `${month} ${day}`;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterEnd`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
export const renderEvent = (event, element) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      element.replaceChild(card.getElement(), cardEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const card = new CardComponent(event);
  const cardEdit = new CardEditComponent(event);
  const buttonRollupEvent = card.getElement().querySelector(`.event__rollup-btn`);
  buttonRollupEvent.addEventListener(`click`, () => {
    element.replaceChild(cardEdit.getElement(), card.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const formEventEdit = cardEdit.getElement();
  formEventEdit.addEventListener(`submit`, () => {
    element.replaceChild(card.getElement(), cardEdit.getElement());
  });

  const buttonRollupEventEdit = cardEdit.getElement().querySelector(`.event__rollup-btn`);
  buttonRollupEventEdit.addEventListener(`click`, () => {
    element.replaceChild(card.getElement(), cardEdit.getElement());
  });
  render(element, card.getElement(), RenderPosition.BEFOREEND);
};

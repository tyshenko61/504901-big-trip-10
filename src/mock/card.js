import {TYPES} from '../constant.js';
import {CITIES} from '../constant.js';

const Offers = [
  {name1: `Add luggage`, name2: `luggage`},
  {name1: `Add breakfast`, name2: `breakfast`},
  {name1: `Rent a car`, name2: `rent`},
  {name1: `Switch to comfort class`, name2: `comfort`},
  {name1: `Add meal`, name2: `meal`},
  {name1: `Choose seats`, name2: `seats`},
  {name1: `Book tickets`, name2: `tickets`},
  {name1: `Lunch in city`, name2: `lunch`},
  {name1: `Order Uber`, name2: `order`}
];
const Description = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
const generateDesc = () => {
  const count = getRandomIntegerNumber(1, 4);
  let s = ``;
  for (let i = 0; i < count; i++) {
    s += getRandomArrayItem(Description) + ` `;
  }
  return s;
};

const generateOffer = () => {
  return {
    name: getRandomArrayItem(Offers),
    cost: Math.floor(Math.random() * 100),
    isCheck: Math.random() > 0.5
  };
};

const generateOffers = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateOffer);
};
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomDates = () => {
  const beginDate = new Date();
  const diffHour = getRandomIntegerNumber(12, 24);
  const diffMin = getRandomIntegerNumber(10, 60);
  beginDate.setHours(beginDate.getHours() + diffHour, beginDate.getMinutes() + diffMin);
  const diffHour1 = getRandomIntegerNumber(0, 3);
  const diffMin1 = getRandomIntegerNumber(10, 60);
  const endDate = new Date(beginDate);
  endDate.setHours(endDate.getHours() + diffHour1, endDate.getMinutes() + diffMin1);
  return [beginDate, endDate];
};

const generatePoint = () => {
  const countOffers = getRandomIntegerNumber(0, 3);
  return {
    type: getRandomArrayItem(TYPES),
    date: getRandomDates(),
    offers: generateOffers(countOffers),
    city: Math.random() > 0.5 ? getRandomArrayItem(CITIES) : ``,
    cost: getRandomIntegerNumber(5, 100),
    url: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: generateDesc(),
    isPast: Math.random() > 0.5
  };
};
const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

const compare = (a, b) => {
  return a.date[0] > b.date[0] ? 1 : -1;
};

export {generatePoint, generatePoints, compare};

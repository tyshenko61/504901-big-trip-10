import {formatDate} from "../utils";

const getDaysEvents = (points) => {
  const uniqueDays = points.map((point) => {
    return formatDate(point.date[0]);
  });
  return Array.from(new Set(uniqueDays));
};
export const generateDays = (points) => {
  return getDaysEvents(points).map((day) => {
    return (
      {
        date: day,
        points: points.filter((point) => formatDate(point.date[0]) === day),
      }
    );
  });
};

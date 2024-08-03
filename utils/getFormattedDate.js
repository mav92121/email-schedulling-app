const getFormattedDate = ({ year, month, day, hours, minutes, seconds }) => {
  const date = new Date(year, month, day, hours, minutes, seconds);
  return date;
};

export default getFormattedDate;

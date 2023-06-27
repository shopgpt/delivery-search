const localeStringOption: Intl.DateTimeFormatOptions = {
  //   year: "numeric",
  month: "short",
  day: "numeric",
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
};

export const dateToFullString = (date: Date) => {
  return date.toLocaleString("ko-kr", localeStringOption);
};

export const dateToSimpleDateString = (dateObject: Date) => {
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  return `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`;
};

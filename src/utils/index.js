import moment from "moment";

export const formatDateString = (
  dateString,
  originFormat = "MM-DD-YYYY",
  newFormat = "DD-MM-YYYY",
) => {
  if(dateString === null || dateString === undefined) return "DD-MM-YYYY";
  const originalDate = moment(dateString, originFormat);

  const newDateString = originalDate.format(newFormat);
  return newDateString;
};

export const formatDate = (date, format = "YYYY-MM-DD") => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const tokens = {
    YYYY: year,
    MM: month,
    DD: day,
    HH: hours,
    mm: minutes,
    ss: seconds,
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => tokens[match]);
};

export const formatPrice = (number = 0, separator = ",") => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

import moment from "moment";

export const formatDateString = (
  dateString,
  originFormat = "MM-DD-YYYY",
  newFormat = "DD-MM-YYYY",
) => {
  const originalDate = moment(dateString, originFormat);

  const newDateString = originalDate.format(newFormat);
  return newDateString;
};




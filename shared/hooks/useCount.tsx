/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

/**
 * @const calculateTwoDate
 * @param dateRange - an Array containing two Dates; Start and End Date.
 * @returns {number} Total number of days between those two dates.
 */
const calculateTwoDate = (dateRange: [Date | null, Date | null]): number => {
  // destructuring the dateRange props
  const [startDate, endDate] = dateRange;
  if (!startDate || !endDate) return 0;
  // computing the number of days
  const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  return duration + 1;
};

/**
 * @const calculateTwoTime
 * @param {string} timeIn  - The starting time in "HH:mm" format.
 * @param {string} timeOut - The starting time out "HH:mm" format.
 * @returns {number} Total number of hours between those two time.
 */
const calculateTwoTime = (timeIn: string, timeOut: string): number => {
  if (!timeIn || !timeOut) return 0;

  // Splitting the time from "00:00"(HH:mm) to "00"(HH)
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60; // Convert to decimal format
  };

  // Parsing to split the time
  const start = parseTime(timeIn);
  const end = parseTime(timeOut);

  let totalHours = end - start;
  if (totalHours < 0) totalHours += 24; // Handle cases where TimeOut is on the next day

  // returning the float total hourse
  return parseFloat(totalHours.toFixed(2));
};

export { calculateTwoDate, calculateTwoTime };

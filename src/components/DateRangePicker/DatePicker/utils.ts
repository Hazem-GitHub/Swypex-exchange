import dayjs, { Dayjs } from "dayjs";

/**
 * Change Date Month and year according to the user navigation on the date picker
 * 
 * @param date 
 * @param isNextMonth 
 * @returns Manipulated Date Object
 */
export const navigateDateMonth = ( date: Dayjs, isNextMonth: boolean ): Dayjs => {

  if (date.month() === 0 && !isNextMonth) {
    return date.set("year", date.year() - 1).set("month", 11);
  }

  if (date.month() === 11 && isNextMonth) {
    return date.set("year", date.year() + 1).set("month", 0);
  }

  return date.add(isNextMonth ? 1 : -1, "month");
}


/**
 * 
 * Calendar cell interface
 */
interface ICalendarCell {
  text: string;
  value: Dayjs;
}
/**
 * Preparing the calendar cells according to the current selected Month/Year
 * 
 * @param date 
 * @returns Array of Calendar Cells
 */
const getCalendarCells = ( date: Dayjs ): ICalendarCell[] => {
  
  date = typeof (date) !== 'string' ? date : dayjs();
  // Preparing Month's Days Array and filling it with the first day initially
  const monthDaysArray = new Array(date.daysInMonth()).fill(1);
  // Preparing CalendarCells Empty Array to be filled with the actual values and returned at the end
  const calendarCells: ICalendarCell[] = [];

  /**
   * Generate Calendar Cell
   * 
   * @param date 
   * @param dayNumber 
   * @returns Calendar Cell
   */
  const prepareCell = ( date: Dayjs, dayNumber: number ): ICalendarCell => {
    return {
      text: dayNumber.toString(),
      value: date.clone().set("date", dayNumber)
    }
  };

  /**
   * Generating Calendar Cells
   * 
   */
   monthDaysArray.forEach((day, index) => {
    calendarCells.push(
      prepareCell(date, index + 1)
    );
  });

  /**
   * Filling the empty places with the previous and next months respectively
   * We have 35 slots (7 days/week * 5 rows to cover the range)
   * Number of slots needed per month 28 : 31
   * 
   */
  const cellsToAdd = 35 - monthDaysArray.length;

  // Starting with the previous month
  const prevMonth = date.subtract(1, "month");
  // looping over the half of the remaining cells
  for (let i = 0; i < Math.floor(cellsToAdd / 2); i++) {
    // At the beginning of the array
    calendarCells.unshift(
      prepareCell( prevMonth, prevMonth.daysInMonth() - i )
    );
  }

  // Then heading to the next month
  const nextMonth = date.add(1, "month");
  // looping over the half of the remaining cells
  for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
    // At the end of the array
    calendarCells.push(
      prepareCell(nextMonth, i + 1)
    );
  }
  // The Calendar is ready
  return calendarCells;
}

/**
 * Return 5 Rows of the generated Cells according to the current shown calendar
 * 
 * @param date 
 * @returns Distributed Array into 5 sliced Arrays (each of 7 items)
 */
export const getCalendarRows = ( date: Dayjs ): Array<ICalendarCell[]> => {

  // Getting Calendar Cells according to the date object
  const cells = getCalendarCells(date);
  // Preparing the rows Array of Arrays to be returned
  const rows: Array<ICalendarCell[]> = [];

  // Looping with 7 increments to the index on each iteration
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(
      cells.slice(i, i + 7)
    );
  }
  // Rows are ready
  return rows;
}

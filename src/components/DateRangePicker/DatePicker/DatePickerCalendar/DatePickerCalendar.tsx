import React, { useMemo, useEffect } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';

import clsx from 'clsx';

import { getCalendarRows } from '../utils';

import "./DatePickerCalendar.scss";



dayjs.extend(isBetween);

interface IDatePickerCalendarProps {
    shownDate: Dayjs;
    setShownDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    date: Dayjs;
    setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    otherDate: Dayjs;
}
  
const DatePickerCalendar: React.FC<IDatePickerCalendarProps> = ({
        shownDate,
        setShownDate,
        date,
        setDate,
        otherDate
    }) => {
    

    // Memorize the rows on changing the shown date
    const rows = useMemo(
            () => getCalendarRows(shownDate),
        [shownDate]);

    useEffect(() => {
        // Override selection on change the selected date
        // Helpful on Selecting Predefined Named Ranges
        // Preparing the calendar rows
        getCalendarRows(date);
        // Setting the shown date accordingly
        setShownDate(date);
        
    }, [setShownDate, date])

    return (
        <>
            {/* Displaying Weeks row */}
            <div className="datePickerCalendar__header">
                {
                    rows[0].map( ( { value }, index ) => (
                        <div key={ index } className={"datePickerCalendar__cell"}>
                            { value.format("dd") }
                        </div>
                    ))
                }
            </div>
            {/* Displaying Rows */}
            {
                rows.map( ( cells, rowIndex ) => (
                    <div key={rowIndex} className={"datePickerCalendar__row"}>
                        {/* Displaying Cells on each row */}
                        {
                            cells.map( ( { text, value }, index) => (
                                <div key={`${text} - ${index}`}
                                    className={
                                        clsx(
                                            "datePickerCalendar__cell",
                                            "datePickerCalendar__dayCell",
                                            {
                                                datePickerCalendar__dayCell_selected: value.toString() === date.toString()
                                            },
                                            {
                                                datePickerCalendar__dayCell_disabled: value.isAfter(dayjs())
                                            },
                                            {
                                                datePickerCalendar__dayCell_inRange: value.isBetween(date, otherDate)
                                            },
                                            {
                                                datePickerCalendar__dayCell_today: value.isSame(dayjs(), 'date')
                                            }
                                        )
                                    } onClick={ () => setDate(value) } >
                                    {text}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </>
    )
}

export default DatePickerCalendar

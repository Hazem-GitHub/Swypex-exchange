import React, { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import clsx from 'clsx';

import DatePickerCalendar from './DatePickerCalendar/DatePickerCalendar';
import DatePickerSelector from './DatePickerSelector/DatePickerSelector';

import './DatePicker.scss';


export interface IDatePickerProps {
    title: string;
    isShowDatePicker: boolean;
    date: Dayjs;
    setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    otherDate: Dayjs;

}

const DatePicker: React.FC<IDatePickerProps> = ({
        title,
        isShowDatePicker,
        date,
        setDate,
        otherDate,
    }) => {

    // Cloning the date to be used for calendars UI
    const passedDate = typeof (date) !== 'string' ? date.clone() : dayjs();
    const [shownDate, setShownDate] = useState<Dayjs>(passedDate);

    return (
        <div className={clsx(
                "datePicker",
                {
                    active: isShowDatePicker
                }
            )}>
            {/* Months/Years Selector */}
            <DatePickerSelector
                title={title}
                shownDate={shownDate}
                setShownDate={setShownDate}
            />
            {/* Calendar body */}
            <DatePickerCalendar
                shownDate={shownDate}
                setShownDate={setShownDate}
                date={date}
                setDate={setDate}
                otherDate={otherDate}
            />
        </div>
    )
}

export default DatePicker

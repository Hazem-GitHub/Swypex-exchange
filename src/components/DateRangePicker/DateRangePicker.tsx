import React, { useState, useEffect, useRef } from 'react';

import { Dayjs } from 'dayjs';

import clsx from 'clsx';

import Togglers from './Togglers/Togglers';
import NamedRanges from './NamedRanges/NamedRanges';
import DatePicker from './DatePicker/DatePicker';

import './DateRangePicker.scss';


export interface IDateRangePickerProps {
    startDate: Dayjs;
    setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    endDate: Dayjs;
    setEndDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const DateRangePicker: React.FC<IDateRangePickerProps> = ({
        startDate,
        setStartDate,
        endDate,
        setEndDate
    }) => {
    
    // Declaring the showing state
    const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);

    // Declaring Reference for the Date Range Picker
    const dateRangePickerRef = useRef<HTMLDivElement>(null);

    /**
     * Handle Closing Date Range Picker on clicking outside
     */
    useEffect(() => {
        function handleClickOutside(e: any) {
          if (dateRangePickerRef.current  && !dateRangePickerRef?.current?.contains(e.target)) {
            setIsShowDatePicker(false);
          }
        }
        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("click", handleClickOutside);
        };
    }, [dateRangePickerRef]);
    
    return (
        <div ref={dateRangePickerRef} className="dateRangePicker">
            {/* Togglers */}
            <Togglers
                isShowDatePicker={isShowDatePicker}
                setIsShowDatePicker={setIsShowDatePicker}
                startDate={startDate}
                endDate={endDate}
            />
            {/* Date Range Picker Container */}
            <div className={clsx("dateRangePicker-container", {
                active: isShowDatePicker
            })} >
                
                {/* Predefined Ranges */}
                <NamedRanges
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    isShowDatePicker={isShowDatePicker}
                    setIsShowDatePicker={setIsShowDatePicker}
                />
                {/* Date Pickers Calendars */}
                <div className="dateRangePicker__calendars">
                    {/* Start Date Picker */}
                    <DatePicker
                        title={'From'}
                        isShowDatePicker={isShowDatePicker}
                        date={startDate}
                        otherDate={endDate}
                        setDate={setStartDate} />
                    {/* End Date Picker */}
                    <DatePicker
                        title={'To'}
                        isShowDatePicker={isShowDatePicker}
                        date={endDate}
                        otherDate={startDate}
                        setDate={setEndDate} />
                </div>
            </div>
        </div>
    )
}

export default DateRangePicker

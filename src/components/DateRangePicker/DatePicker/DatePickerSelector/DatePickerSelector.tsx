import React from 'react';

import dayjs, { Dayjs } from 'dayjs';

import clsx from 'clsx';

import { ChevronIcon } from '../../../icons/ChevronIcon';

import { navigateDateMonth } from '../utils';

import './DatePickerSelector.scss';

interface IDatePickerSelectorProps {
    title: string;
    shownDate: Dayjs;
    setShownDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}
  
const DatePickerSelector: React.FC<IDatePickerSelectorProps> = ({
        title,
        shownDate,
        setShownDate
    }) => {

    /**
     * 
     * @param isNextMonth 
     * @returns 
     */
    const handleIconClick = (isNextMonth: boolean) => {
        const date = typeof (shownDate) !== 'string' ? shownDate : dayjs();
        return () => {
            setShownDate(
                navigateDateMonth( date, isNextMonth )
            );
        };
    };
    
    return (
        <div className={"datePickerSelector"}>
            {/* Previous Month: Toggler Icon */}
            <div className={clsx(
                "datePickerSelector__icon",
                "datePickerSelector__iconLeft"
                )}
                onClick={handleIconClick(false)} >
                {/* Icon */}
                <ChevronIcon />
            </div>

            {/* Displayed Text */}
            <div className="datePickerSelector__text">
                {/* Date picker Title */}
                <div className="datePickerSelector__text__title">
                    <small>{title}</small>
                </div>
                {/* Date Picker Selected Date */}
                <div className={"datePickerSelector__text__date"}>
                    {
                        typeof (shownDate) !== 'string' ?
                            shownDate.format("MMMM DD, YYYY") : dayjs().format("MMM YYYY")
                    }
                </div>
            </div>

            {/* Next Month: Toggler Icon */}
            <div className={clsx(
                "datePickerSelector__icon",
                "datePickerSelector__iconRight"
                )}
                onClick={handleIconClick(true)} >
                {/* Icon */}
                <ChevronIcon />
            </div>
        </div>
    )
}

export default DatePickerSelector

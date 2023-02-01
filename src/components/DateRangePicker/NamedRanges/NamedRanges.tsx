import React from 'react';

import dayjs, { Dayjs } from 'dayjs';

import clsx from 'clsx';

import './NamedRanges.scss';


export interface INamedRangesProps {
    setStartDate: (newDate: Dayjs) => void;
    setEndDate: (newDate: Dayjs) => void;
    isShowDatePicker: boolean;
    setIsShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const NamedRanges: React.FC<INamedRangesProps> = ({
    setStartDate,
    setEndDate,
    isShowDatePicker,
    setIsShowDatePicker
    }) => {

    const predefinedNamedRanges = [
        'Today',
        'Yesterday',
        'This Week',
        'This Month',
        'This Year',
        'Last Week',
        'Last Month',
        'Last Year'
    ];

    const handleSelectingNamedRange = (namedRange: string) => {
        switch (namedRange) {
            case 'Today':
                setStartDate(dayjs());
                setEndDate(dayjs());
                break;
            
            case 'Yesterday':
                setStartDate(dayjs().subtract(1, "day"));
                setEndDate(dayjs().subtract(1, "day"));
                break;
            
            case 'This Week':
                setStartDate(dayjs().startOf('week'));
                setEndDate(dayjs());
                break;
            
            case 'This Month':
                setStartDate(dayjs().startOf('month'));
                setEndDate(dayjs());
                break;
            
            case 'This Year':
                setStartDate(dayjs().startOf('year'));
                setEndDate(dayjs());
                break;
            case 'Last Week':
                setStartDate(dayjs().subtract(1, "week").startOf('week'));
                setEndDate(dayjs().subtract(1, "week").endOf('week'));
                break;
            case 'Last Month':
                setStartDate(dayjs().subtract(1, "month").startOf('month'));
                setEndDate(dayjs().subtract(1, "month").endOf('month'));
                break;
            case 'Last Year':
                setStartDate(dayjs().subtract(1, "year").startOf('year'));
                setEndDate(dayjs().subtract(1, "year").endOf('year'));
                break;
        }
        /* Closing the Date Range Picker after Selecting the new range according to the predfined cases above
        */
        setTimeout(() => {
            // Used 500ms background time delay to be able to observe the selection 
            setIsShowDatePicker(false);
        }, 500)
    }

    return (
        <div className={
            clsx(
                "dateRangePicker-namedRanges",
                {
                    active: isShowDatePicker
                }
            )}>
            <div className="dateRangePicker-namedRanges__container">
                {/* Mapping Predefined Name Date Ranges as a buttons */}
                {
                    predefinedNamedRanges.map((namedRange, index) => (
                        <button key={index}
                                type="button"
                                onClick={ () => handleSelectingNamedRange(namedRange) }
                                className="dateRangePicker-namedRanges__button">
                            {namedRange}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default NamedRanges

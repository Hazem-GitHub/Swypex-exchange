import React from 'react'

import { Dayjs } from 'dayjs';

import clsx from 'clsx';

import { CalendarIcon } from '../../icons/CalendarIcon';

import './Togglers.scss';


interface ITogglersProps {
    isShowDatePicker: boolean;
    setIsShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
    startDate: Dayjs;
    endDate: Dayjs;
}

const Togglers: React.FC<ITogglersProps> = ({
        isShowDatePicker,
        setIsShowDatePicker,
        startDate,
        endDate
    }) => {
    
    return (
        <div className="dateRangePicker-toggler" onClick={ () => setIsShowDatePicker(prevState => !prevState) }>
            <label aria-label="Pick Date Range">
                {/* Calendar Icon */}
                <CalendarIcon /> Pick Date Range
            </label>
            {/* Range Date Toggler */}
            <div className={
                    clsx(
                        "toggler-container", {
                        active: isShowDatePicker
                        }
                    )
                }>
                
                {/* Start Date */}
                <div className="date start-date">
                    {
                        typeof (startDate) !== 'string' ?
                            startDate.format("MMMM DD, YYYY").toString() : startDate
                    }
                </div>
                <span> - </span>
                {/* End Date */}
                <div className="date end-date">
                    {
                        typeof (endDate) !== 'string' ?
                            endDate.format("MMMM DD, YYYY").toString() : endDate
                    }
                </div>
            </div>
        </div>
    )
}

export default Togglers

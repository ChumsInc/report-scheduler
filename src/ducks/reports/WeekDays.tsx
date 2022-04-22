import React from 'react';
import classNames from "classnames";
import {dayNames, days, WeekDay} from "../../app/types";


export interface WeekDaysProps {
    weekDays: WeekDay[],
}

const WeekDays: React.FC<WeekDaysProps> = ({weekDays}) => {
    return (
        <div>
            {days.map((day) => <WeekDay day={day} key={day} active={weekDays.includes(day)} />
            )}
        </div>
    )
}

export default WeekDays;


const WeekDay: React.FC<{ day: WeekDay, active: boolean }> = ({day, active}) => {
    const className = {
        'bg-primary': active,
        'text-light': active,
        'bg-light': !active,
        'text-dark': !active
    }
    return (
        <span className={classNames('badge badge-sm me-1', className)}>
            {dayNames[day]}
        </span>
    )
}

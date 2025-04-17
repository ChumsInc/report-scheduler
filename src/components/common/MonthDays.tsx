import React from 'react';
import classNames from "classnames";


export interface MonthDaysProps {
    monthDays: (string|number)[],
}

const WeekDays: React.FC<MonthDaysProps> = ({monthDays}) => {
    return (
        <div>
            {monthDays.map((day) => <MonthDay day={String(day)} key={day}/>
            )}
        </div>
    )
}

export default WeekDays;


const MonthDay: React.FC<{ day: string }> = ({day}) => {
    const className = {
        'bg-primary': true,
        'text-light': true,
    }
    return (
        <span className={classNames('badge badge-sm me-1', className)}>
            {day.padStart(2, '0')}
        </span>
    )
}

import React from 'react';
import classNames from "classnames";


export interface MonthDaysProps {
    monthDays: (string|number)[],
}

const WeekDays = ({monthDays}:MonthDaysProps) => {
    return (
        <div>
            {monthDays
                .filter((day) => String(day) > '')
                .map((day) => (
                    <MonthDay key={day} day={String(day)}/>
                )
            )}
        </div>
    )
}

export default WeekDays;


const MonthDay = ({day}:{ day: string }) => {
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

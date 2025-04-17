import React from 'react';
import classNames from "classnames";
import {dayNames, days, WeekDay} from "@/app/types";

export interface WeekDaysProps {
    weekDays: WeekDay[],
}

export default function WeekDays({weekDays}: WeekDaysProps) {
    return (
        <div>
            {days.map((day) => <WeekDayIcon day={day} key={day} active={weekDays.includes(day)}/>
            )}
        </div>
    )
}


interface WeekDayIconProps {
    day: WeekDay;
    active: boolean;
}

export function WeekDayIcon({day, active}: WeekDayIconProps) {
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

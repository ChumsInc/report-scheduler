import React from "react";
import classNames from "classnames";
import {dayNames, days, WeekDay} from "../../app/types";


export interface WeekDayChooser {
    week_days: WeekDay[],
    onChange: (days: WeekDay[]) => void
}

const WeekDayChooser: React.FC<WeekDayChooser> = ({week_days, onChange}) => {
    const hasDay = (day: WeekDay): boolean => week_days.includes(day);

    const changeHandler = (day: WeekDay) => (checked: boolean) => {

        if (checked && !hasDay(day)) {
            return onChange([...week_days, day])
        }
        if (!checked && hasDay(day)) {
            const days = week_days.filter(d => d !== day);
            return onChange(days);
        }
    }
    return (
        <div className="d-flex">
            {
                days
                .map(day => <WeekDayButton day={day}
                                           checked={hasDay(day)}
                                           onChange={changeHandler(day)}/>
                )}
        </div>
    )
}

export default WeekDayChooser;

interface WeekDayButton {
    day: WeekDay,
    checked: boolean,
    onChange: (checked: boolean) => void,
}

const WeekDayButton: React.FC<WeekDayButton> = ({day, checked, onChange}) => {
    return (
        <div className="week-day-button me-1">
            <input type="checkbox" className="btn-check" autoComplete="off"
                   onChange={(ev) => onChange(ev.target.checked)}/>
            <label className={classNames('btn btn-sm', {'btn-primary': checked, 'btn-outline-primary': !checked})}
                   onClick={() => onChange(!checked)}>
                {dayNames[day]}
            </label>
        </div>
    )
}

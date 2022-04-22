import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchReportsAction} from "./actions";
import {selectList, selectLoading} from "./selectors";
import {FormCheck, SpinnerButton} from "chums-ducks";
import classNames from "classnames";
import WeekDays from "./WeekDays";

const ReportList:React.FC = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectList);
    const [showInactive, setShowInactive] = useState(false);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchReportsAction());
    }, [])

    const onReload = () => dispatch(fetchReportsAction());

    return (
        <div>
            <div className="row g-3 align-items-baseline">
                <div className="col">
                    <h3>Scheduled Reports</h3>
                </div>
                <div className="col-auto">
                    <SpinnerButton spinning={loading} onClick={onReload} size="sm">Reload</SpinnerButton>
                </div>
                <div className="col-auto">
                    <FormCheck label="Show Inactive" checked={showInactive}
                               onClick={() => setShowInactive(!showInactive)} type="checkbox" />
                </div>
            </div>
            <table className="table table-xs table-sticky">
                <caption>Loading: {loading}</caption>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Repy To</th>
                    <th>Schedule</th>
                </tr>
                </thead>
                <tbody>
                {list
                    .filter(row => showInactive || !!row.enabled)
                    .map(row => (
                    <tr key={row.id} className={classNames({'text-danger': !row.enabled})}>
                        <td>{row.title}</td>
                        <td>{row.reply_to}</td>
                        <td><WeekDays weekDays={row.week_days} /> {row.month_days}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default ReportList;

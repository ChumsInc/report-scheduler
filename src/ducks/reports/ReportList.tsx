import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchReportsAction} from "./actions";
import {selectList, selectReportsLoading} from "./selectors";
import {FormCheck, SpinnerButton} from "chums-ducks";
import classNames from "classnames";
import WeekDays from "./WeekDays";
import MonthDays from "../current/MonthDays";
import {ReportRecord} from "../../app/types";
import {currentReportSelected} from "../current/actionTypes";
import {selectReportAction} from "../current/actions";
import {reportSorter} from "./utils";

const ReportList:React.FC = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectList);
    const [showInactive, setShowInactive] = useState(false);
    const loading = useSelector(selectReportsLoading);

    useEffect(() => {
        dispatch(fetchReportsAction());
    }, [])

    const onReload = () => dispatch(fetchReportsAction());

    const onClickRow = (row:ReportRecord) => dispatch(selectReportAction(row));

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
                    <th>Weekly</th>
                    <th>Monthly</th>
                </tr>
                </thead>
                <tbody>
                {list
                    .filter(row => showInactive || !!row.enabled)
                    .sort(reportSorter('title', true))
                    .map(row => (
                    <tr key={row.id} className={classNames({'text-danger': !row.enabled})} onClick={() => onClickRow(row)}>
                        <td>{row.title}</td>
                        <td><WeekDays weekDays={row.week_days} /></td>
                        <td><MonthDays monthDays={row.month_days} /></td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default ReportList;

import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {loadReports} from "@/ducks/reports/actions";
import WeekDays from "@/ducks/reports/WeekDays";
import MonthDays from "@/components/common/MonthDays";
import {ReportRecord} from "@/app/types";
import {ProgressBar} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import ReportActionBar from "@/components/reports/ReportActionBar";
import {SortableTable, SortableTableField, SortProps, TablePagination} from "@chumsinc/sortable-tables";
import {selectSort, selectSortedList, selectStatus, setSort} from "@/ducks/reports";
import {loadReport} from "@/ducks/current/actions";

const fields: SortableTableField<ReportRecord>[] = [
    {field: 'id', title: 'ID', sortable: true, align: 'end'},
    {field: 'title', title: 'Title', sortable: true},
    {field: 'week_days', title: 'Weekly', sortable: true, render: (row) => <WeekDays weekDays={row.week_days}/>},
    {field: 'month_days', title: 'Monthly', sortable: true, render: (row) => <MonthDays monthDays={row.month_days}/>},
];

const ReportList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectSortedList);
    const loading = useSelector(selectStatus);
    const sort = useAppSelector(selectSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    useEffect(() => {
        dispatch(loadReports());
    }, [])

    const onChangeRowsPerPage = (rpp: number) => {
        setPage(0);
        setRowsPerPage(rpp);
    }

    const onClickRow = (row: ReportRecord) => {
        dispatch(loadReport(row.id));
    }

    const sortChangeHandler = (sort: SortProps<ReportRecord>) => {
        dispatch(setSort(sort));
    }

    return (
        <div>
            <ReportActionBar/>
            {loading !== 'idle' && (<ProgressBar striped animated now={100} className="my-1"/>)}
            <SortableTable<ReportRecord> fields={fields} data={list} size="sm"
                                         onSelectRow={onClickRow}
                                         currentSort={sort} onChangeSort={sortChangeHandler}
                                         keyField="id"/>
            <TablePagination page={page} onChangePage={setPage} count={list.length}
                             rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: onChangeRowsPerPage}}
                             showFirst showLast/>
        </div>
    )
}

export default ReportList;

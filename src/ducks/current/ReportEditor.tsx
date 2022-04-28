import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Alert, FormColumn} from "chums-ducks";
import {useDispatch, useSelector} from "react-redux";
import {defaultReport, selectCurrentReport} from "./selectors";
import {ReportRecord, WeekDay} from "../../app/types";
import WeekDayChooser from "./WeekDayChooser";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {fetchReportAction, saveReportAction} from "./actions";
import classNames from "classnames";


const colWidth = 10;

const ReportEditor: React.FC = () => {
    const dispatch = useDispatch();
    const current = useSelector(selectCurrentReport);
    const [report, setReport] = useState<ReportRecord>(current || defaultReport);

    useEffect(() => {
        if (current) {
            setReport(current);
        }
    }, [current]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(saveReportAction(report));
    }

    const handleClickReload = () => {
        if (!current || !current.id) {
            return setReport(defaultReport);
        }
        dispatch(fetchReportAction(current.id))
    }

    const changeHandler = (field: keyof ReportRecord) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (field) {
        case 'id':
        case 'changed':
        case 'week_days':
        case 'enabled':
        case 'data_type':
            return;
        case 'month_days':
            setReport({
                ...report,
                'month_days': ev.target.value.split(/\s*[,; ]\s*/),
                changed: true,
            });
            return;
        }
        setReport({
            ...report,
            [field]: ev.target.value || '',
            changed: true,
        })
    }

    const onChangeWeekDays = (days: WeekDay[]) => setReport({
        ...report,
        week_days: days,
        changed: true,
    });

    const onChangePath = (ev: ChangeEvent<HTMLTextAreaElement>) => setReport({
        ...report,
        url_path: ev.target.value.replace(/[\n\s]*/g, ''),
        changed: true,
    });

    const onChangeURLGenerator = (value:string) => setReport({
        ...report,
        url_generator: value,
        changed: true,
    })

    return (
        <form onSubmit={submitHandler} spellCheck="false">
            <h3 className={classNames({'text-warning': report.changed})}>
                Report Editor
                {report.changed && <span className="bi-exclamation-triangle-fill"/>}
            </h3>
            <FormColumn label="Title" width={colWidth}>
                <div className="input-group input-group-sm">
                    <div className="input-group-text">{report.id || 'New'}</div>
                    <input type="text" className="form-control form-control-sm" value={report.title}
                           onChange={changeHandler('title')}/>
                </div>
            </FormColumn>
            <FormColumn label="Reply To" width={colWidth}>
                <div className="input-group input-group-sm">
                    <div className="input-group-text"><span className="bi-reply"/></div>
                    <input type="text" className="form-control form-control-sm" value={report.reply_to}
                           onChange={changeHandler('reply_to')}/>
                </div>
            </FormColumn>
            <FormColumn label="Week Days" width={colWidth}>
                <WeekDayChooser week_days={report.week_days} onChange={onChangeWeekDays}/>
            </FormColumn>
            <FormColumn label="Month Days" width={colWidth}>
                <div className="input-group input-group-sm">
                    <div className="input-group-text"><span className="bi-calendar3"/></div>
                    <input type="text" className="form-control form-control-sm" value={report.month_days.join(', ')}
                           onChange={changeHandler('month_days')}/>
                </div>
                <small className="text-muted">
                    Enter numbers (separated by commas), #L for last weekday of the month, or L for last day of the
                    month.
                </small>
            </FormColumn>
            <hr/>
            <FormColumn label="Report URL" width={colWidth}>
                <textarea className="form-control form-control-sm" value={report.url_path} onChange={onChangePath}/>
            </FormColumn>
            <FormColumn label="URL Generator" width={colWidth}>
                <AceEditor mode="javascript" value={report.url_generator} onChange={onChangeURLGenerator}
                           maxLines={30} minLines={5} style={{width: "100%"}}/>
            </FormColumn>
            <FormColumn label={""} width={colWidth} >
                <button type="submit" className="btn btn-sm btn-primary me-1">Save</button>
                <button type="button" className="btn btn-sm btn-outline-secondary me-3" onClick={handleClickReload}>Reload</button>
            </FormColumn>
            {report.changed && <Alert color="warning">Don't forget to save</Alert>}
        </form>
)
}

export default ReportEditor;

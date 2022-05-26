import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Alert, FormCheck, FormColumn, Modal, SpinnerButton} from "chums-ducks";
import {useDispatch, useSelector} from "react-redux";
import {defaultReport, selectCurrentLoading, selectCurrentReport, selectCurrentSaving} from "./selectors";
import {ReportRecord, WeekDay} from "../../app/types";
import WeekDayChooser from "./WeekDayChooser";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {execRunAction, fetchReportAction, saveReportAction} from "./actions";
import classNames from "classnames";
import ExecResult from "./ExecResult";


const colWidth = 10;

const ReportEditor: React.FC = () => {
    const dispatch = useDispatch();
    const current = useSelector(selectCurrentReport);
    const loading = useSelector(selectCurrentLoading);
    const saving = useSelector(selectCurrentSaving);

    const [report, setReport] = useState<ReportRecord>(current || defaultReport);
    const [showModal, setShowModal] = useState(false);

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

    const changeHandler = (field: keyof ReportRecord) => (ev?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (field) {
        case 'id':
        case 'changed':
        case 'week_days':
        case 'data_type':
            return;
        case 'enabled':
            setReport({...report, enabled: !report.enabled, changed: true});
            return;
        case 'month_days':
            if (!ev) {
                return;
            }
            setReport({
                ...report,
                'month_days': ev.target.value.split(/\s*[,; ]\s*/),
                changed: true,
            });
            return;
        }
        if (!ev) {
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

    const onChangeURLGenerator = (value: string) => setReport({
        ...report,
        url_generator: value,
        changed: true,
    })

    const handleExec = () => {
        setShowModal(true);
        dispatch(execRunAction(report))
    }

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
            <FormColumn label="Status" width={colWidth}>
                <FormCheck label="Enabled" checked={report.enabled} onClick={changeHandler('enabled')} type="checkbox"/>
                {!report.enabled &&
                    <Alert color="warning"><span className="bi-exclamation-triangle-fill me-3"/>Report is
                        disabled.</Alert>}
            </FormColumn>
            <hr/>
            <FormColumn label="Report URL" width={colWidth}>
                <textarea className="form-control form-control-sm" value={report.url_path} onChange={onChangePath}/>
            </FormColumn>
            <FormColumn label="URL Generator" width={colWidth}>
                <AceEditor mode="javascript" value={report.url_generator} onChange={onChangeURLGenerator}
                           maxLines={30} minLines={5} style={{width: "100%"}}/>
            </FormColumn>
            <FormColumn label={""} width={colWidth}>
                <SpinnerButton type="submit" color="primary" className="me-1" size="sm"
                               spinning={saving}>Save</SpinnerButton>
                <SpinnerButton type="button" color="outline-secondary" className="me-3" size="sm"
                               onClick={handleClickReload} spinning={loading}>Reload</SpinnerButton>
                <button type="button" className="btn btn-sm btn-outline-secondary me-3" onClick={handleExec}
                        disabled={report.changed || report.id === 0}>
                    Exec Dry Run
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary me-3"
                        onClick={() => setShowModal(true)}>
                    Show Run Result
                </button>
            </FormColumn>
            {report.changed && <Alert color="warning">Don't forget to save</Alert>}
            {showModal && (
                <Modal size="xl" onClose={() => setShowModal(false)}><ExecResult/></Modal>
            )}
        </form>
    )
}

export default ReportEditor;

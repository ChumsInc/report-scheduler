import React, {ChangeEvent, FormEvent, useEffect, useId, useState} from 'react';
import {useSelector} from "react-redux";

import {ReportRecord, WeekDay} from "@/app/types";
import WeekDayChooser from "@/components/common/WeekDayChooser";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {loadReport, runReport, saveReport} from "@/ducks/current/actions";
import classNames from "classnames";
import ExecResult from "@/components/reports/ExecResult";
import {useAppDispatch} from "@/app/configureStore";
import {newReport} from "@/ducks/current/utils";
import {selectCurrentReport, selectCurrentReportStatus} from "@/ducks/current";
import {Alert, Button, Col, Form, FormCheck, Modal, Row, Stack} from "react-bootstrap";
import ReportMonthDaysInput from "@/components/reports/ReportMonthDaysInput";
import ReportTextInput from "@/components/reports/ReportTextInput";
import ChumsFormGroup from "@/components/common/ChumsFormGroup";


const colWidth = 10;

const ReportEditor: React.FC = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentReport);
    const status = useSelector(selectCurrentReportStatus);
    const enabledId = useId();

    const [report, setReport] = useState<ReportRecord>(current);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (current) {
            setReport(current);
        }
    }, [current]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(saveReport(report));
    }

    const handleClickReload = () => {
        if (!current || !current.id) {
            return setReport(newReport);
        }
        dispatch(loadReport(current.id))
    }

    const changeHandler = (field: keyof ReportRecord) => (ev?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (field) {
            case 'id':
            case 'changed':
            case 'week_days':
            case 'data_type':
                return;
            case 'enabled':
                setReport({...report, enabled: (ev?.target as HTMLInputElement).checked, changed: true});
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

    const reportChangeHandler = (change: Partial<ReportRecord>) => {
        setReport({...report, ...change, changed: true});
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
        if (report.changed || !report.id) {
            return;
        }
        setShowModal(true);
        dispatch(runReport({idReport: report.id, dryRun: true}))
    }

    return (
        <Form onSubmit={submitHandler} spellCheck="false">
            <h3 className={classNames({'text-warning': report.changed})}>
                Report Editor
                {report.changed && <span className="bi-exclamation-triangle-fill"/>}
            </h3>
            <Row>
                <Col sm={4}>
                    <ReportTextInput report={report} field="title" label="Title"
                                     containerProps={{labelWidth: 4}}
                                     inputGroupLabel={`ID: ${report.id || 'New'}`}
                                     onChange={reportChangeHandler}/>
                    <ReportTextInput report={report} field="reply_to" label="Reply To"
                                     containerProps={{labelWidth: 4}}
                                     inputGroupLabel={<span className="bi-reply"/>}
                                     onChange={reportChangeHandler}/>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Week Days</Form.Label>
                        <Col>
                            <WeekDayChooser week_days={report.week_days} onChange={onChangeWeekDays}/>
                        </Col>
                    </Form.Group>
                    <ReportMonthDaysInput report={report} onChange={reportChangeHandler}/>
                    <ChumsFormGroup label="Status" labelWidth={4}>
                        <Col>
                            <FormCheck label="Enabled" id={enabledId}
                                       checked={report.enabled} onChange={changeHandler('enabled')} type="checkbox"/>
                            {!report.enabled && (
                                <Alert variant="warning">
                                    <span className="bi-exclamation-triangle-fill me-3"/>
                                    Report is disabled
                                </Alert>
                            )}

                        </Col>
                    </ChumsFormGroup>
                </Col>
                <Col sm={8}>
                    <ReportTextInput report={report} field="url_path" label="Report URL"
                                     onChange={reportChangeHandler}/>
                    <ChumsFormGroup label="URL Generator" labelWidth={2} className="mb-3">
                        <Col>
                            <AceEditor mode="javascript" value={report.url_generator} onChange={onChangeURLGenerator}
                                       maxLines={30} minLines={5} style={{width: "100%"}}/>
                        </Col>
                    </ChumsFormGroup>
                </Col>
            </Row>

            <hr/>
            <Stack direction="horizontal" gap={3} className="justify-content-end">
                <Button type="button" variant="outline-secondary" size="sm"
                        onClick={handleExec}
                        disabled={report.changed || report.id === 0 || status !== 'idle'}>
                    Exec Dry Run
                </Button>
                <Button type="button" variant="outline-secondary" size="sm" onClick={() => setShowModal(true)}>
                    Show Run Result
                </Button>
                <Button type="button" variant="outline-secondary" size="sm"
                        onClick={handleClickReload} disabled={status !== 'idle'}>
                    Reload
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={status !== 'idle'}>Save</Button>
            </Stack>
            {report.changed && <Alert color="warning">Don't forget to save</Alert>}
            <Modal size="xl" onClose={() => setShowModal(false)} show={showModal}><ExecResult/></Modal>
        </Form>
    )
}

export default ReportEditor;

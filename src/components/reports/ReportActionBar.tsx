import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {Button, Col, FormCheck, Row} from "react-bootstrap";
import {loadReports} from "@/ducks/reports/actions";
import {selectShowInactive, selectStatus, setShowInactive} from "@/ducks/reports";

export default function ReportActionBar() {
    const dispatch = useAppDispatch();
    const id = useId();
    const showInactive = useAppSelector(selectShowInactive);
    const status = useAppSelector(selectStatus);

    const onReload = () => dispatch(loadReports());
    const onChangeShowInactive = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowInactive(ev.target.checked));
    }

    const onNewReport = () => {
        // () => onClickRow(defaultReport)
    }

    return (
        <Row className="g-3 align-items-baseline">
            <Col xs="auto">
                <FormCheck label="Show Inactive" checked={showInactive} id={id}
                           onChange={onChangeShowInactive} type="checkbox"/>
            </Col>
            <Col/>
            <Col xs="auto">
                <Button onClick={onNewReport} variant="outline-secondary" size="sm">
                    New
                </Button>
            </Col>
            <Col xs="auto">
                <Button disabled={status !== 'idle'} onClick={onReload} variant="primary" size="sm">Reload</Button>
            </Col>
        </Row>
    )
}

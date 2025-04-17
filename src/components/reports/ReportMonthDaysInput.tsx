import React, {ChangeEvent, useId} from 'react';
import {ReportRecord} from "@/app/types";
import {Col, Form, FormControl, FormControlProps, InputGroup, Row} from "react-bootstrap";

export interface ReportMonthDaysInputProps extends Omit<FormControlProps, 'value' | 'onChange' | 'id'> {
    report: ReportRecord;
    onChange: (changes: Partial<ReportRecord>) => void;
}

export default function ReportMonthDaysInput({report, onChange, ...rest}: ReportMonthDaysInputProps) {
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        onChange({
            month_days: ev.target.value.split(/\s*[,; ]\s*/),
        });
    }

    return (
        <Form.Group as={Row}>
            <Form.Label column sm={4} htmlFor={id}>
                Month Days
            </Form.Label>
            <Col>
                <InputGroup size="sm">
                    <InputGroup.Text><span className="bi-calendar3" /></InputGroup.Text>
                    <FormControl type="text" id={id}
                                 value={report.month_days.join(', ')} onChange={changeHandler}
                                 {...rest} />
                </InputGroup>
                <Form.Text>
                    Enter numbers (separated by commas), #L for last weekday of the month, or L for last day of the
                    month.
                </Form.Text>
            </Col>
        </Form.Group>
    )
}

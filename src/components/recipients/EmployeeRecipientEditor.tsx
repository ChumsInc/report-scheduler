import React, {ChangeEvent, useId} from 'react';
import {EmailRecipient, Recipient} from "@/app/types";
import {Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import EmailAddress from "@/components/common/EmailAddress";

export interface EmployeeRecipientEditorProps {
    recipient: Recipient;
    onChange: (value: Partial<EmailRecipient>) => void;
}

export default function EmployeeRecipientEditor({recipient, onChange}: EmployeeRecipientEditorProps) {
    const emailId = useId();
    const nameId = useId();

    if (recipient.RecipientType !== 'email') {
        return null;
    }
    const changeHandler = (field: keyof EmailRecipient) => (ev: ChangeEvent<HTMLInputElement>) => {
        onChange({[field]: ev.target.value})
    }

    return (
        <>
            <Form.Group as={Row}>
                <Form.Label column sm={2} htmlFor={emailId}>Email</Form.Label>
                <Col sm={10}>
                    <InputGroup size="sm">
                        <InputGroup.Text aria-hidden>@</InputGroup.Text>
                        <FormControl type="text" size="sm" required id={emailId}
                                     value={recipient.EmailAddress}
                                     onChange={changeHandler('EmailAddress')}/>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2} htmlFor={nameId}>Name</Form.Label>
                <Col>
                    <InputGroup size="sm">
                        <InputGroup.Text aria-hidden>
                            <span className="bi-person-fill"/>
                        </InputGroup.Text>
                        <FormControl type="text" size="sm" required id={nameId}
                                     value={recipient.Name ?? ''}
                                     onChange={changeHandler('Name')}/>
                    </InputGroup>

                </Col>
            </Form.Group>
            <Row className="g-3">
                <Col xs="auto">
                    <span className="text-secondary">
                        {recipient.Name}
                    </span>
                </Col>
                <Col>
                    <small className="text-secondary">
                        <EmailAddress email={recipient.EmailAddress}/>
                    </small>
                </Col>
            </Row>
        </>

    )
}

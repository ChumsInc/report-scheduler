import React, {ChangeEvent, useId} from 'react';
import {CustomerRecipient, Recipient} from "@/app/types";
import {Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import EmailAddress from "@/components/common/EmailAddress";

export interface CustomerRecipientEditorProps {
    recipient: Recipient;
    onChange: (value: Partial<CustomerRecipient>) => void;
}

export default function CustomerRecipientEditor({recipient, onChange}: CustomerRecipientEditorProps) {
    const divisionId = useId();
    const customerId = useId();

    if (recipient.RecipientType !== 'cust') {
        return null;
    }
    const changeHandler = (field: keyof CustomerRecipient) => (ev: ChangeEvent<HTMLInputElement>) => {
        onChange({[field]: ev.target.value})
    }

    return (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>Rep</Form.Label>
            <Col>
                <InputGroup size="sm">
                    <InputGroup.Text as="label" htmlFor={divisionId}>
                        <span aria-label="AR Division No">##</span>
                    </InputGroup.Text>
                    <FormControl type="text" size="sm" required id={divisionId}
                                 value={recipient.SalespersonDivisionNo}
                                 onChange={changeHandler('ARDivisionNo')}
                                 maxLength={2} minLength={2}/>
                    <InputGroup.Text as="label" htmlFor={customerId}>
                        <span aria-label="Customer No">XX####</span>
                    </InputGroup.Text>
                    <FormControl type="text" size="sm" required id={customerId}
                                 value={recipient.SalespersonNo}
                                 onChange={changeHandler('CustomerNo')}
                                 minLength={4} maxLength={4}/>
                </InputGroup>
                <Row className="g-3">
                    <Col xs="auto">
                            <span className="text-secondary">
                                <strong className="me-3">
                                    {recipient.ARDivisionNo}-{recipient.CustomerNo}
                                </strong>
                                {recipient.Name}
                            </span>
                    </Col>
                    <Col>
                        <small className="text-muted">
                            <EmailAddress email={recipient.EmailAddress}/>
                        </small>
                    </Col>
                </Row>
            </Col>
        </Form.Group>
    )
}

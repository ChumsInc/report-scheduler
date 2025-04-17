import React, {ChangeEvent, useId} from 'react';
import {Recipient, RepRecipient} from "@/app/types";
import {Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import EmailAddress from "@/components/common/EmailAddress";

export interface RepRecipientEditorProps {
    recipient: Recipient;
    onChange: (value: Partial<RepRecipient>) => void;
}

export default function RepRecipientEditor({recipient, onChange}: RepRecipientEditorProps) {
    const divisionId = useId();
    const salespersonId = useId();

    if (recipient.RecipientType !== 'rep') {
        return null;
    }
    const changeHandler = (field: keyof RepRecipient) => (ev: ChangeEvent<HTMLInputElement>) => {
        onChange({[field]: ev.target.value})
    }

    return (
        <>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Rep</Form.Label>
                <Col>
                    <InputGroup size="sm">
                        <InputGroup.Text as="label" htmlFor={divisionId}>
                            <span aria-label="Salesperson Division No">##</span>
                        </InputGroup.Text>
                        <FormControl type="text" size="sm" required id={divisionId}
                                     value={recipient.SalespersonDivisionNo}
                                     onChange={changeHandler('SalespersonDivisionNo')}
                                     maxLength={2} minLength={2}/>
                        <InputGroup.Text as="label" htmlFor={salespersonId}>
                            <span aria-label="Salesperson No">XXXX</span>
                        </InputGroup.Text>
                        <FormControl type="text" size="sm" required id={salespersonId}
                                     value={recipient.SalespersonNo}
                                     onChange={changeHandler('SalespersonNo')}
                                     minLength={4} maxLength={4} />
                    </InputGroup>
                    <Row className="g-3">
                        <Col xs="auto">
                            <span className="text-secondary">
                                <strong className="me-3">
                                    {recipient.SalespersonDivisionNo}-{recipient.SalespersonNo}
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
            <Form.Group as={Row}>
                <Form.Label column sm={2}>CC</Form.Label>
                <Col sm={10}>
                    <Row className="g-3 align-items-baseline">
                        <Col xs="auto">
                            <small className="text-secondary">{recipient.SalesManagerName}</small>
                        </Col>
                        <Col xs="auto">
                            <small className="text-secondary">
                                <EmailAddress email={recipient.SalesManagerEmailAddress}/>
                            </small>
                        </Col>
                    </Row>
                </Col>
            </Form.Group>
        </>
    )
}

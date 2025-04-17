import React, {ChangeEvent, FormEvent, useEffect, useId, useState} from 'react';
import {useSelector} from "react-redux";
import {Recipient, RecipientType} from "@/app/types";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCurrentRecipient, selectCurrentReport, selectCurrentReportStatus} from "@/ducks/current";
import {defaultRecipient} from "@/ducks/current/utils";
import {removeRecipient, saveRecipient} from "@/ducks/current/actions";
import {Button, Col, Form, FormCheck, Row, Stack} from "react-bootstrap";
import RecipientTypeInput from "@/components/recipients/RecipientTypeInput";
import RepRecipientEditor from "@/components/recipients/RepRecipientEditor";
import CustomerRecipientEditor from "@/components/recipients/CustomerRecipientEditor";
import EmployeeRecipientEditor from "@/components/recipients/EmployeeRecipientEditor";

const RecipientEditor: React.FC = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentRecipient);
    const report = useSelector(selectCurrentReport);
    const status = useAppSelector(selectCurrentReportStatus);
    const [recipient, setRecipient] = useState<Recipient>(current ?? defaultRecipient(report.id));
    const enabledId = useId();

    useEffect(() => {
        setRecipient(defaultRecipient(report.id));
    }, [report.id]);

    useEffect(() => {
        setRecipient(current || defaultRecipient(report.id));
    }, [current]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(saveRecipient(recipient));
    }

    const changeHandler = (field: keyof Recipient) => (ev?: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
            case 'active':
                return setRecipient({...recipient, active: !recipient.active, changed: true});
            case 'SalespersonDivisionNo':
            case 'SalespersonNo':
            case 'CustomerNo':
            case 'ARDivisionNo':
            case 'EmailAddress':
            case 'Name':
                return setRecipient({...recipient, [field]: ev?.target.value || ''});
        }
    }
    const recipientChangeHandler = (value: Partial<Recipient>) => {
        setRecipient({...recipient, ...value, changed: true});
    }

    const recipientTypeHandler = (type: RecipientType) => setRecipient({
        ...recipient,
        RecipientType: type,
        changed: true
    });

    const newRecipientHandler = () => {
        setRecipient({...defaultRecipient(report?.id || 0)});
    }

    const deleteHandler = () => {
        if (recipient.id === 0) {
            return;
        }
        if (window.confirm('Are you sure you want to delete this recipient?')) {
            dispatch(removeRecipient(recipient));
        }
    }

    return (
        <>
            <Form onSubmit={submitHandler}>
                <Form.Group as={Row}>
                    <Form.Label column sm={2} htmlFor={enabledId}>ID: {recipient.id}</Form.Label>
                    <Col sm={10}>
                        <FormCheck label="Enabled" id={enabledId}
                                   checked={recipient?.active || false} onChange={changeHandler('active')}
                                   type="checkbox"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Type</Form.Label>
                    <Col sm={10}>
                        <RecipientTypeInput type={recipient.RecipientType} onChange={recipientTypeHandler}/>
                    </Col>
                </Form.Group>
                <RepRecipientEditor recipient={recipient} onChange={recipientChangeHandler}/>
                <CustomerRecipientEditor recipient={recipient} onChange={recipientChangeHandler}/>
                <EmployeeRecipientEditor recipient={recipient} onChange={recipientChangeHandler}/>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="button" variant="outline-danger" size="sm"
                            disabled={!recipient.id || status !== 'idle'}
                            onClick={deleteHandler}>
                        Delete
                    </Button>
                    <Button type="button" variant="outline-secondary" size="sm"
                            onClick={newRecipientHandler}>
                        New
                    </Button>
                    <Button type="submit" variant="primary" size="sm"
                            disabled={!recipient.RecipientType || status !== 'idle'}>
                        Save
                    </Button>
                </Stack>
            </Form>
            <code>
                <pre>URL Params = {JSON.stringify(recipient, undefined, 2)}</pre>
            </code>
        </>
    )
}

export default RecipientEditor;

import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {FormCheck, FormColumn, InputGroup} from "chums-ducks";
import {useDispatch, useSelector} from "react-redux";
import {defaultRecipient, selectCurrentReport, selectSelectedRecipient} from "./selectors";
import {Recipient, RecipientType} from "../../app/types";
import {deleteRecipientAction, saveRecipientAction} from "./actions";

const colWidth = 10;

const RecipientEditor: React.FC = () => {
    const dispatch = useDispatch();
    const selected = useSelector(selectSelectedRecipient);
    const report = useSelector(selectCurrentReport);
    const [recipient, setRecipient] = useState<Recipient>(selected || defaultRecipient(report?.id || 0));

    useEffect(() => {
        setRecipient(defaultRecipient(report?.id || 0));
    }, [report?.id]);

    useEffect(() => {
        setRecipient(selected || defaultRecipient(report?.id || 0));
    }, [selected]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(saveRecipientAction(recipient));
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
            dispatch(deleteRecipientAction(recipient));
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <FormColumn label={'ID: ' + recipient.id} width={colWidth}>
                    <FormCheck label="Enabled" checked={recipient?.active || false}
                               onClick={changeHandler('active')} type="checkbox"/>
                </FormColumn>
                <FormColumn label={'Type'} width={colWidth}>
                    <FormCheck label="Rep" checked={recipient.RecipientType === 'rep'}
                               onClick={() => recipientTypeHandler('rep')} type="radio" inline/>
                    <FormCheck label="Customer" checked={recipient.RecipientType === 'cust'}
                               onClick={() => recipientTypeHandler('cust')} type="radio" inline/>
                    <FormCheck label="Employee" checked={recipient.RecipientType === 'email'}
                               onClick={() => recipientTypeHandler('email')} type="radio" inline/>
                </FormColumn>
                {recipient.RecipientType === 'rep' && (
                    <>
                        <FormColumn label="Rep" width={colWidth}>
                            <InputGroup bsSize="sm">
                                <div className="input-group-text">##</div>
                                <input type="text" className="form-control form-control-sm" required
                                       value={recipient.SalespersonDivisionNo} maxLength={2} minLength={2}
                                       onChange={changeHandler('SalespersonDivisionNo')}/>
                                <div className="input-group-text">XXXX</div>
                                <input type="text" className="form-control form-control-sm" required
                                       value={recipient.SalespersonNo} minLength={4} maxLength={4}
                                       onChange={changeHandler('SalespersonNo')}/>
                            </InputGroup>
                            <div className="row g-3 align-items-baseline">
                                <small className="text-muted col-auto">
                                    <strong className="me-3">{recipient.SalespersonDivisionNo}-{recipient.SalespersonNo}</strong>
                                    {recipient.Name}
                                </small>
                                <small className="text-muted col"><EmailAddress email={recipient.EmailAddress} /></small>
                            </div>
                        </FormColumn>
                        <FormColumn label="CC" width={colWidth}>
                            <div className="row g-3 align-items-baseline">
                                <small className="text-muted col-auto">{recipient.SalesManagerName}</small>
                                <small className="text-muted col">
                                    <EmailAddress email={recipient.SalesManagerEmailAddress} />
                                </small>
                            </div>
                        </FormColumn>
                    </>
                )}
                {recipient.RecipientType === 'cust' && (
                    <>
                        <FormColumn label="Account" width={colWidth}>
                            <InputGroup bsSize="sm">
                                <div className="input-group-text">##</div>
                                <input type="text" className="form-control form-control-sm" required
                                       value={recipient.ARDivisionNo || ''} maxLength={2} minLength={2}
                                       placeholder="AR Division No"
                                       onChange={changeHandler('ARDivisionNo')}/>
                                <div className="input-group-text">XX####</div>
                                <input type="text" className="form-control form-control-sm" required
                                       value={recipient.CustomerNo || ''} minLength={4} maxLength={20}
                                       placeholder="Customer No"
                                       onChange={changeHandler('CustomerNo')}/>
                            </InputGroup>
                            <div className="row g-3 align-items-baseline">
                                <small className="text-muted col-auto">
                                    <strong className="me-3">{recipient.ARDivisionNo}-{recipient.CustomerNo}</strong>
                                    {recipient.Name}
                                </small>
                                <small className="text-muted col">
                                    <EmailAddress email={recipient.EmailAddress} />
                                </small>
                            </div>
                        </FormColumn>
                        <FormColumn label="CC" width={colWidth}>
                            <div className="row g-3 align-items-baseline">
                                <small className="text-muted col-auto">{recipient.SalesManagerName}</small>
                                <small className="text-muted col">
                                    <EmailAddress email={recipient.SalesManagerEmailAddress} />
                                </small>
                            </div>
                        </FormColumn>
                    </>
                )}
                {recipient.RecipientType === 'email' && (
                    <>
                        <FormColumn label="Email" width={colWidth}>
                            <InputGroup bsSize="sm">
                                <div className="input-group-text">@</div>
                                <input type="email" className="form-control form-control-sm" required
                                       value={recipient.EmailAddress || ''} maxLength={50}
                                       onChange={changeHandler('EmailAddress')}/>
                            </InputGroup>
                        </FormColumn>
                        <FormColumn label="Name" width={colWidth}>
                            <InputGroup bsSize="sm">
                                <div className="input-group-text"><span className="bi-person-fill" /></div>
                                <input type="text" className="form-control form-control-sm" required
                                       value={recipient.Name || ''} maxLength={50}
                                       onChange={changeHandler('Name')}/>
                            </InputGroup>
                        </FormColumn>
                    </>
                )}
                <button type="submit" className="btn btn-sm btn-primary me-3">Save</button>
                <button type="button" className="btn btn-sm btn-outline-secondary me-3" onClick={newRecipientHandler}>New</button>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={deleteHandler}>Delete</button>
            </form>
            <code>
                <pre>URL Params = {JSON.stringify(recipient, undefined, 2)}</pre>
            </code>
        </>
    )
}

export default RecipientEditor;

const EmailAddress: React.FC<{ email: string|null }> = ({email}) => (
    <>
        {(email || '').split(';')
            .map((email, index) => (
                    <span key={index} className="me-2">&lt;{email || 'No Email'}&gt;</span>
                )
            )}
    </>

)

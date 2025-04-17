import React, {useId} from 'react';
import {RecipientType} from "@/app/types";
import {FormCheck} from "react-bootstrap";

export interface RecipientTypeInputProps {
    type: RecipientType;
    onChange: (value: RecipientType) => void;
}

export default function RecipientTypeInput({type, onChange}: RecipientTypeInputProps) {
    const repId = useId();
    const customerId = useId();
    const employeeId = useId();

    return (
        <div>
            <FormCheck label="Rep" type="radio" inline id={repId}
                       checked={type === 'rep'}
                       onChange={() => onChange('rep')}/>
            <FormCheck label="Customer" type="radio" inline id={customerId}
                       checked={type === 'cust'}
                       onChange={() => onChange('cust')}/>
            <FormCheck label="Employee" type="radio" inline id={employeeId}
                       checked={type === 'email'}
                       onChange={() => onChange('email')}/>
        </div>
    )
}

import React, {useId} from 'react';
import {Form, Row, RowProps} from "react-bootstrap";

export interface ChumsFormGroupProps extends RowProps {
    label: React.ReactNode;
    labelWidth: number;
    children: React.ReactNode;
}

export default function ChumsFormGroup({label, labelWidth, children, ...props}: ChumsFormGroupProps) {
    const id = useId();
    return (
        <Form.Group as={Row} {...props}>
            <Form.Label column sm={labelWidth} htmlFor={id}>
                {label}
            </Form.Label>
            {children}
        </Form.Group>
    )
}

import React, {ChangeEvent, useId} from 'react';
import {ReportRecord} from "@/app/types";
import {Col, FormControl, FormControlProps, FormText, FormTextProps, InputGroup} from "react-bootstrap";
import ChumsFormGroup, {ChumsFormGroupProps} from "@/components/common/ChumsFormGroup";

export interface ReportTextInputProps extends Omit<FormControlProps, 'value' | 'onChange' | 'id'> {
    report: ReportRecord;
    field: keyof Omit<ReportRecord, 'data_type' | 'enabled' | 'week_days' | 'month_days' | 'changed'>;
    label: string;
    inputGroupLabel?: string | React.ReactNode;
    onChange: (changes: Partial<ReportRecord>) => void;
    containerProps?: Partial<ChumsFormGroupProps>;
    formText?: string | React.ReactNode;
    formTextProps?: FormTextProps;
}

export default function ReportTextInput({
                                            report,
                                            field,
                                            label,
                                            inputGroupLabel,
                                            onChange,
                                            containerProps,
    formText,
    formTextProps,
                                            ...rest
                                        }: ReportTextInputProps) {
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        onChange({
            [field]: ev.target.value,
        });
    }

    return (
        <ChumsFormGroup labelWidth={2} label={label} {...containerProps}>
            <Col>
                {inputGroupLabel && (
                    <InputGroup size="sm">
                        <InputGroup.Text>{inputGroupLabel}</InputGroup.Text>
                        <FormControl type="text" id={id} size="sm"
                                     value={report[field] ?? ''} onChange={changeHandler}
                                     {...rest} />
                    </InputGroup>
                )}
                {!inputGroupLabel && (
                    <FormControl type="text" id={id} size="sm"
                                 value={report[field] ?? ''} onChange={changeHandler}
                                 {...rest} />
                )}
                {!!formText && (
                    <FormText {...formTextProps}>{formText}</FormText>
                )}
            </Col>
        </ChumsFormGroup>
    )
}

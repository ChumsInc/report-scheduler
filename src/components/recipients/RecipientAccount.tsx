import React from 'react';
import {Recipient} from "@/app/types";

export interface RecipientAccountIconProps {
    recipient: Recipient;
}
export default function RecipientAccountIcon({recipient}:RecipientAccountIconProps) {
    switch (recipient.RecipientType) {
        case 'cust':
            return (
                <div>
                    <span className="bi-building-fill me-3" />
                    {recipient.ARDivisionNo}-{recipient.CustomerNo}
                </div>
            )
        case 'rep':
            return (
                <div>
                    <span className="bi-people-fill me-3" />
                    {recipient.SalespersonDivisionNo}-{recipient.SalespersonNo}
                </div>
            )
        case 'email':
            return (
                <span className="bi-person-fill" />
            )
        default:
            return null;
    }
}

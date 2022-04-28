import {Recipient} from "../app/types";

export type ActionStatus = 'pending'|'resolved'|'rejected';

export const actionHelper = (actionType: string, status: ActionStatus) => `${actionType}/${status}`;
export const apiActionHelper = (actionType: string):[pending:string, resolved:string, rejected: string] =>
    [
        actionHelper(actionType, 'pending'),
        actionHelper(actionType, 'resolved'),
        actionHelper(actionType, 'rejected')
    ];

export const recipientSorter = (a:Recipient, b:Recipient) => {
    const aAcct = recipientAccount(a);
    const bAcct = recipientAccount(b);
    return aAcct === bAcct
        ? (a.id - b.id)
        : (aAcct > bAcct ? 1 : -1);
}

const recipientAccount = (r:Recipient) =>  {
    switch (r.RecipientType) {
    case 'rep':
        return `${r.SalespersonDivisionNo}-${r.SalespersonNo}`;
    case "cust":
        return `${r.ARDivisionNo}-${r.CustomerNo}`;
    default:
        return r.EmailAddress.toLowerCase();
    }
}

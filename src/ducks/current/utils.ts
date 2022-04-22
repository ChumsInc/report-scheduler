import {Recipient, ReportRecord} from "../../app/types";

export const recipientCompare = (field: keyof Recipient = 'id') =>
    (a:Recipient, b:Recipient):number => {
        switch (field) {
        case 'id':
        case 'changed':
        case 'active':
        case 'idReport':
            return a.id - b.id;
        case 'RecipientData':
            return a.RecipientData.EmailAddress.toLowerCase() === b.RecipientData.EmailAddress.toLowerCase()
                ? recipientCompare('id')(a, b)
                : (a.RecipientData.EmailAddress.toLowerCase() > b.RecipientData.EmailAddress.toLowerCase() ? 1 : -1)
        default:
            return (a[field] || '').toLowerCase() === (b[field] || '').toLowerCase()
                ? recipientCompare('id')(a, b)
                : ((a[field] || '').toLowerCase() > (b[field] || '').toLowerCase() ? 1 : -1)
        }
    }
export const recipientSorter = (field:keyof Recipient = 'id', ascending: boolean = true) =>
    (a:Recipient, b:Recipient):number => {
        return recipientCompare(field)(a, b) * (ascending ? 1 : -1);
    }

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
// export const recipientSorter = (field:keyof Recipient = 'id', ascending: boolean = true) =>
//     (a:Recipient, b:Recipient):number => {
//         return recipientCompare(field)(a, b) * (ascending ? 1 : -1);
//     }

export const recipientIDSorter = (a:Recipient, b:Recipient):number => {
        return a.id - b.id;
}

export const recipientSorter = (a:Recipient, b:Recipient):number => {
    const aAcct = recipientAccount(a);
    const bAcct = recipientAccount(b);
    return aAcct === bAcct
        ? (a.id - b.id)
        : (aAcct > bAcct ? 1 : -1);
}

const recipientAccount = (r:Recipient):string =>  {
    switch (r.RecipientType) {
    case 'rep':
        return `${r.SalespersonDivisionNo}-${r.SalespersonNo}`;
    case "cust":
        return `${r.ARDivisionNo}-${r.CustomerNo}`;
    default:
        return r.EmailAddress.toLowerCase();
    }
}

import {Recipient, ReportRecord} from "@/app/types";
import {SortProps} from "@chumsinc/sortable-tables";

export const recipientSorter = ({field, ascending}:SortProps<Recipient>) =>
    (a:Recipient, b:Recipient):number => {
    const sortMod = ascending ? 1 : -1;
        switch (field) {
        case 'id':
        case 'changed':
        case 'active':
        case 'idReport':
            return (a.id - b.id) * sortMod;
        case 'RecipientData':
            return (
                a.RecipientData.EmailAddress.toLowerCase() === b.RecipientData.EmailAddress.toLowerCase()
                ? recipientSorter({field: 'id', ascending})(a, b)
                : (a.RecipientData.EmailAddress.toLowerCase() > b.RecipientData.EmailAddress.toLowerCase() ? 1 : -1)
            ) * sortMod;
        default:
            return (
                (a[field] ?? '').toLowerCase() === (b[field] ?? '').toLowerCase()
                ? recipientSorter({field: 'id', ascending})(a, b)
                : ((a[field] ?? '').toLowerCase() > (b[field] ?? '').toLowerCase() ? 1 : -1)
            ) * sortMod;
        }
    }
// export const recipientAccountSorter = (field:keyof Recipient = 'id', ascending: boolean = true) =>
//     (a:Recipient, b:Recipient):number => {
//         return recipientSorter(field)(a, b) * (ascending ? 1 : -1);
//     }

export const recipientIDSorter = (a:Recipient, b:Recipient):number => {
        return a.id - b.id;
}

export const recipientAccountSorter = (a:Recipient, b:Recipient):number => {
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

export const newReport: ReportRecord = {
    id: 0,
    title: '',
    data_type: null,
    enabled: true,
    url_path: '',
    url_query: '',
    url_generator: '',
    method: null,
    email_body: null,
    attachment_filename: null,
    attachment_mime_type: null,
    reply_to: '',
    month_days: [],
    week_days: [],
}

export const defaultRecipient = (idReport?: number): Recipient => ({
    id: 0,
    idReport: idReport ?? 0,
    RecipientType: null,
    active: true,
    RecipientData: {
        Name: '',
        EmailAddress: '',
    },
    Company: 'chums',
    EmailAddress: '',
    Name: '',
    ARDivisionNo: '',
    CustomerNo: '',
    SalespersonDivisionNo: '',
    SalespersonNo: '',
    SalesManagerDivisionNo: '',
    SalesManagerNo: '',
    SalesManagerEmailAddress: '',
    SalesManagerName: '',
    changed: false,
})

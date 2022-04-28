import {RootState} from "../../app/rootReducer";
import {EmailRecipient, Recipient, ReportRecord} from "../../app/types";


export const selectCurrentReport = (state:RootState) => state.current.report;
export const selectCurrentRecipients = (state:RootState) => state.current.recipients.list;
export const selectSelectedRecipient = (state:RootState) => state.current.recipients.selected;
export const selectCurrentLoading = (state:RootState) => state.current.loading;

export const defaultReport:ReportRecord = {
    id: 0,
    title: '',
    data_type: null,
    enabled: true,
    url_path: '',
    url_generator: '',
    url_query: null,
    method: null,
    email_body: null,
    attachment_filename: null,
    attachment_mime_type: null,
    reply_to: '',
    week_days: [],
    month_days: [],
}

export const defaultRecipient = (idReport:number):Recipient => ({
    id: 0,
    idReport,
    Company: 'chums',
    EmailAddress: '',
    RecipientType: null,
    active: true,
    RecipientData: {
        Name: '',
        EmailAddress: '',
    },
    Name: '',
    ARDivisionNo: '',
    CustomerNo: '',
    CustomerEmailAddress: '',
    CustomerName: '',
    SalespersonDivisionNo: '',
    SalespersonNo: '',
    SalespersonEmailAddress: '',
    SalespersonName: '',
    SalesManagerDivisionNo: '',
    SalesManagerNo: '',
    SalesManagerEmailAddress: '',
    SalesManagerName: '',
    changed: false,

})

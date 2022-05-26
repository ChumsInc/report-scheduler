import {RootState} from "../../app/rootReducer";
import {Recipient, ReportRecord} from "../../app/types";


export const selectCurrentReport = (state: RootState) => state.current.report;
export const selectCurrentRecipients = (state: RootState) => state.current.recipients.list;
export const selectSelectedRecipient = (state: RootState) => state.current.recipients.selected.recipient;
export const selectSelectedRecipientLoading = (state: RootState) => state.current.recipients.selected.loading;
export const selectSelectedRecipientSaving = (state: RootState) => state.current.recipients.selected.saving;
export const selectCurrentLoading = (state: RootState) => state.current.loading;
export const selectCurrentSaving = (state: RootState) => state.current.saving;
export const selectExecRun = (state: RootState) => state.current.execRun;
export const selectIsExecuting = (state: RootState) => state.current.isExecuting;

export const defaultReport: ReportRecord = {
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

export const defaultRecipient = (idReport?: number): Recipient => ({
    id: 0,
    idReport: idReport || 0,
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

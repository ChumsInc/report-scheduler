import SMTPTransport from "nodemailer/lib/smtp-transport";


export interface ReportRecord {
    id: number,
    title: string,
    data_type: unknown,
    enabled: boolean,
    url_path: string,
    url_generator: string,
    url_query: string|null,
    method: string|null,
    email_body: string|null,
    attachment_filename: string|null,
    attachment_mime_type: string|null,
    reply_to: string,
    week_days: WeekDay[],
    month_days: string[],
    changed?: boolean,
}

export interface MailerData {
    recipientData: Recipient,
    title: string,
    replyTo: string,
    recipients: Recipient[],
    cc: string[],
    content: string|object,
    contentUrl: string,
    error?: Error,
}
export interface RepRecipient {
    Company: string,
    SalespersonDivisionNo: string,
    SalespersonNo: string,
    SalesManagerDivisionNo: string,
    SalesManagerNo: string,
    SalesManagerName: string|null,
    SalesManagerEmailAddress: string|null,
}

export interface CustomerRecipient {
    Company: string,
    ARDivisionNo: string|null,
    CustomerNo: string|null,
    SalespersonDivisionNo: string,
    SalespersonNo: string
    SalesManagerName: string|null,
    SalesManagerEmailAddress: string|null,
}
export interface EmailRecipient {
    Name: string,
    EmailAddress: string,
}

export type RecipientType = 'email'|'rep'|'cust'|null;

export interface Recipient extends EmailRecipient, RepRecipient, CustomerRecipient {
    id: number,
    idReport: number,
    RecipientType: RecipientType,
    active: boolean,
    RecipientData: EmailRecipient,
    changed?: boolean,
}

export interface RecipientBody {
    id: number,
    idReport: number,
    RecipientType: RecipientType,
    Company: string,
    EmailAddress: string|null,
    ARDivisionNo: string|null,
    CustomerNo: string|null,
    SalespersonDivisionNo: string|null,
    SalespersonNo: string|null,
    active: boolean,
}

export interface LogRecord {
    id: number,
    idReport: number,
    execTime: string,
    execResult: {
        accepted: string[],
        rejected: string[],
        envelopeTime: number,
        messageTime: number,
        messageSize: number,
        response: string,
        envelope: {
            from: string,
            to: string[],
        },
        messageId: string,
    },
    content: string,
    timestamp: string,
}


export type WeekDay = '0' | '1' | '2' | '3' | '4' | '5' | '6';
export type DayNameList = {
    [key in WeekDay]: string;
};
export const days:WeekDay[] = ['0', '1', '2', '3', '4', '5', '6'];
export const dayNames:DayNameList = {
    '0': 'S',
    '1': 'M',
    '2': 'T',
    '3': 'W',
    '4': 'T',
    '5': 'F',
    '6': 'S'
};


export interface Address {
    name: string;
    address: string;
}

export interface DryRunResult {
    report: ReportRecord,
    content: string|object,
    recipients: (Address|string)[],
    cc?: (Address|string)[],
    replyTo: Address|string,
    title: string
}

export interface FailedSendResult extends Partial<ReportRecord> {
    status: string,
}

export type ProcessResult = SMTPTransport.SentMessageInfo|DryRunResult|FailedSendResult;

export interface RunResponse {
    today?: ProcessResult[],
    pending?: boolean,
    dryRun?:boolean,
    error?: string,
}


export interface LoadReportResponse {
    report: ReportRecord|null;
    recipients: Recipient[]
}
export interface SaveRecipientsResponse {
    recipients: Recipient[],
    recipient: Recipient|null
}

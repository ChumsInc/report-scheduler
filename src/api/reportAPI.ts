import {LoadReportResponse, Recipient, ReportRecord, RunResponse, SaveRecipientsResponse} from "@/app/types";
import {fetchJSON} from "@chumsinc/ui-utils";
import dayjs from "dayjs";

const debug = (...args: any[]): void => console.log('api:reportApi:', ...args);


export async function fetchReports(): Promise<ReportRecord[]> {
    try {
        const url = '/api/report-scheduler/reports.json';
        const res = await fetchJSON<{ reports: ReportRecord[] }>(url, {cache: 'no-cache'});
        return res?.reports ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchReports()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchReports()", err);
        return Promise.reject(new Error('Error in fetchReports()'));
    }
}

export async function fetchReport(id: number): Promise<LoadReportResponse | null> {
    try {
        const url = `/api/report-scheduler/reports/${encodeURIComponent(id)}.json`;
        const res = await fetchJSON<{ report: ReportRecord, recipients: Recipient[] }>(url);
        if (!res || !res.report) {
            return {report: null, recipients: []};
        }
        const {report, recipients = []} = res
        return {report, recipients};
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("fetchReport()", err.message);
            return Promise.reject(err);
        }
        debug("fetchReport()", err);
        return Promise.reject(new Error('Error in fetchReport()'));
    }
}

export async function postReport(arg: ReportRecord): Promise<LoadReportResponse | null> {
    try {
        const body = JSON.stringify(arg);
        const url = arg.id
            ? '/api/report-scheduler/reports/:id.json'
                .replace(':id', encodeURIComponent(arg.id))
            : '/api/report-scheduler/reports.json'
        ;
        const method = arg.id ? 'PUT' : 'POST';
        return await fetchJSON<{ report: ReportRecord, recipients: Recipient[] }>(url, {
            method,
            body
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postReport()", err.message);
            return Promise.reject(err);
        }
        debug("postReport()", err);
        return Promise.reject(new Error('Error in postReport()'));
    }
}

export type FetchRecipientProps = Pick<Recipient, 'id' | 'idReport'>;

export async function fetchRecipient(arg: FetchRecipientProps): Promise<Recipient | null> {
    try {
        const url = `/api/report-scheduler/reports/:idReport/recipients/:id.json`
            .replace(':idReport', encodeURIComponent(arg.idReport))
            .replace(':id', encodeURIComponent(arg.id));
        const method = 'GET';
        const res = await fetchJSON<{ recipient: Recipient | null }>(url, {method});
        return res?.recipient ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("fetchRecipient()", err.message);
            return Promise.reject(err);
        }
        debug("fetchRecipient()", err);
        return Promise.reject(new Error('Error in fetchRecipient()'));
    }
}


export async function postRecipient(arg: Recipient): Promise<SaveRecipientsResponse | null> {
    try {
        const body = JSON.stringify(arg);
        const url = arg.id
            ? '/api/report-scheduler/reports/:idReport/recipients/:id.json'
                .replace(':idReport', encodeURIComponent(arg.idReport))
                .replace(':id', encodeURIComponent(arg.id))
            : '/api/report-scheduler/reports/:idReport/recipients.json'
                .replace(':idReport', encodeURIComponent(arg.idReport))
        const method = !!arg.id ? 'PUT' : 'POST';
        const res = await fetchJSON<{
            recipients: Recipient[],
            recipient: Recipient | null
        }>(url, {method, body});
        return res ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postRecipient()", err.message);
            return Promise.reject(err);
        }
        debug("postRecipient()", err);
        return Promise.reject(new Error('Error in postRecipient()'));
    }
}

export async function deleteRecipient(arg: Recipient): Promise<Recipient[]> {
    try {
        const url = `/api/report-scheduler/reports/:idReport/recipients/:id.json`
            .replace(':idReport', encodeURIComponent(arg.idReport))
            .replace(':id', encodeURIComponent(arg.id));
        const method = 'DELETE';
        const res = await fetchJSON<{ recipients: Recipient[] }>(url, {method});
        return res?.recipients ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("deleteRecipient()", err.message);
            return Promise.reject(err);
        }
        debug("deleteRecipient()", err);
        return Promise.reject(new Error('Error in deleteRecipient()'));
    }
}

export interface ExecRunProps {
    idReport: number;
    dryRun?: boolean;
}

export async function execRun(arg: ExecRunProps): Promise<RunResponse | null> {
    try {
        let today = dayjs().format('YYYY-MM-DD');
        // explicitly require dryRun to be false in order to execute from the app.
        if (arg.dryRun === false) {
            today = 'today';
        }

        const url = '/api/report-scheduler/report/:idReport/exec/:today.json'
            .replace(':idReport', encodeURIComponent(arg.idReport))
            .replace(':today', encodeURIComponent(today));
        return await fetchJSON(url);
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("execRun()", err.message);
            return Promise.reject(err);
        }
        debug("execRun()", err);
        return Promise.reject(new Error('Error in execRun()'));
    }
}

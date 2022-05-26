import {Recipient, ReportRecord, RunResponse} from "../app/types";
import {fetchJSON} from "chums-ducks";

const debug = (...args:any[]):void => console.log('api:reportApi:', ...args);



export async function fetchReports():Promise<ReportRecord[]> {
    try {
        const url = '/api/report-scheduler/reports';
        const {reports} = await fetchJSON<{reports: ReportRecord[]}>(url, {cache: 'no-cache'});
        return reports;
    } catch(err:unknown) {
        if (err instanceof Error) {
            return Promise.reject(err);
        }
        return Promise.reject(new Error('Error in fetchReports()'));
    }
}

export async function fetchReport(id:number):Promise<{ report: ReportRecord, recipients: Recipient[]}> {
    try {
        const url = `/api/report-scheduler/reports/${encodeURIComponent(id)}`;
        const {report, recipients} = await fetchJSON<{report: ReportRecord, recipients: Recipient[]}>(url);
        return {report, recipients};
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("fetchReport()", err.message);
            return Promise.reject(err);
        }
        debug("fetchReport()", err);
        return Promise.reject(new Error('Error in fetchReport()'));
    }
}

export async function saveReport(_report:ReportRecord):Promise<{report:ReportRecord, recipients: Recipient[]}> {
    try {
        const body = JSON.stringify(_report);
        const url = `/api/report-scheduler/reports/${encodeURIComponent(_report.id || '')}`;
        const method = _report.id ? 'PUT' : 'POST';
        const {report, recipients} = await fetchJSON<{report: ReportRecord, recipients: Recipient[]}>(url, {method, body});
        return {report, recipients};
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("saveReport()", err.message);
            return Promise.reject(err);
        }
        debug("saveReport()", err);
        return Promise.reject(new Error('Error in saveReport()'));
    }
}


export async function getRecipient(_recipient:Recipient):Promise<{recipient: Recipient|null}> {
    try {
        const url = `/api/report-scheduler/recipient/${encodeURIComponent(_recipient.idReport)}/${encodeURIComponent(_recipient.id)}`;
        const method = 'GET';
        const {recipient} = await fetchJSON<{recipient: Recipient|null}>(url, {method});
        return {recipient};
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("saveRecipient()", err.message);
            return Promise.reject(err);
        }
        debug("saveRecipient()", err);
        return Promise.reject(new Error('Error in saveRecipient()'));
    }
}


export async function saveRecipient(_recipient:Recipient):Promise<{recipients: Recipient[], recipient: Recipient|null}> {
    try {
        const body = JSON.stringify(_recipient);
        const url = `/api/report-scheduler/recipient/${encodeURIComponent(_recipient.idReport)}/${encodeURIComponent(_recipient.id || '')}`;
        const method = !!_recipient.id ? 'PUT' : 'POST';
        const {recipients, recipient} = await fetchJSON<{recipients: Recipient[], recipient: Recipient|null}>(url, {method, body});
        return {recipients, recipient};
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("saveRecipient()", err.message);
            return Promise.reject(err);
        }
        debug("saveRecipient()", err);
        return Promise.reject(new Error('Error in saveRecipient()'));
    }
}

export async function deleteRecipient(_recipient:Recipient):Promise<{recipients: Recipient[]}> {
    try {
        const url = `/api/report-scheduler/recipient/${encodeURIComponent(_recipient.idReport)}/${encodeURIComponent(_recipient.id)}`;
        const method = 'DELETE';
        const {recipients} = await fetchJSON<{recipients: Recipient[]}>(url, {method});
        return {recipients};
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("saveRecipient()", err.message);
            return Promise.reject(err);
        }
        debug("saveRecipient()", err);
        return Promise.reject(new Error('Error in saveRecipient()'));
    }
}

export async function execRun(report:ReportRecord, dryRun:boolean = true):Promise<RunResponse> {
    try {
        let today = 'today';
        if (dryRun) {
            const d = new Date();
            today = [d.getFullYear().toString(), (d.getMonth() + 1).toString().padStart(2, '0'), d.getDate().toString().padStart(2, '0')].join('-');
        }

        const url = `/api/report-scheduler/report/exec/${encodeURIComponent(today)}/${report.id}`;
        return await fetchJSON(url);
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("testRun()", err.message);
            return Promise.reject(err);
        }
        debug("testRun()", err);
        return Promise.reject(new Error('Error in testRun()'));
    }
}

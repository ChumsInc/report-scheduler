import {Recipient, ReportRecord} from "../app/types";
import {fetchJSON} from "chums-ducks";

interface ReportResponse extends ReportRecord {
    recipients: Recipient[],
}

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

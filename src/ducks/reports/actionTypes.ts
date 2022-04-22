import {ActionInterface, ActionPayload} from "chums-ducks";
import {ReportRecord} from "../../app/types";
import {actionHelper} from "../utils";

export interface ReportsPayload extends ActionPayload {
    list?: ReportRecord[],
    report?: ReportRecord,

}

export interface ReportAction extends ActionInterface {
    payload?: ReportsPayload,
}

export const reportsFetchList = 'reports/fetchList';
export const reportsFetchListPending = actionHelper(reportsFetchList, 'pending');
export const reportsFetchListResolved = actionHelper(reportsFetchList, 'resolved');
export const reportsFetchListRejected = actionHelper(reportsFetchList, 'rejected');


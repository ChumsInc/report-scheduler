import {ActionInterface, ActionPayload} from "chums-ducks";
import {Recipient, ReportRecord} from "../../app/types";

export interface CurrentPayload extends ActionPayload {
    report?: ReportRecord,
    recipients?: Recipient[],
    id?: number,
    recipient?: Recipient,

}

export interface CurrentAction extends ActionInterface {
    payload?: CurrentPayload,
}



export const currentLoadRequested = 'current/loadRequested';
export const currentLoadSucceeded = 'current/loadSucceeded';
export const currentLoadFailed = 'current/loadFailed';

export const currentSaveRequested = 'current/saveRequested';
export const currentSaveSucceeded = 'current/saveSucceeded';
export const currentSaveFailed = 'current/saveFailed';

export const currentReportSelected = 'current/reportSelected';
export const currentReportChanged = 'current/reportChanged';

export const currentRecipientChanged = 'current/recipientChanged';
export const currentSaveRecipientRequested = 'current/saveRecipientRequested';
export const currentSaveRecipientSucceeded = 'current/saveRecipientSucceeded';
export const currentSaveRecipientFailed = 'current/saveRecipientFailed';

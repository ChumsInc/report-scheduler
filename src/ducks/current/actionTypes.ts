import {ActionInterface, ActionPayload} from "chums-ducks";
import {Recipient, ReportRecord} from "../../app/types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../../app/rootReducer";
import {actionHelper, apiActionHelper} from "../utils";

export interface CurrentPayload extends ActionPayload {
    report?: ReportRecord,
    recipients?: Recipient[],
    id?: number,
    recipient?: Recipient,

}

export interface CurrentAction extends ActionInterface {
    payload?: CurrentPayload,
}

export interface CurrentThunkAction extends ThunkAction<any, RootState, unknown, CurrentAction> {}


export const currentLoad = 'current/load';
export const [currentLoadPending, currentLoadResolved, currentLoadRejected] = apiActionHelper(currentLoad);

export const currentSave = 'current/save';
export const [currentSavePending, currentSaveResolved, currentSaveRejected] = apiActionHelper(currentSave);

export const currentReportSelected = 'current/selected';
export const currentReportChanged = 'current/changed';

export const currentRecipientSelected = 'current/recipientSelected';

export const currentSaveRecipient = 'current/saveRecipient';
export const [currentSaveRecipientPending, currentSaveRecipientResolved, currentSaveRecipientRejected] = apiActionHelper(currentSaveRecipient);

export const currentDeleteRecipient = 'current/deleteRecipient';
export const [currentDeleteRecipientPending, currentDeleteRecipientResolved, currentDeleteRecipientRejected] = apiActionHelper(currentDeleteRecipient);

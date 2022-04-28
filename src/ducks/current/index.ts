import {combineReducers} from "redux";
import {Recipient, ReportRecord} from "../../app/types";
import {
    CurrentAction,
    currentDeleteRecipientPending,
    currentDeleteRecipientRejected,
    currentDeleteRecipientResolved,
    currentLoadPending,
    currentLoadRejected,
    currentLoadResolved,
    currentReportSelected,
    currentSavePending,
    currentSaveRecipientPending,
    currentSaveRecipientRejected,
    currentSaveRecipientResolved,
    currentSaveRejected,
    currentSaveResolved
} from "./actionTypes";
import {recipientIDSorter, recipientSorter} from "./utils";
import {default as recipientsReducer} from './recipientsReducer'


const reportReducer = (state: ReportRecord | null = null, action: CurrentAction): ReportRecord | null => {
    const {type, payload} = action;
    switch (type) {
    case currentReportSelected:
    case currentLoadResolved:
    case currentSaveResolved:
        if (payload?.report) {
            return {
                ...payload.report,
                changed: false,
            };
        }
        return null;
    default:
        return state;
    }
}


const loadingReducer = (state: boolean = false, action: CurrentAction): boolean => {
    const {type} = action;
    switch (type) {
    case currentLoadPending:
    case currentSavePending:
    case currentSaveRecipientPending:
    case currentDeleteRecipientPending:
        return true;
    case currentLoadResolved:
    case currentLoadRejected:
    case currentSaveResolved:
    case currentSaveRejected:
    case currentSaveRecipientResolved:
    case currentSaveRecipientRejected:
    case currentDeleteRecipientResolved:
    case currentDeleteRecipientRejected:
        return false
    default:
        return state;
    }
}

export default combineReducers({
    report: reportReducer,
    loading: loadingReducer,
    recipients: recipientsReducer,
});

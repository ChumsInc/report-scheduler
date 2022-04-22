import {combineReducers} from "redux";
import {Recipient, ReportRecord} from "../../app/types";
import {
    CurrentAction,
    currentLoadSucceeded,
    currentRecipientChanged,
    currentReportSelected,
    currentSaveRecipientSucceeded
} from "./actionTypes";
import {recipientSorter} from "./utils";


const reportReducer = (state:ReportRecord|null = null, action:CurrentAction):ReportRecord|null => {
    const {type, payload} = action;
    switch (type) {
    case currentReportSelected:
    case currentLoadSucceeded:
    case currentSaveRecipientSucceeded:
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

const recipientsReducer = (state:Recipient[] = [], action:CurrentAction):Recipient[] => {
    const {type, payload} = action;
    switch (type) {
    case currentReportSelected:
    case currentLoadSucceeded:
        if (payload?.recipients) {
            return payload.recipients.sort(recipientSorter('id'));
        }
        return [];
    case currentRecipientChanged:
    case currentSaveRecipientSucceeded:
        if (payload?.id && payload?.recipient) {
            return [
                ...state.filter(rec => rec.id !== payload.id),
                {...payload.recipient, changed: true}
            ].sort(recipientSorter())
        }
        return state;
    default:
        return state;
    }
}

export default combineReducers({
    report: reportReducer,
    recipients: recipientsReducer,
});

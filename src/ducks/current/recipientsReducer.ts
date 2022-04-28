import {combineReducers} from "redux";
import {Recipient} from "../../app/types";
import {
    CurrentAction,
    currentDeleteRecipientPending,
    currentDeleteRecipientRejected,
    currentDeleteRecipientResolved,
    currentLoadPending,
    currentLoadRejected,
    currentLoadResolved,
    currentRecipientSelected,
    currentReportSelected,
    currentSavePending,
    currentSaveRecipientPending,
    currentSaveRecipientRejected,
    currentSaveRecipientResolved,
    currentSaveRejected,
    currentSaveResolved
} from "./actionTypes";
import {recipientIDSorter} from "./utils";

const listReducer = (state: Recipient[] = [], action: CurrentAction): Recipient[] => {
    const {type, payload} = action;
    switch (type) {
    case currentReportSelected:
    case currentSaveRecipientResolved:
    case currentDeleteRecipientResolved:
    case currentLoadResolved:
    case currentSaveResolved:
        if (payload?.recipients) {
            return [...payload.recipients].sort(recipientIDSorter);
        }
        return [];
    default:
        return state;
    }
}

const selectedReducer = (state:Recipient|null = null, action:CurrentAction):Recipient|null => {
    const {type, payload} = action;
    switch (type) {
    case currentRecipientSelected:
        if (payload?.recipient) {
            return {...payload.recipient};
        }
        return null;
    case currentReportSelected:
        return null;
    default:
        return state;
    }
}

export default combineReducers({
    list: listReducer,
    selected: selectedReducer,
})

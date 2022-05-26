import {combineReducers} from "redux";
import {Recipient} from "../../app/types";
import {
    CurrentAction, currentDeleteRecipientPending, currentDeleteRecipientRejected,
    currentDeleteRecipientResolved,
    currentLoadPending, currentLoadRecipientPending, currentLoadRecipientRejected, currentLoadRecipientResolved,
    currentLoadRejected,
    currentLoadResolved,
    currentRecipientSelected,
    currentReportSelected, currentSaveRecipientPending, currentSaveRecipientRejected,
    currentSaveRecipientResolved,
    currentSaveResolved
} from "./actionTypes";
import {recipientIDSorter} from "./utils";
import {defaultRecipient} from "./selectors";

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

const selectedReducer = (state: Recipient = defaultRecipient(), action: CurrentAction): Recipient => {
    const {type, payload} = action;
    switch (type) {
    case currentRecipientSelected:
    case currentSaveRecipientResolved:
    case currentLoadRecipientResolved:
        if (payload?.recipient) {
            return {...payload.recipient};
        }
        return defaultRecipient(state.idReport);
    case currentDeleteRecipientResolved:
        return defaultRecipient(state.idReport);
    case currentReportSelected:
        return defaultRecipient(payload?.report?.id);
    default:
        return state;
    }
}

const listLoadingReducer = (state: boolean = false, action: CurrentAction): boolean => {
    const {type} = action;
    switch (type) {
    case currentLoadPending:
        return true;
    case currentLoadResolved:
    case currentLoadRejected:
        return false;
    default: return state;
    }
}

const selectedLoadingReducer = (state: boolean = false, action: CurrentAction): boolean => {
    const {type} = action;
    switch (type) {
    case currentLoadRecipientPending:
        return true;
    case currentLoadRecipientResolved:
    case currentLoadRecipientRejected:
        return false;
    default: return state;
    }
}

const selectedSavingReducer = (state: boolean = false, action: CurrentAction): boolean => {
    const {type} = action;
    switch (type) {
    case currentSaveRecipientPending:
    case currentDeleteRecipientPending:
        return true;
    case currentSaveRecipientResolved:
    case currentSaveRecipientRejected:
    case currentDeleteRecipientResolved:
    case currentDeleteRecipientRejected:
        return false;
    default: return state;
    }
}

export default combineReducers({
    list: listReducer,
    listLoading: listLoadingReducer,
    selected: combineReducers({
        recipient: selectedReducer,
        loading: selectedLoadingReducer,
        saving: selectedSavingReducer,
    }),
})

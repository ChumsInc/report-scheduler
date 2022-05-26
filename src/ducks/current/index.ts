import {combineReducers} from "redux";
import {ReportRecord, RunResponse} from "../../app/types";
import {
    CurrentAction,
    currentExecPending,
    currentExecRejected,
    currentExecResolved,
    currentLoadPending,
    currentLoadRejected,
    currentLoadResolved,
    currentReportSelected,
    currentSavePending,
    currentSaveRejected,
    currentSaveResolved
} from "./actionTypes";
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
        return true;
    case currentLoadResolved:
    case currentLoadRejected:
        return false
    default:
        return state;
    }
}

const savingReducer = (state: boolean = false, action: CurrentAction): boolean => {
    const {type} = action;
    switch (type) {
    case currentSavePending:
        return true;
    case currentSaveResolved:
    case currentSaveRejected:
        return false
    default:
        return state;
    }
}

const execRunReducer = (state: RunResponse = {}, action: CurrentAction): RunResponse => {
    const {type, payload} = action;
    switch (type) {
    case currentReportSelected:
        return {};
    case currentExecPending:
        return {pending: true};
    case currentExecResolved:
        return payload?.result || {};
    case currentExecRejected:
        return {error: payload?.error?.message};
    default:
        return state;
    }
}

const isExecutingReducer = (state: boolean = false, action: CurrentAction): boolean => {
    const {type} = action;
    switch (type) {
    case currentExecPending:
        return true;
    case currentExecResolved:
    case currentExecRejected:
        return false
    default:
        return state;
    }
}
export default combineReducers({
    report: reportReducer,
    loading: loadingReducer,
    saving: savingReducer,
    recipients: recipientsReducer,
    execRun: execRunReducer,
    isExecuting: isExecutingReducer,
});

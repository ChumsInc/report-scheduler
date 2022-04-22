import {combineReducers} from "redux";
import {LogRecord} from "../../app/types";
import {ActionInterface, ActionPayload} from "chums-ducks";
import {currentReportSelected} from "../current/actionTypes";

export interface LogPayload extends ActionPayload {
    list?: LogRecord[],
    limit?: number,
}
export interface LogAction extends ActionInterface {
    payload?: LogPayload,
}

export const logLoadRequested = 'log/loadRequested';
export const logLoadSucceeded = 'log/loadSucceeded';
export const logLoadFailed = 'log/loadFailed';
export const logLimitSet = 'log/limitSet';

const listReducer = (state:LogRecord[] = [], action:LogAction):LogRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case logLoadSucceeded:
        if (payload?.list) {
            return payload.list.sort((a, b) => a.id - b.id);
        }
        return [];
    case currentReportSelected:
        return [];
    default:
        return state;
    }
}

const loadingReducer = (state:boolean = false, action:LogAction):boolean => {
    switch (action.type) {
    case logLoadRequested:
        return true;
    case logLoadSucceeded:
    case logLoadFailed:
        return false;
    default: return state;
    }
}

const limitReducer = (state:number = 25, action:LogAction):number => {
    switch (action.type) {
    case logLimitSet:
        return action.payload?.limit || 25;
    default: return state;
    }
}

export default combineReducers({
    list:listReducer,
    loading: loadingReducer,
    limit: limitReducer,
})

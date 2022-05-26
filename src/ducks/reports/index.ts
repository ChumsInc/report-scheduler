import {ReportRecord} from "../../app/types";
import {ReportAction, reportsFetchListPending, reportsFetchListRejected, reportsFetchListResolved} from "./actionTypes";
import {reportSorter} from "./utils";
import {combineReducers} from "redux";
import {currentSaveResolved} from "../current/actionTypes";

const listReducer = (state: ReportRecord[] = [], action: ReportAction): ReportRecord[] => {
    const {type, payload} = action;
    switch (type) {
    case reportsFetchListResolved:
        if (payload?.list) {
            return payload.list.sort(reportSorter('id'))
        }
        return state;
    case currentSaveResolved:
        if (payload?.report) {
            return [
                ...state.filter(r => r.id !== payload.report?.id),
                payload.report,
            ].sort(reportSorter('id'))
        }
        return state;
    default:
        return state;
    }
}

const loadingReducer = (state: boolean = false, action: ReportAction): boolean => {
    switch (action.type) {
    case reportsFetchListPending:
        return true;
    case reportsFetchListResolved:
    case reportsFetchListRejected:
        return false;
    default:
        return state;
    }
}

export default combineReducers({
    list: listReducer,
    loading: loadingReducer,
});

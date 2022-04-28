import {
    currentLoad, currentLoadPending,
    currentLoadRejected,
    currentLoadResolved,
    currentReportSelected, currentSave, currentSavePending, currentSaveRejected, currentSaveResolved,
    CurrentThunkAction
} from "./actionTypes";
import {Recipient, ReportRecord} from "../../app/types";
import {selectReportsLoading} from "../reports/selectors";
import {selectCurrentLoading, selectSelectedRecipient} from "./selectors";
import {fetchReport, saveReport} from "../../api/reportAPI";

export const selectReportAction = (report: ReportRecord): CurrentThunkAction =>
    (dispatch) => {
        dispatch({type: currentReportSelected, payload: {report}});
        if (report.id) {
            dispatch(fetchReportAction(report.id))
        }
    }

export const fetchReportAction = (id: number): CurrentThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectReportsLoading(state) || selectCurrentLoading(state)) {
                return;
            }
            dispatch({type: currentLoadPending});
            const {report, recipients} = await fetchReport(id);
            dispatch({type: currentLoadResolved, payload: {report, recipients}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchReportAction()", error.message);
                return dispatch({type: currentLoadRejected, payload: {error, context: currentLoad}})
            }
            console.error("fetchReportAction()", error);
        }
    }

export const saveReportAction = (_report:ReportRecord):CurrentThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectReportsLoading(state) || selectCurrentLoading(state)) {
                return;
            }
            dispatch({type: currentSavePending});
            const {report, recipients} = await saveReport(_report);
            dispatch({type: currentSaveResolved, payload: {report, recipients}});

        } catch(error:unknown) {
            if (error instanceof Error) {
                console.log("saveReportAction()", error.message);
                return dispatch({type:currentSaveRejected, payload: {error, context: currentSave}})
            }
            console.error("saveReportAction()", error);
        }
    }


export const selectRecipientAction = (recipient:Recipient) => ({type: selectSelectedRecipient, payload: {recipient}})

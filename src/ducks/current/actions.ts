import {
    currentDeleteRecipient,
    currentDeleteRecipientPending,
    currentDeleteRecipientRejected,
    currentDeleteRecipientResolved, currentExecPending, currentExecRejected, currentExecResolved,
    currentLoad,
    currentLoadPending,
    currentLoadRecipient,
    currentLoadRecipientPending,
    currentLoadRecipientRejected,
    currentLoadRecipientResolved,
    currentLoadRejected,
    currentLoadResolved,
    currentRecipientSelected,
    currentReportSelected,
    currentSave,
    currentSavePending,
    currentSaveRecipient,
    currentSaveRecipientPending,
    currentSaveRecipientRejected,
    currentSaveRecipientResolved,
    currentSaveRejected,
    currentSaveResolved,
    CurrentThunkAction
} from "./actionTypes";
import {Recipient, ReportRecord} from "../../app/types";
import {selectReportsLoading} from "../reports/selectors";
import {defaultRecipient, selectCurrentLoading, selectIsExecuting} from "./selectors";
import {deleteRecipient, execRun, fetchReport, getRecipient, saveRecipient, saveReport} from "../../api/reportAPI";

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

export const saveReportAction = (_report: ReportRecord): CurrentThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectReportsLoading(state) || selectCurrentLoading(state)) {
                return;
            }
            dispatch({type: currentSavePending});
            const {report, recipients} = await saveReport(_report);
            dispatch({type: currentSaveResolved, payload: {report, recipients}});

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("saveReportAction()", error.message);
                return dispatch({type: currentSaveRejected, payload: {error, context: currentSave}})
            }
            console.error("saveReportAction()", error);
        }
    }


export const selectRecipientAction = (recipient: Recipient): CurrentThunkAction =>
    async (dispatch, getState) => {
        try {
            dispatch({type: currentRecipientSelected, payload: {recipient}});
            if (recipient.id) {
                dispatch({type: currentLoadRecipientPending});
                const {recipient: r} = await getRecipient(recipient);
                dispatch({
                    type: currentLoadRecipientResolved,
                    payload: {recipient: r || defaultRecipient(recipient.idReport)}
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.debug("selectRecipientAction()", error.message);
                return dispatch({type: currentLoadRecipientRejected, payload: {error, context: currentLoadRecipient}})
            }
            console.debug("selectRecipientAction()", error);
        }
    }

export const saveRecipientAction = (recipient: Recipient): CurrentThunkAction =>
    async (dispatch, getState) => {
        try {
            dispatch({type: currentSaveRecipientPending});
            const {recipients, recipient: r} = await saveRecipient(recipient);
            dispatch({
                type: currentSaveRecipientResolved,
                payload: {recipients, recipient: r || defaultRecipient(recipient.idReport)}
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.debug("selectRecipientAction()", error.message);
                return dispatch({type: currentSaveRecipientRejected, payload: {error, context: currentSaveRecipient}})
            }
            console.debug("selectRecipientAction()", error);
        }
    }

export const deleteRecipientAction = (recipient: Recipient): CurrentThunkAction =>
    async (dispatch, getState) => {
        try {
            dispatch({type: currentDeleteRecipientPending});
            const {recipients} = await deleteRecipient(recipient);
            dispatch({type: currentDeleteRecipientResolved, payload: {recipients}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.debug("selectRecipientAction()", error.message);
                return dispatch({
                    type: currentDeleteRecipientRejected,
                    payload: {error, context: currentDeleteRecipient}
                })
            }
            console.debug("selectRecipientAction()", error);
        }
    }

export const execRunAction = (report: ReportRecord, dryRun: boolean = true): CurrentThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectIsExecuting(state)) {
                return;
            }
            dispatch({type: currentExecPending});
            const result = await execRun(report);
            dispatch({type: currentExecResolved, payload: {result}});

        } catch(err:unknown) {
            if (err instanceof Error) {
                console.debug("dryRunAction()", err.message);
                dispatch({type: currentExecRejected, payload: {error: err}});
            }
        }
    }

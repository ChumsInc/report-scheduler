import {LoadReportResponse, Recipient, ReportRecord, RunResponse, SaveRecipientsResponse} from "@/app/types";
import {
    deleteRecipient,
    execRun,
    ExecRunProps,
    fetchRecipient,
    FetchRecipientProps,
    fetchReport,
    postRecipient,
    postReport
} from "@/api/reportAPI";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "@/app/configureStore";
import {selectCurrentReportStatus} from "@/ducks/current/index";


export const loadReport = createAsyncThunk<LoadReportResponse | null, number, { state: RootState }>(
    'current/load',
    async (arg) => {
        return await fetchReport(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCurrentReportStatus(state) === 'idle'
        }
    }
)

export const saveReport = createAsyncThunk<LoadReportResponse | null, ReportRecord, { state: RootState }>(
    'current/save',
    async (arg) => {
        return await postReport(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCurrentReportStatus(state) === 'idle'
        }
    }
)

export const loadRecipient = createAsyncThunk<Recipient | null, FetchRecipientProps, { state: RootState }>(
    'current/loadRecipient',
    async (arg) => {
        return await fetchRecipient(arg)
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCurrentReportStatus(state) === 'idle'
        }
    }
)

export const saveRecipient = createAsyncThunk<SaveRecipientsResponse | null, Recipient, { state: RootState }>(
    'current/saveRecipient',
    async (arg) => {
        return await postRecipient(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCurrentReportStatus(state) === 'idle'
        }
    }
)

export const removeRecipient = createAsyncThunk<Recipient[], Recipient, { state: RootState }>(
    'current/removeRecipient',
    async (arg) => {
        return await deleteRecipient(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCurrentReportStatus(state) === 'idle'
        }
    }
)

export const runReport = createAsyncThunk<RunResponse | null, ExecRunProps, { state: RootState }>(
    'current/runReport',
    async (arg) => {
        return await execRun(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCurrentReportStatus(state) === 'idle'
        }
    }
)

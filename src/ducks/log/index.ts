import {LogRecord} from "@/app/types";
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";


const logAdapter = createEntityAdapter<LogRecord, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a: LogRecord, b: LogRecord) => a.id - b.id,
})

const selectors = logAdapter.getSelectors();

export interface ExtraLogsState {
    status: 'idle' | 'loading';
    reportId: number;
}

const extraState: ExtraLogsState = {
    status: 'idle',
    reportId: 0,
}

const logsSlice = createSlice({
    name: 'logs',
    initialState: logAdapter.getInitialState(extraState),
    reducers: {},
    extraReducers: builder => {

    },
    selectors: {
        selectAllLogs: (state) => selectors.selectAll(state),
        selectLogsStatus: (state) => state.status,
    }
})

export default logsSlice;

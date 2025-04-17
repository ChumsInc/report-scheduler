import {Recipient, ReportRecord, RunResponse} from "../../app/types";
import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {newReport, recipientSorter} from "@/ducks/current/utils";
import {
    loadRecipient,
    loadReport,
    removeRecipient,
    runReport,
    saveRecipient,
    saveReport
} from "@/ducks/current/actions";
import {loadReports} from "@/ducks/reports/actions";
import {dismissAlert} from "@chumsinc/alert-list";
import {SortProps} from "@chumsinc/sortable-tables";


const recipientsAdapter = createEntityAdapter<Recipient, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
})

const selectors = recipientsAdapter.getSelectors();

export interface CurrentExtraState {
    id: number;
    status: 'idle' | 'loading' | 'saving' | 'deleting' | 'running' | 'rejected';
    current: ReportRecord;
    currentRecipient: Recipient | null
    runResponse: RunResponse | null;
    sort: SortProps<Recipient>;
    showInactive: boolean;
}

const initialState: CurrentExtraState = {
    id: 0,
    status: 'idle',
    current: {...newReport},
    currentRecipient: null,
    runResponse: null,
    sort: {field: 'Name', ascending: true},
    showInactive: false,
}

const currentReportSlice = createSlice({
    name: 'current',
    initialState: recipientsAdapter.getInitialState(initialState),
    reducers: {
        setNewReport: (state, action) => {
            state.current = {...newReport};
            recipientsAdapter.removeAll(state);
        },
        setNewRecipient: (state, action: PayloadAction<Recipient>) => {
            state.currentRecipient = action.payload;
        },
        setRecipientsSort: (state, action:PayloadAction<SortProps<Recipient>>) => {
            state.sort = action.payload;
        },
        setShowInactiveRecipients: (state, action:PayloadAction<boolean>) => {
            state.showInactive = action.payload
        },
        updateReport: (state, action: PayloadAction<Partial<ReportRecord>>) => {
            if (!state.current) {
                return
            }
            state.current = {...state.current, ...action.payload};
        },
        updateRecipient: (state, action: PayloadAction<Partial<Recipient>>) => {
            if (!state.currentRecipient) {
                return;
            }
            state.currentRecipient = {...state.currentRecipient, ...action.payload};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadReports.fulfilled, (state, action) => {
                if (state.current) {
                    const [current] = action.payload.filter(r => r.id === state.current.id);
                    state.current = current ?? newReport;
                    if (!current) {
                        recipientsAdapter.removeAll(state);
                        state.currentRecipient = null;
                    }
                }
            })
            .addCase(loadReport.pending, (state, action) => {
                state.status = 'loading'
                if (state.current && state.current.id !== action.meta.arg) {
                    recipientsAdapter.removeAll(state);
                    state.currentRecipient = null;
                }
            })
            .addCase(loadReport.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload?.report) {
                    state.current = action.payload?.report;
                    recipientsAdapter.setAll(state, action.payload.recipients);
                    if (state.currentRecipient) {
                        state.currentRecipient = selectors.selectById(state, state.currentRecipient.id);
                    }
                } else {
                    state.current = newReport;
                    recipientsAdapter.removeAll(state);
                }
            })
            .addCase(loadReport.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(saveReport.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(saveReport.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload?.report) {
                    state.current = action.payload?.report;
                    recipientsAdapter.setAll(state, action.payload.recipients);
                    if (state.currentRecipient) {
                        state.currentRecipient = selectors.selectById(state, state.currentRecipient.id);
                    }
                }
            })
            .addCase(saveReport.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(loadRecipient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadRecipient.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload) {
                    recipientsAdapter.setOne(state, action.payload);
                    state.currentRecipient = action.payload
                }
            })
            .addCase(loadRecipient.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(saveRecipient.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(saveRecipient.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    recipientsAdapter.setAll(state, action.payload.recipients);
                    state.currentRecipient = action.payload.recipient;
                }
            })
            .addCase(saveRecipient.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(removeRecipient.pending, (state) => {
                state.status = 'deleting';
            })
            .addCase(removeRecipient.fulfilled, (state, action) => {
                state.status = 'idle';
                recipientsAdapter.setAll(state, action.payload);
                state.currentRecipient = null;
            })
            .addCase(removeRecipient.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(runReport.pending, (state) => {
                state.status = 'running';
            })
            .addCase(runReport.fulfilled, (state, action) => {
                state.status = 'idle';
                state.runResponse = action.payload;
            })
            .addCase(runReport.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(dismissAlert, (state, action) => {
                if (state.status === 'rejected' && action.payload.context?.startsWith('current/')) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectCurrentReport: (state) => state.current,
        selectCurrentRecipient: (state) => state.currentRecipient,
        selectCurrentRecipients: (state) => selectors.selectAll(state),
        selectCurrentReportStatus: (state) => state.status,
        selectCurrentReportRunResponse: (state) => state.runResponse,
        selectRecipientsSort: (state) => state.sort,
    }
})

export const {setNewReport, updateReport, setRecipientsSort, setNewRecipient} = currentReportSlice.actions;
export const {
    selectCurrentReport,
    selectCurrentRecipient,
    selectCurrentReportStatus,
    selectCurrentRecipients,
    selectCurrentReportRunResponse,
    selectRecipientsSort,
} = currentReportSlice.selectors;

export const selectSortedRecipients = createSelector(
    [selectCurrentRecipients, selectRecipientsSort],
    (list, sort) => {
        return [...list]
            .sort(recipientSorter(sort))
    }
)

export default currentReportSlice;

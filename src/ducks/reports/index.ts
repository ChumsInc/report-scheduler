import {ReportRecord} from "@/app/types";
import {reportSorter} from "./utils";
import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortProps} from "@chumsinc/sortable-tables";
import {loadReports} from "@/ducks/reports/actions";

const reportsAdapter = createEntityAdapter<ReportRecord, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
})

const selectors = reportsAdapter.getSelectors();

export interface ReportsExtraState {
    status: 'idle' | 'loading' | 'saving' | 'rejected';
    showInactive: boolean;
    sort: SortProps<ReportRecord>,
}

const initialState: ReportsExtraState = {
    status: 'idle',
    showInactive: false,
    sort: {field: 'title', ascending: true}
}

const reportsSlice = createSlice({
    name: 'reports',
    initialState: reportsAdapter.getInitialState(initialState),
    reducers: {
        setShowInactive: (state, action: PayloadAction<boolean>) => {
            state.showInactive = action.payload;
        },
        setSort: (state, action: PayloadAction<SortProps<ReportRecord>>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadReports.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadReports.fulfilled, (state, action) => {
                state.status = 'idle';
                reportsAdapter.setAll(state, action.payload);
            })
            .addCase(loadReports.rejected, (state) => {
                state.status = 'rejected';
            })
    },
    selectors: {
        selectList: (state) => selectors.selectAll(state),
        selectShowInactive: (state) => state.showInactive,
        selectStatus: (state) => state.status,
        selectById: (state, id: number) => selectors.selectById(state, id),
        selectSort: (state) => state.sort,
    }
})

export const {setShowInactive, setSort} = reportsSlice.actions;
export const {selectList, selectById, selectSort, selectStatus, selectShowInactive} = reportsSlice.selectors;

export const selectSortedList = createSelector(
    [selectList, selectShowInactive, selectSort],
    (list, showInactive, sort) => {
        return list
            .filter(row => showInactive || row.enabled)
            .sort(reportSorter(sort));
    }
)

export default reportsSlice;

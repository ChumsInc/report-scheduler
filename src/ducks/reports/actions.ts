import {createAsyncThunk} from "@reduxjs/toolkit";
import {ReportRecord} from "@/app/types";
import {RootState} from "@/app/configureStore";
import {selectStatus} from "@/ducks/reports/index";
import {fetchReports} from "@/api/reportAPI";


export const loadReports = createAsyncThunk<ReportRecord[], void, { state: RootState }>(
    'reports/load',
    async () => {
        return await fetchReports();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectStatus(state) === 'idle';
        }
    }
)

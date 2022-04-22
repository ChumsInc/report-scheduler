import {
    ReportAction,
    reportsFetchList,
    reportsFetchListPending,
    reportsFetchListRejected,
    reportsFetchListResolved
} from "./actionTypes";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../../app/rootReducer";
import {selectLoading} from "./selectors";
import {fetchReports} from "../../api/reportAPI";

interface ReportThunkAction extends ThunkAction<any, RootState, unknown, ReportAction> {
}


export const fetchReportsAction = (): ReportThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectLoading(state)) {
                return;
            }
            dispatch({type: reportsFetchListPending})
            const list = await fetchReports();
            dispatch({type: reportsFetchListResolved, payload: {list}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchReportsAction()", error.message);
                return dispatch({type: reportsFetchListRejected, payload: {error, context: reportsFetchList}});
            }
            dispatch({type: `${reportsFetchList}/failed`});
        }
    }


// export const fetchReportsAction = createAsyncThunk(
//     'reports/fetchList',
//     async (args, thunkAPI) => {
//         try {
//             const state = thunkAPI.getState() as RootState;
//             if (selectLoading(state)) {
//                 thunkAPI.rejectWithValue({error: new Error('fetchReportsAction(): busy')});
//             }
//             const url = '/api/report-scheduler/reports';
//             const {result} = await fetchJSON<{result: ReportRecord[]}>(url, {cache: 'no-cache'});
//             return {list: result};
//         } catch(err:unknown) {
//             if (err instanceof Error) {
//                 console.log("fetchReportsAction()", err.message);
//                 return thunkAPI.rejectWithValue({error: error});
//             }
//         }
//     }
// );

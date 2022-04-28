import {RootState} from "../../app/rootReducer";


export const selectList = (state:RootState) => state.reports.list;
export const selectReportsLoading = (state:RootState) => state.reports.loading;

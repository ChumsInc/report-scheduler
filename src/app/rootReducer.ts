import {combineReducers} from "redux";
import {alertsReducer, pagesReducer, sortableTablesReducer, tabsReducer} from 'chums-ducks';
import {default as reportsReducer} from '../ducks/reports';
import {default as currentReducer} from '../ducks/current';
import {default as logReducer} from '../ducks/log';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    current: currentReducer,
    log: logReducer,
    pages: pagesReducer,
    reports: reportsReducer,
    sortableTables: sortableTablesReducer,
    tabs: tabsReducer,
});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

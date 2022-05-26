import React from 'react';
import ReportList from "../ducks/reports/ReportList";
import ReportEditor from "../ducks/current/ReportEditor";
import Recipients from "../ducks/current/Recipients";

const App: React.FC = () => {

    return (
        <div className="row g-3">
            <div className="col-4">
                <ReportList/>
            </div>
            <div className="col-4">
                <ReportEditor/>
            </div>
            <div className="col-4">
                <Recipients/>
            </div>
        </div>
    )
}

export default App;

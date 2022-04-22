import React from 'react';
import ReportList from "../ducks/reports/ReportList";

const App:React.FC = () => {
    return (
        <div className="row g-3">
            <div className="col-6">
                <ReportList />
            </div>
            <div className="col-6">
                <h3>Report Editor</h3>
                <div>Report Editor goes here</div>
            </div>
        </div>
    )
}

export default App;

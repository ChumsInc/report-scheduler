import React, {useState} from 'react';
import ReportEditor from "@/components/reports/ReportEditor";
import RecipientsContainer from "@/components/recipients/RecipientsContainer";
import ReportNotes from "@/components/reports/ReportNotes";
import {HashRouter, Route, Routes} from 'react-router'
import Main from "@/app/Main";

const App = () => {

    const [tab, setTab] = useState("editor");
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route index element={<ReportEditor/>}/>
                    <Route path="editor" element={<ReportEditor/>}/>
                    <Route path="recipients" element={<RecipientsContainer/>}/>
                    <Route path="notes" element={<ReportNotes/>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App;

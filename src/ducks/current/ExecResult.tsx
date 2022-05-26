import React, {useState} from 'react';
import {FormCheck} from "chums-ducks";
import {useSelector} from "react-redux";
import {selectExecRun} from "./selectors";

type ViewMethod = 'json'|'content';

const ExecResult:React.FC = () => {
    const execResult = useSelector(selectExecRun);
    const [method, setMethod] = useState<ViewMethod>('json');

    return (
        <div>
            <div className="row g-3">
                <div className="col-auto">View</div>
                <div className="col-auto">
                    <FormCheck label="JSON" checked={method === 'json'} onClick={() => setMethod('json')} type={"radio"} />
                    <FormCheck label="Content" checked={method === 'content'} onClick={() => setMethod('content')} type={"radio"} />
                </div>
                {method === 'json' && (
                    <pre>
                        <code>
                            {JSON.stringify(execResult, undefined, 2)}
                        </code>
                    </pre>
                )}
                {method === 'content' && !execResult.today && (
                    <div>No Content</div>
                )}
                {method === 'content' && execResult.today && execResult.today.map((result, index) => <div key={index} dangerouslySetInnerHTML={{__html: "content" in result && result.content as string || 'N/A'}} />)}
                {method === 'content' && execResult.today && execResult.today.map((result, index) => (
                    <div key={index}>{"recipients" in result && JSON.stringify(result.recipients)}</div>
                ))}
            </div>
        </div>
    )
}

export default ExecResult;

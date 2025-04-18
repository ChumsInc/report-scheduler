import React, {useId, useState} from 'react';
import {useAppSelector} from "@/app/configureStore";
import {selectCurrentReportRunResponse} from "@/ducks/current";
import {FormCheck, Modal, ModalProps} from "react-bootstrap";

type ViewMethod = 'json' | 'content';

const ExecResult = (props: ModalProps) => {
    const execResult = useAppSelector(selectCurrentReportRunResponse);
    const [method, setMethod] = useState<ViewMethod>('json');
    const id_json = useId();
    const id_content = useId();

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Exec Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-3">
                    <div className="col-auto">View</div>
                    <div className="col-auto">
                        <FormCheck label="JSON" id={id_json} inline
                                   checked={method === 'json'} onClick={() => setMethod('json')}
                                   type={"radio"}/>
                        <FormCheck label="Content" id={id_content} inline
                                   checked={method === 'content'} onClick={() => setMethod('content')}
                                   type={"radio"}/>
                    </div>
                    {method === 'json' && (
                        <pre>
                        <code>
                            {JSON.stringify(execResult, undefined, 2)}
                        </code>
                    </pre>
                    )}
                    {method === 'content' && !execResult?.today && (
                        <div>No Content</div>
                    )}
                    {method === 'content'
                        && execResult?.today
                        && execResult.today.map((result, index) => (
                            <div key={index}
                                 dangerouslySetInnerHTML={{__html: "content" in result && result.content as string || 'N/A'}}/>
                        ))}
                    {method === 'content'
                        && execResult?.today
                        && execResult.today.map((result, index) => (
                            <div key={index}>
                                {"recipients" in result && JSON.stringify(result.recipients)}
                            </div>
                        ))}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ExecResult;

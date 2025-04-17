import React from 'react';
import {useAppSelector} from "@/app/configureStore";
import {selectCurrentReportStatus} from "@/ducks/current";
import {ProgressBar} from "react-bootstrap";

export default function RecipientsProgress() {
    const status = useAppSelector(selectCurrentReportStatus);

    return (
        <>
            {status !== 'idle' && <ProgressBar striped animated now={100} />}
        </>

    )
}

import React, {ReactNode} from 'react';
import styled from '@emotion/styled'
import {Col, Row} from "react-bootstrap";

const SectionContainer = styled.div`
    margin-bottom: 1rem !important;
    border-bottom: 1px solid var(--bs-border-radius);
`
export default function ReportNotes() {
    return (
        <div>
            <SectionContainer>
                <h2>Report Settings</h2>
                <ul>
                    <NotesDefinition subject="Report Title">
                        Subject of the sent email
                    </NotesDefinition>
                    <NotesDefinition subject="Reply To">
                        The email address sent as the "Reply To" email address in the sent email.
                    </NotesDefinition>
                    <NotesDefinition subject="Week Days">
                        Toggle the days for the scheduled email to be sent.
                    </NotesDefinition>
                    <NotesDefinition subject="Month Days">
                        Enter the days of the month for the report to be sent
                    </NotesDefinition>
                    <NotesDefinition subject="Schedule">
                        <div>The report scheduler is run through the crontab tool on the intranet server.</div>
                        <div>Currently it is set to run at 10:30pm</div>
                        <code className="mt-1">
                            <pre style={{whiteSpace: 'pre-wrap'}}>
                                {`# report scheduler for all reports.\n\n`}
                                {'30 22 * * *   steve timeout 6h curl -s -S -K /etc/chums/curl-creds https://intranet.chums.com/api/report-scheduler/reports/exec/today.json >> /var/log/chums/report-scheduler.log'}
                            </pre>
                        </code>
                    </NotesDefinition>
                    <NotesDefinition subject="Report URL">
                        The URL (or URL template) that is requested for the mailer content generation. <em className="text-warning-emphasis">Use a local API endpoint only, do not use full URLs</em>.
                    </NotesDefinition>
                    <NotesDefinition subject="URL Generator">
                        <div>(optional) A javascript snippet used to generate the URL based on the template. This snippet receives two parameters</div>
                        <ul>
                            <li><strong className="me-3">url_path:string</strong> The above report url</li>
                            <li><strong className="me-3">params:Recipient</strong> As shown on the recipients editor "URL Params" value</li>
                        </ul>

                    </NotesDefinition>
                </ul>
                <h2>Recipients</h2>
                <ul>
                    <NotesDefinition subject="Type">
                        <div>The recipient type</div>
                        <ul>
                            <li><strong>Rep</strong> - A Salesperson as defined in Sage. The email address is loaded from A/R Salesperson Maintenance. Note: The Sales Manager will get a CC of this email.</li>
                            <li><strong>Customer</strong> - A Customer as defined in Sage. The email address is loaded from A/R Customer Maintenance Maintenance. Currently there is not a provision for CC to the salesperson.</li>
                            <li><strong>Employee</strong> - Enter a name/email address for an employee. This email address is validated via the intranet User Admin (employees only). Emails will not be generated for inactive users.</li>
                        </ul>
                    </NotesDefinition>
                </ul>
            </SectionContainer>
        </div>
    )
}

interface NotesDefintionProps {
    subject: string|ReactNode;
    children?: ReactNode
}
function NotesDefinition({subject, children}:NotesDefintionProps) {
    return (
        <li>
            <Row>
                <Col xs={2}>
                    <strong>{subject}</strong></Col>
                <Col xs={10} className="text-secondary">{children}</Col>
            </Row>
        </li>
    )
}

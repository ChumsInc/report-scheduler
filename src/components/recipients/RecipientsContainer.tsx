import React from 'react';
import RecipientsList from "@/components/recipients/RecipientsList";
import RecipientEditor from "@/components/recipients/RecipientEditor";
import {Col, Row} from "react-bootstrap";
import RecipientsProgress from "@/components/recipients/RecipientsProgress";

const RecipientsContainer = () => {
    return (
        <Row>
            <Col sm={6}>
                <Row className="g-3 align-items-baseline">
                    <Col xs="auto">
                        <h3>Recipients</h3>
                    </Col>
                    <Col>
                        <RecipientsProgress />
                    </Col>
                </Row>
                <RecipientsList/>
            </Col>
            <Col>
                <h3>Recipients Editor</h3>
                <RecipientEditor/>
            </Col>
        </Row>
    )
}

export default RecipientsContainer;

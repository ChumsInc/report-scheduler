import React from 'react';
import {Col, Row} from "react-bootstrap";
import ReportList from "@/components/reports/ReportList";
import {Outlet} from "react-router";
import AppNav from "@/app/AppNav";

export default function Main() {
    return (
        <Row className="g-3">
            <Col md={4}>
                <ReportList/>
            </Col>
            <Col md={8}>
                <AppNav />
                <Outlet/>
            </Col>
        </Row>
    )
}

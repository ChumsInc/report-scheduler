import React, {useEffect, useState} from 'react';
import {Nav} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";

export default function AppNav() {
    const location = useLocation();
    const navigate = useNavigate();

    const [tab, setTab] = useState(location.pathname ?? "/editor");

    useEffect(() => {
        navigate(tab);
    }, [tab]);

    useEffect(() => {
        setTab(location.pathname ?? "/editor");
    }, [location]);

    return (
        <Nav variant="tabs" className="mb-1"
             defaultActiveKey="/editor" activeKey={tab} onSelect={(key) => setTab(key ?? '/editor')}>
            <Nav.Item>
                <Nav.Link  eventKey="/editor">Editor</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/recipients">Recipients</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/history" disabled>History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/notes">Notes</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

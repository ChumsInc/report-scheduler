import React from 'react';
import {selectCurrentRecipients, selectSelectedRecipient, selectSelectedRecipientLoading} from "./selectors";
import {useDispatch, useSelector} from "react-redux";
import {Recipient} from "../../app/types";
import {recipientSorter} from "./utils";
import {selectRecipientAction} from "./actions";
import classNames from "classnames";
import {LoadingProgressBar} from "chums-ducks";

const RecipientsList:React.FC = () => {
    const dispatch = useDispatch();
    const recipients = useSelector(selectCurrentRecipients);
    const selected = useSelector(selectSelectedRecipient);
    const loading = useSelector(selectSelectedRecipientLoading);

    const clickHandler = (row:Recipient) => {
        dispatch(selectRecipientAction(row));
    }
    return (
        <div className="recipients-list">
            {loading && <LoadingProgressBar animated={true}/>}
            <table className="table table-xs table-hover">
                <thead>
                <tr>
                    <th>Acct</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                {recipients
                    .sort(recipientSorter)
                    .map(row => (
                        <tr key={row.id} className={classNames({'text-muted': !row.active, 'text-warning': !row.EmailAddress, 'table-active': row.id === selected?.id})}
                            onClick={() => clickHandler(row)}>
                            <RecipientRow row={row} />
                            <td><span className={row.active ? "bi-toggle-on" : 'bi-toggle-off'} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecipientsList;

interface RecipientRow {
    row: Recipient,
}
const RecipientRow:React.FC<RecipientRow> = ({row}) => {
    switch (row.RecipientType) {
    case 'rep':
        return (
            <>
                <td>{row.SalespersonDivisionNo}-{row.SalespersonNo}</td>
                <td>{row.Name}</td>
                <td>{row.EmailAddress}</td>
            </>
        )
    case 'cust':
        return (
            <>
                <td>{row.ARDivisionNo}-{row.CustomerNo}</td>
                <td>{row.Name}</td>
                <td>{row.EmailAddress}</td>
            </>
        )
    default:
        return (
            <>
                <td>-</td>
                <td>{row.Name}</td>
                <td>{row.EmailAddress}</td>
            </>
        )
    }
}

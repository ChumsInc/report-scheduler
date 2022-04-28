import React from 'react';
import {selectCurrentRecipients} from "./selectors";
import {useDispatch, useSelector} from "react-redux";
import {Recipient} from "../../app/types";
import {recipientSorter} from "./utils";
import {selectRecipientAction} from "./actions";
import classNames from "classnames";

const RecipientsList:React.FC = () => {
    const dispatch = useDispatch();
    const recipients = useSelector(selectCurrentRecipients);

    const clickHandler = (row:Recipient) => {
        dispatch(selectRecipientAction(row));
    }
    return (
        <div className="recipients-list">
            <table className="table table-xs table-hover">
                <thead>
                <tr>
                    <th>Acct</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {recipients
                    .sort(recipientSorter)
                    .map(rec => (
                        <tr className={classNames({'text-danger': !rec.active, 'text-warning': !rec.EmailAddress})}
                            onClick={() => clickHandler(rec)}>
                            <RecipientRow key={rec.id} row={rec} />
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

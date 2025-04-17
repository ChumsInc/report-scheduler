import React from 'react';
import {useSelector} from "react-redux";
import {Recipient} from "@/app/types";
import {loadRecipient} from "@/ducks/current/actions";
import {SortableTable, SortableTableField, SortProps} from "@chumsinc/sortable-tables";
import RecipientAccountIcon from "@/components/recipients/RecipientAccount";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCurrentRecipient, selectRecipientsSort, selectSortedRecipients, setRecipientsSort} from "@/ducks/current";
import classNames from "classnames";

const fields: SortableTableField<Recipient>[] = [
    {field: 'RecipientType', title: 'Acct', sortable: true, render: (row) => <RecipientAccountIcon recipient={row}/>},
    {field: 'Name', title: 'Name', sortable: true},
    {field: 'EmailAddress', title: 'Email', sortable: true},
]

const RecipientsList = () => {
    const dispatch = useAppDispatch();
    const recipients = useSelector(selectSortedRecipients);
    const sort = useAppSelector(selectRecipientsSort);
    const current = useSelector(selectCurrentRecipient);

    const clickHandler = (row: Recipient) => {
        dispatch(loadRecipient(row));
    }

    const sortChangeHandler = (sort: SortProps<Recipient>) => {
        dispatch(setRecipientsSort(sort));
    }
    return (
        <div className="recipients-list">
            <SortableTable<Recipient> fields={fields} size="xs"
                                      rowClassName={(row) => classNames({'table-warning': !row.active})}
                                      currentSort={sort} onChangeSort={sortChangeHandler}
                                      data={recipients} keyField="id"
                                      selected={current?.id} onSelectRow={clickHandler}/>
        </div>
    )
}

export default RecipientsList;

interface RecipientRow {
    row: Recipient,
}

const RecipientRow: React.FC<RecipientRow> = ({row}) => {
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

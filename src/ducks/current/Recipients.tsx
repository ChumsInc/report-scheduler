import React from 'react';
import RecipientsList from "./RecipientsList";
import RecipientEditor from "./RecipientEditor";

const Recipients:React.FC = () => {
    return (
        <div>
            <h3>Recipients</h3>
            <div>
                <RecipientsList />
            </div>
            <div>Recipients Editor</div>
            <RecipientEditor />
        </div>
    )
}

export default Recipients;

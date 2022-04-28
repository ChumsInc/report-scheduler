import React from 'react';
import RecipientsList from "./RecipientsList";

const Recipients:React.FC = () => {
    return (
        <div>
            <h3>Recipients</h3>
            <div>
                <RecipientsList />
            </div>
            <div>Recipients Editor</div>
        </div>
    )
}

export default Recipients;

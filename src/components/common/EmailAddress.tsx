import React from 'react';

export interface EmailAddressProps {
    email: string|null;
}
export default function EmailAddress({ email }: EmailAddressProps) {
    const addresses = (email ?? '').split(';')
    if (!addresses.length) {
        return <span>No Email</span>
    }
    return (
        <>
            {addresses.map((address, index) => (
                <span key={index} className="me-2">&lt;{address}&gt;</span>
            ))}
        </>
    )
}

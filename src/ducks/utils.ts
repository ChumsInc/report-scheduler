
export type ActionStatus = 'pending'|'resolved'|'rejected';

export const actionHelper = (actionType: string, status: ActionStatus) => `${actionType}/${status}`;

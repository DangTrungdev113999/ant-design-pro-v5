type PliciesType =
  | 'view-operators'
  | 'create-operator'
  | 'change-operator-permission'
  | 'view-leads'
  | 'view-promotion'
  | 'view-loans'
  | 'create-note'
  | 'loan-approval-level-1'
  | 'loan-request-edit'
  | 'loan-cancellation'
  | 'loan-transactions'
  | 'create-loan-products'
  | 'view-bank-transactions'
  | 'view-dashboard-collaborators'
  | 'view-list-collaborators'
  | 'create-collaborator'
  | 'edit-collaborator'
  | 'view-users'
  | 'create-lender'
  | 'create-borrower'
  | 'create-promotion'
  | 'delete-promotion'
  | 'change-promotion'
  | 'view-notifications'
  | 'create-notification'
  | 'update-notification'
  | 'delete-notification';

declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    avatarFileId?: number;
    id?: number;
    isBlocked?: boolean;
    name?: string;
    phone?: number;
    role?: string;
    policies?: PliciesType[];
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}

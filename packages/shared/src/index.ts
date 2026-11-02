export const userRoles = ['ADMIN', 'CLIENT', 'DEVELOPER'] as const;
export type UserRole = (typeof userRoles)[number];

export const leadStatuses = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL_SENT',
  'CONVERTED',
  'CLOSED',
] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const startupStages = ['IDEA', 'PROTOTYPE', 'MVP', 'SCALING'] as const;
export type StartupStage = (typeof startupStages)[number];

export const budgetRanges = [
  'UNDER_5_LAKH',
  'FIVE_TO_FIFTEEN_LAKH',
  'FIFTEEN_TO_FIFTY_LAKH',
  'ABOVE_FIFTY_LAKH',
  'NOT_SURE',
] as const;
export type BudgetRange = (typeof budgetRanges)[number];

export interface CreateLeadRequest {
  name: string;
  email: string;
  companyName?: string;
  startupStage: StartupStage;
  servicesNeeded: string[];
  budgetRange: BudgetRange;
  projectDescription: string;
  website?: string;
  submissionToken: string;
}

export interface LeadResponse {
  id: string;
  status: LeadStatus;
  createdAt: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId?: string;
  };
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

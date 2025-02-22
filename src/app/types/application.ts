export type ApplicationStatus = 'Applied' | 'Interviewed' | 'Offered' | 'Rejected';

export interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
}
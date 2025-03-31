import type { JobApplication, ApplicationStatus } from '../types/application';

export const jobApplicationStatus: ApplicationStatus[] = [
  'Applied',
  'Interviewed',
  'Offered',
  'Rejected'
];

export const initialApplications: JobApplication[] = [
  {
    id: 1,
    company: 'Kandlehop Strander',
    position: 'Frontend Developer',
    status: 'Applied',
    appliedDate: '2025-02-15',
    notes: 'React experience required'
  }
];
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
    company: 'Tech Corp',
    position: 'Frontend Developer',
    status: 'Applied',
    appliedDate: '2023-08-15',
    notes: 'React experience required'
  }
];
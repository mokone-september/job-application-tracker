'use client';

import { useState } from 'react';
import JobApplicationItem from './JobApplicationItem';
import { jobApplicationStatus } from '../utils/applications';
import type { JobApplication, ApplicationStatus } from '../types/application';

export default function JobApplicationList({
  applications,
  onEdit,
  onDelete,
}: {
  applications: JobApplication[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'All'>('All');

  const filteredApplications = filterStatus === 'All' 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  return (
    <div>
      <div className="mb-4">
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | 'All')}
          className="p-2 border rounded"
        >
          <option value="All">All Statuses</option>
          {jobApplicationStatus.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      
      {filteredApplications.map((application) => (
        <JobApplicationItem
          key={application.id}
          application={application}
          onEdit={() => onEdit(application.id)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
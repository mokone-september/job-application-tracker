'use client';

import { useState, useEffect } from 'react';
import { JobApplication, ApplicationStatus } from '../types/application';

interface JobApplicationFormProps {
  onSubmit: (application: Omit<JobApplication, 'id'>) => void;
  initialData?: JobApplication;
}

export default function JobApplicationForm({ onSubmit, initialData }: JobApplicationFormProps) {
  const [formData, setFormData] = useState<Omit<JobApplication, 'id'>>({
    company: '',
    position: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      const { ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      company: '',
      position: '',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Company:
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Position:
          <input
            type="text"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Status:
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ApplicationStatus })}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Applied Date:
          <input
            type="date"
            value={formData.appliedDate}
            onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Notes:
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
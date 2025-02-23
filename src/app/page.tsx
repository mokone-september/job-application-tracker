'use client';

import { useState } from 'react';
import { useApplications } from './context/ApplicationContext';
import JobApplicationForm from './components/JobApplicationForm';
import JobApplicationList from './components/JobApplicationList';
import { JobApplication } from './types/application';

export default function Home() {
  const { applications, addApplication, editApplication, deleteApplication } = useApplications();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (application: Omit<JobApplication, 'id'>) => {
    if (editingId) {
      editApplication(editingId, application);
      setEditingId(null);
    } else {
      addApplication(application);
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">Job Application Tracker</h1>
      <p className="text-lg mb-4">Track your job applications effectively.</p>
      <JobApplicationForm 
        onSubmit={handleSubmit}
        initialData={applications.find(app => app.id === editingId)}
      />
      <JobApplicationList 
        applications={applications}
        onEdit={setEditingId}
        onDelete={deleteApplication}
      />
    </main>
  );
}
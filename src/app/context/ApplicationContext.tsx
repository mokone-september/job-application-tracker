'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { JobApplication } from '../types/application';

interface ApplicationContextType {
  applications: JobApplication[];
  addApplication: (application: Omit<JobApplication, 'id'>) => void;
  editApplication: (id: number, application: Omit<JobApplication, 'id'>) => void;
  deleteApplication: (id: number) => void;
}

const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType);

const initialApplications: JobApplication[] = [
  {
    id: 1,
    company: 'Tech Corp',
    position: 'Frontend Developer',
    status: 'Applied',
    appliedDate: '2023-08-15',
    notes: 'React experience required'
  }
];

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('jobApplications');
    setApplications(saved ? JSON.parse(saved) : initialApplications);
  }, []);

  const saveToLocalStorage = (apps: JobApplication[]) => {
    localStorage.setItem('jobApplications', JSON.stringify(apps));
  };

  const addApplication = (application: Omit<JobApplication, 'id'>) => {
    const newApps = [...applications, { ...application, id: Date.now() }];
    setApplications(newApps);
    saveToLocalStorage(newApps);
  };

  const editApplication = (id: number, application: Omit<JobApplication, 'id'>) => {
    const newApps = applications.map(app => 
      app.id === id ? { ...application, id } : app
    );
    setApplications(newApps);
    saveToLocalStorage(newApps);
  };

  const deleteApplication = (id: number) => {
    const newApps = applications.filter(app => app.id !== id);
    setApplications(newApps);
    saveToLocalStorage(newApps);
  };

  return (
    <ApplicationContext.Provider 
      value={{ applications, addApplication, editApplication, deleteApplication }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export const useApplications = () => useContext(ApplicationContext);
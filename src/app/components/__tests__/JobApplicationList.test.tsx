import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobApplicationList from '../JobApplicationList';
import type { JobApplication } from '../../types/application';
import { jobApplicationStatus } from '../../utils/applications';

describe('JobApplicationList', () => {
  const mockApplications: JobApplication[] = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Frontend Developer',
      status: 'Applied',
      notes: 'Referred by John Doe',
      appliedDate: '2023-05-15',
    },
    {
      id: 2,
      company: 'Design Co',
      position: 'UI Designer',
      status: 'Interviewed',
      notes: '',
      appliedDate: '2023-05-20',
    },
    {
      id: 3,
      company: 'Data Systems',
      position: 'Backend Engineer',
      status: 'Offered',
      notes: 'Remote position',
      appliedDate: '2023-05-25',
    },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all applications when "All Statuses" is selected', () => {
    render(
      <JobApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Design Co')).toBeInTheDocument();
    expect(screen.getByText('Data Systems')).toBeInTheDocument();
  });

  it('filters applications by status when a status is selected', () => {
    render(
      <JobApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Interviewed' } });

    expect(screen.queryByText('Tech Corp')).not.toBeInTheDocument();
    expect(screen.getByText('Design Co')).toBeInTheDocument();
    expect(screen.queryByText('Data Systems')).not.toBeInTheDocument();
  });

  it('calls onEdit with correct id when edit is triggered on an item', () => {
    render(
      <JobApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const firstEditButton = screen.getAllByText('Edit')[0];
    fireEvent.click(firstEditButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(1);
  });

  it('calls onDelete with correct id when delete is triggered on an item', () => {
    render(
      <JobApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const firstDeleteButton = screen.getAllByText('Delete')[1];
    fireEvent.click(firstDeleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(2);
  });

  it('renders all status options in the filter dropdown', () => {
    render(
      <JobApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(jobApplicationStatus.length + 1); // +1 for "All Statuses"
    expect(options[0]).toHaveValue('All');
    
    jobApplicationStatus.forEach((status, index) => {
      expect(options[index + 1]).toHaveValue(status);
    });
  });

  it('shows empty state when no applications match filter', () => {
    render(
      <JobApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Rejected' } });

    mockApplications.forEach(app => {
      expect(screen.queryByText(app.company)).not.toBeInTheDocument();
    });
  });
});

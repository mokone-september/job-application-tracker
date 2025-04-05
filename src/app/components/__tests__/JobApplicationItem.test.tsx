import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobApplicationItem from '../JobApplicationItem';
import type { JobApplication } from '../../types/application';

describe('JobApplicationItem', () => {
  const mockApplication: JobApplication = {
    id: 1,
    company: 'Tech Corp',
    position: 'Frontend Developer',
    status: 'Applied',
    notes: 'Referred by John Doe',
    appliedDate: '2023-05-15',
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders application information correctly', () => {
    render(
      <JobApplicationItem
        application={mockApplication}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Applied')).toBeInTheDocument();
    expect(screen.getByText('Referred by John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Applied on:/)).toHaveTextContent('5/15/2023');
  });

  it('displays the correct status color', () => {
    render(
      <JobApplicationItem
        application={mockApplication}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const statusBadge = screen.getByText('Applied');
    expect(statusBadge).toHaveClass('bg-blue-100');
    expect(statusBadge).toHaveClass('text-blue-800');
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <JobApplicationItem
        application={mockApplication}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete with correct id when delete button is clicked', () => {
    render(
      <JobApplicationItem
        application={mockApplication}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('does not render notes section when notes are empty', () => {
    const applicationWithoutNotes = { ...mockApplication, notes: '' };
    render(
      <JobApplicationItem
        application={applicationWithoutNotes}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.queryByText('Referred by John Doe')).not.toBeInTheDocument();
  });

  it('displays different status colors correctly', () => {
    const statuses = [
      { status: 'Interviewed', bg: 'bg-yellow-100', text: 'text-yellow-800' },
      { status: 'Offered', bg: 'bg-green-100', text: 'text-green-800' },
      { status: 'Rejected', bg: 'bg-red-100', text: 'text-red-800' },
    ];

    statuses.forEach(({ status, bg, text }) => {
      const applicationWithStatus = { ...mockApplication, status };
      render(
        <JobApplicationItem
          application={applicationWithStatus}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const statusBadge = screen.getByText(status);
      expect(statusBadge).toHaveClass(bg);
      expect(statusBadge).toHaveClass(text);

      // Clean up after each iteration
      screen.unmount();
    });
  });
});

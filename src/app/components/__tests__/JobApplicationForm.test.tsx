import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobApplicationForm from '../JobApplicationForm';
import type { JobApplication, ApplicationStatus } from '../../types/application';

describe('JobApplicationForm', () => {
  const mockSubmit = jest.fn();

  const mockInitialData: JobApplication = {
    id: 1,
    company: 'Tech Corp',
    position: 'Frontend Developer',
    status: 'Interviewing' as ApplicationStatus,
    appliedDate: '2023-05-15',
    notes: 'Second round interview scheduled'
  };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders the form with default values when no initial data', () => {
    render(<JobApplicationForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText('Company')).toHaveValue('');
    expect(screen.getByLabelText('Position')).toHaveValue('');
    expect(screen.getByLabelText('Status')).toHaveValue('Applied');
    expect(screen.getByLabelText('Applied Date')).toHaveValue(new Date().toISOString().split('T')[0]);
    expect(screen.getByLabelText('Notes')).toHaveValue('');
    expect(screen.getByRole('button')).toHaveTextContent('Add Application');
  });

  it('renders with initial data when provided', () => {
    render(<JobApplicationForm onSubmit={mockSubmit} initialData={mockInitialData} />);
    
    expect(screen.getByLabelText('Company')).toHaveValue(mockInitialData.company);
    expect(screen.getByLabelText('Position')).toHaveValue(mockInitialData.position);
    expect(screen.getByLabelText('Status')).toHaveValue(mockInitialData.status);
    expect(screen.getByLabelText('Applied Date')).toHaveValue(mockInitialData.appliedDate);
    expect(screen.getByLabelText('Notes')).toHaveValue(mockInitialData.notes);
    expect(screen.getByRole('button')).toHaveTextContent('Update Application');
  });

  it('submits form data when valid', async () => {
    render(<JobApplicationForm onSubmit={mockSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Company'), 'Google');
    await userEvent.type(screen.getByLabelText('Position'), 'Software Engineer');
    await userEvent.selectOptions(screen.getByLabelText('Status'), 'Interviewing');
    await userEvent.type(screen.getByLabelText('Applied Date'), '2023-06-01');
    await userEvent.type(screen.getByLabelText('Notes'), 'Referral from John Doe');
    
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        company: 'Google',
        position: 'Software Engineer',
        status: 'Interviewing',
        appliedDate: '2023-06-01',
        notes: 'Referral from John Doe'
      });
    });
  });

  it('resets form after submission when no initial data', async () => {
    render(<JobApplicationForm onSubmit={mockSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Company'), 'Amazon');
    await userEvent.type(screen.getByLabelText('Position'), 'Backend Developer');
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByLabelText('Company')).toHaveValue('');
      expect(screen.getByLabelText('Position')).toHaveValue('');
    });
  });

  it('does not reset form after submission when editing', async () => {
    render(<JobApplicationForm onSubmit={mockSubmit} initialData={mockInitialData} />);
    
    const newCompany = 'Updated Company';
    await userEvent.clear(screen.getByLabelText('Company'));
    await userEvent.type(screen.getByLabelText('Company'), newCompany);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByLabelText('Company')).toHaveValue(newCompany);
    });
  });

  it('validates required fields', async () => {
    render(<JobApplicationForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled();
    });
    
    expect(screen.getByLabelText('Company')).toHaveAttribute('required');
    expect(screen.getByLabelText('Position')).toHaveAttribute('required');
    expect(screen.getByLabelText('Applied Date')).toHaveAttribute('required');
  });

  it('handles status dropdown changes', async () => {
    render(<JobApplicationForm onSubmit={mockSubmit} />);
    
    const statusSelect = screen.getByLabelText('Status');
    await userEvent.selectOptions(statusSelect, 'Rejected');
    
    expect(statusSelect).toHaveValue('Rejected');
  });

  it('matches snapshot when empty', () => {
    const { asFragment } = render(<JobApplicationForm onSubmit={mockSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with initial data', () => {
    const { asFragment } = render(
      <JobApplicationForm onSubmit={mockSubmit} initialData={mockInitialData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});


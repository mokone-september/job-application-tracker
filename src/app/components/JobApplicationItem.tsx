'use client';

import type { JobApplication } from '../types/application';

export default function JobApplicationItem({
  application,
  onEdit,
  onDelete,
}: {
  application: JobApplication;
  onEdit: () => void;
  onDelete: (id: number) => void;
}) {
  const statusColors = {
    Applied: 'bg-blue-100 text-blue-800',
    Interviewed: 'bg-yellow-100 text-yellow-800',
    Offered: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="p-4 mb-4 border rounded-lg hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{application.company}</h3>
          <p className="text-gray-600">{application.position}</p>
          <span className={`inline-block px-2 py-1 text-sm rounded-full ${statusColors[application.status]}`}>
            {application.status}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onEdit}
            className="px-3 py-1 text-sm text-white bg-gray-500 rounded"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(application.id)}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      </div>
      {application.notes && (
        <div className="mt-2 text-gray-600">
          <p className="text-sm">{application.notes}</p>
        </div>
      )}
      <p className="mt-2 text-sm text-gray-500">
        Applied on: {new Date(application.appliedDate).toLocaleDateString()}
      </p>
    </div>
  );
}
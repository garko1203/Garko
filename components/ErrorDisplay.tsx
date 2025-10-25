
import React from 'react';
import { WarningIcon } from './icons';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex items-center p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg" role="alert">
      <WarningIcon className="mr-3" />
      <div>
        <p className="font-bold">An Error Occurred</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};


import React from 'react';

interface ResultSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ title, icon, children }) => {
  return (
    <section className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-purple-400 mr-3">{icon}</span>
        <h3 className="text-xl font-bold text-gray-200">{title}</h3>
      </div>
      <div>{children}</div>
    </section>
  );
};

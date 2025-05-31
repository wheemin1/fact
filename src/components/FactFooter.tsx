
import React from 'react';

interface FactFooterProps {
  factId: number;
  category: string;
}

const FactFooter: React.FC<FactFooterProps> = ({ factId, category }) => {
  return (
    <div className="w-full max-w-2xl mx-auto text-center text-sm text-gray-500 py-4">
      Fact #{factId} · Category: {category}
    </div>
  );
};

export default FactFooter;

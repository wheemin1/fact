
import React from 'react';

const AdSense: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-sm mb-2">Advertisement</p>
        <div className="bg-white rounded p-4 min-h-[100px] flex items-center justify-center">
          <p className="text-gray-400 text-xs">
            Google AdSense Space
            <br />
            (320x100 mobile banner)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdSense;

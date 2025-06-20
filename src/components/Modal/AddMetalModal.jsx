import React, { useEffect, useState } from 'react';
import { createMetalType } from '../../redux/services/metalService';

// 
const AddMetalModal = ({ onClose, metalData, onSuccess }) => {
  const [metal, setMetal] = useState(metalData?.name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMetal(metalData?.name || '');
  }, [metalData]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = { name: metal, metaltypeId: metalData?._id || '' };
      await createMetalType(payload);
      if (typeof onSuccess === 'function') onSuccess();
      onClose();
    } catch (error) {
      // Show API error in modal (e.g. duplicate)
      const apiMsg = error?.response?.data?.Message || error?.message || 'Failed to save metal type.';
      setError(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 backdrop-blur-sm">
      <div className="bg-[#E6EAEE] rounded-2xl p-8 min-w-[320px] sm:min-w-[400px] md:min-w-[500px] shadow-2xl flex flex-col gap-6">
        <div className="text-[20px] font-semibold mb-2 text-[#212121]">{metalData ? 'Edit Metal Type' : 'Add Metal Type'}</div>
        <div>
          <div className="text-[15px] font-medium mb-1 text-[#475569]">Metal Type</div>
          <input
            className="w-full px-3 text-[#A0A8BB] py-2 rounded-md  border-gray-300 text-[15px] mb-4 bg-white focus:outline-none  focus:ring-[#263312]"
            type="text"
            placeholder="Enter metal type"
            value={metal}
            onChange={e => setMetal(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="px-7 py-2 rounded-lg bg-[#F5F7FA] text-gray-600 font-medium text-[15px] shadow hover:bg-gray-200 border border-gray-200 "
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 rounded-lg bg-[#303F26] text-white font-medium text-[15px] shadow hover:bg-[#1a220d] "
            onClick={handleSave}
            disabled={loading || !metal}
          >
            {loading ? (metalData ? 'Saving...' : 'Saving...') : (metalData ? 'Update' : 'Save')}
          </button>
        </div>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}

      </div>
    </div>
  );
};

export default AddMetalModal;

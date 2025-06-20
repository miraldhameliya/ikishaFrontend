import React, { useEffect, useState } from 'react';
import { createDiamondShape } from '../../redux/services/diamondShape';



const AddDiamondModal = ({ onClose, diamondData, onSuccess }) => {
  const [shape, setShape] = useState(diamondData?.shape || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setShape(diamondData?.shape || '');
  }, [diamondData]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = { shape: shape, _id: diamondData?._id || '' };
      await createDiamondShape(payload);
      if (onSuccess) onSuccess();
      onClose();

    } catch (error) {
      const apiMsg = error?.response?.data?.Message || error?.message || 'Failed to save metal type.';
      setError(apiMsg);
    } finally {
      setLoading(false);
    }
    // TODO: handle save logic

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 backdrop-blur-sm">
      <div className="bg-[#E6EAEE] rounded-2xl p-8 min-w-[320px] sm:min-w-[400px] md:min-w-[500px] shadow-2xl flex flex-col gap-6">
        <div className="text-[20px] font-semibold mb-2 text-[#212121]">{diamondData ? 'Edit Shape' : 'Add Shape'}</div>
        <div>
          <div className="text-[15px] font-medium mb-1 text-[#475569]">Diamond Shape</div>
          <input
            className="w-full px-3 text-[#A0A8BB] py-2 rounded-md  border-gray-300 text-[15px] mb-4 bg-white focus:outline-none  focus:ring-[#263312]"
            type="text"
            placeholder="Enter diamond shape"
            value={shape}
            onChange={e => setShape(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="px-7 py-2 rounded-lg bg-[#F5F7FA] text-gray-600 font-medium text-[15px] shadow hover:bg-gray-200 border border-gray-200"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 rounded-lg bg-[#303F26] text-white font-medium text-[15px] shadow hover:bg-[#1a220d]"
            onClick={handleSave}
            disabled={loading || !shape}
          >
            {loading ? (diamondData ? 'Saving...' : 'Saving...') : (diamondData ? 'Update' : 'Save')}
          </button>
        </div>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default AddDiamondModal;

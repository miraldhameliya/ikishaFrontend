import React, { useState } from 'react';
import { createSize, updateSize } from '../../redux/services/sizeService';

const AddSizeModal = ({ onClose, onSuccess, sizeData }) => {
  const [shape, setShape] = useState(sizeData?.size || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update input if sizeData changes (for edit)
  React.useEffect(() => {
    setShape(sizeData?.size || '');
  }, [sizeData]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      let payload = { size: shape };
      // Only add sizeid if editing
      if (sizeData && sizeData._id) {
        payload.sizeid = sizeData._id;
      }
      await createSize(payload);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to save size.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 backdrop-blur-sm">
      <div className="bg-[#E6EAEE] rounded-2xl p-8 min-w-[320px] sm:min-w-[400px] md:min-w-[500px] shadow-2xl flex flex-col gap-6">
        <div className="text-[20px] font-semibold mb-2 text-[#212121]">{sizeData ? 'Edit Size' : 'Add Size'}</div>
        <div>
          <div className="text-[15px] font-medium mb-1 text-[#475569]">Size</div>
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
            className="px-7 py-2 rounded-lg bg-[#F5F7FA] text-gray-600 font-medium text-[15px] shadow hover:bg-gray-200 border border-gray-200 "
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 rounded-lg bg-[#303F26] text-white font-medium text-[15px] shadow hover:bg-[#1a220d] "
            onClick={handleSave}
            disabled={loading || !shape}
          >
            {loading ? (sizeData ? 'Saving...' : 'Saving...') : (sizeData ? 'Update' : 'Save')}
          </button>
        </div>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default AddSizeModal;

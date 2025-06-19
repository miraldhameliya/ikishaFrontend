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
      const payload = { size: shape, _id: sizeData?._id || '' };
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
      <div className="bg-[#F5F7FA] rounded-2xl p-8 min-w-[320px] sm:min-w-[400px] md:min-w-[500px] shadow-2xl flex flex-col gap-6">
        <div className="text-[20px] font-semibold mb-2 text-gray-900">{sizeData ? 'Edit Size' : 'Add Size'}</div>
        <div>
          <div className="text-[15px] font-medium mb-1 text-gray-800">Size</div>
          <input
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-[15px] mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#263312]"
            type="text"
            placeholder="Enter diamond shape"
            value={shape}
            onChange={e => setShape(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="px-7 py-2 rounded-lg bg-[#F5F7FA] text-gray-600 font-medium text-[15px] shadow hover:bg-gray-200 border border-gray-200 disabled:opacity-60"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 rounded-lg bg-[#263312] text-white font-medium text-[15px] shadow hover:bg-[#1a220d] disabled:opacity-60"
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

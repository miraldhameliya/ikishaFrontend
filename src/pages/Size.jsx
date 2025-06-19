import React, { useState, useEffect } from 'react';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';

import Table from '../components/Table';
import AddSizeModal from '../components/Modal/AddSizeModal';
import { fetchSizes, updateSize } from '../redux/services/sizeService';
import edit from '../assets/icon/edit.png'

const getColumns = (handleEdit, handleToggleStatus, statusLoadingId) => [
  { key: 'size', title: 'Size' },
  {
    key: 'status',
    title: 'Status',
    render: (row) => (
      <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={row.status}
            onChange={() => handleToggleStatus(row)}
            disabled={statusLoadingId === row._id}
            className="sr-only peer"
          />
          <div className="w-10 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-4"></div>
        </label>
        
      </div>
    ),
  },
  {
    key: 'action',
    title: 'Action',
    render: (row) => (
      <div className="flex gap-2">
        <button className="hover:scale-105 transition-transform" onClick={() => handleEdit(row)}>
          <img src={edit} alt='edit' className='w-8 h-8' />
        </button>
      </div>
    ),
  },
];

const Size = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { setRightButton } = useHeaderRightButton();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [statusError, setStatusError] = useState('');

  // Move fetch logic to a function
  const loadSizes = () => {
    setLoading(true);
    fetchSizes({ page: 1, limit: 10, search: '' })
      .then(res => setData(res.Data?.docs || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setRightButton(
      <span
        className="bg-[#303F26] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#26371e] font-semibold text-lg shadow"
        onClick={() => setShowModal(true)}
      >
        Add Size
      </span>
    );
    return () => setRightButton(null); // Clean up on unmount
  }, [setShowModal, setRightButton]);

  useEffect(() => {
    loadSizes();
  }, []);

  // Add handlers for edit and delete
  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleToggleStatus = async (row) => {
    setStatusLoadingId(row._id);
    setStatusError('');
    try {
      await updateSize({ ...row, status: !row.status });
      loadSizes();
    } catch (err) {
      setStatusError('Failed to update status');
    } finally {
      setStatusLoadingId(null);
    }
  };

  return (
    <>
      <Table columns={getColumns(handleEdit, handleToggleStatus, statusLoadingId)} data={data} rowKey="_id" />
      {statusError && <div className="text-red-600 my-2 text-center font-medium">{statusError}</div>}
      {showModal && (
        <AddSizeModal
          onClose={() => { setShowModal(false); setSelectedRow(null); }}
          onSuccess={loadSizes}
          sizeData={selectedRow}
        />
      )}
    </>
  );
};

export default Size;

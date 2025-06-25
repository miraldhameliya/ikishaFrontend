import React, { useState, useEffect } from 'react';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';

import Table from '../components/Table';
import AddSizeModal from '../components/Modal/AddSizeModal';
import { fetchSizes, updateSizeStatus } from '../redux/services/sizeService';
import edit from '../assets/icon/edit.png'

const getColumns = (handleEdit, handleToggleStatus, statusLoadingId) => [
  { key: 'size', title: 'Size', align: 'left' },
  {
    key: 'status',
    title: 'Status',
    align: 'center',
    render: (row) => (

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={row.status}
          onChange={() => handleToggleStatus(row)}
          disabled={statusLoadingId === row._id}
          className="sr-only peer"
        />
        <div className="w-8 h-4 bg-gray-200 rounded-full peer-checked:bg-green-900 transition-colors duration-200"></div>
        <div className={`absolute left-0.5 top-0.5 w-3 h-3 bg-white border border-gray-300 rounded-full shadow-md transform transition-transform duration-200 ${row.status ? 'translate-x-4' : ''}`}></div>
        {/* <div className="w-10 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-4"></div> */}
      </label>


    ),
  },
  {
    key: 'action',
    title: 'Action',
    align: 'center',
    render: (row) => (

      <button className="hover:scale-105 transition-transform" onClick={() => handleEdit(row)}>
        <img src={edit} alt='edit' className='w-8 h-8 ' />
      </button>

    ),
  },
];

const Size = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { setRightButtonProps } = useHeaderRightButton();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [statusError, setStatusError] = useState('');

  const loadSizes = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetchSizes({ page: pageNum, limit: 10, search: '' });
      const newDocs = res.Data?.docs || [];
      setData(prev => pageNum === 1 ? newDocs : [...prev, ...newDocs]);
      setHasMore(newDocs.length === 10); // If less than 10, no more data
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight < 20 && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadSizes(page);
    }
  }, [page]);

   useEffect(() => {
    setRightButtonProps({
      text: 'Add Size',
      onClick: () => setShowModal(true)
    });
    return () => setRightButtonProps(null); // Clean up on unmount
  }, [setShowModal, setRightButtonProps]);

  useEffect(() => {
    loadSizes(1);
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
      await updateSizeStatus(row._id);
      loadSizes();
    } catch (error) {
      console.log(error);
      setStatusError('Failed to update status');
    } finally {
      setStatusLoadingId(null);
    }
  };

  return (
    <>
      <Table
        columns={getColumns(handleEdit, handleToggleStatus, statusLoadingId)}
        data={data}
        rowKey="_id"
        loading={loading}
        onBodyScroll={handleScroll}
      />
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

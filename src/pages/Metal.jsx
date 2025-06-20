import React, { useState, useEffect } from 'react';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';

import Table from '../components/Table';
import AddMetalModal from '../components/Modal/AddMetalModal';
import edit from '../assets/icon/edit.png';
import { fetchMetalTypes, updateMetalTypeStatus } from '../redux/services/metalService';


const getColumns = (handleEdit, handleToggleStatus, statusLoadingId) => [
  { key: 'name', title: 'Metal Type' },
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
      <div className="flex gap-2">
        <button className="hover:scale-105 transition-transform" onClick={() => handleEdit(row)}>
          <img src={edit} alt='edit' className='w-8 h-8' />
        </button>
      </div>
    ),
  },
];


const Metal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { setRightButton } = useHeaderRightButton();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [statusError, setStatusError] = useState('');

  const loadMetals = async (pageToLoad = 1) => {
    setLoading(true);
    try {
      const res = await fetchMetalTypes({ page: pageToLoad, limit: 10, search: '' });
      const allDocs = res?.Data?.docs || [];
      if (pageToLoad === 1) {
        setData(allDocs);
      } else {
        setData(prev => [...prev, ...allDocs]);
      }
      // If docs length is less than limit, no more data
      setHasMore(allDocs.length === 10);
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
    loadMetals(page);
  }, [page]);

  useEffect(() => {
    setRightButton(
      <span
        className="bg-[#303F26] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#26371e] font-semibold text-lg shadow"
        onClick={() => {
          setSelectedRow(null);
          setShowModal(true);
        }}
      >
        Add Metal
      </span>
    );
    return () => setRightButton(null); // Clean up on unmount
  }, [setShowModal, setRightButton]);

  useEffect(() => {
    setPage(1);
  }, []);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };
  const handleToggleStatus = async (row) => {
    setStatusLoadingId(row._id);
    setStatusError('');
    try {
      await updateMetalTypeStatus(row._id);
      loadMetals();
    } catch (error) {
      // handle error if needed
    }
    setTimeout(() => setStatusLoadingId(null), 500);
  };

  return (
    <>
      <Table
        rowKey="_id"
        columns={getColumns(handleEdit, handleToggleStatus, statusLoadingId)}
        data={data}
        loading={loading}
        onBodyScroll={handleScroll}
      />
      {showModal && <AddMetalModal
        onClose={() => { setShowModal(false); setSelectedRow(null); }}
        metalData={selectedRow}
        onSuccess={() => {
          setPage(1);
          loadMetals(1);
        }}
      />}
    </>
  );
};

export default Metal;


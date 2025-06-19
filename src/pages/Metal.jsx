import React, { useState, useEffect } from 'react';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';
import { getMetalTypes } from '../redux/services/metalService';

import Table from '../components/Table';
import AddMetalModal from '../components/Modal/AddMetalModal';
import edit from '../assets/icon/edit.png';


const getColumns = (handleEdit, handleToggleStatus, statusLoadingId) => [
    { key: 'name', title: 'Metal Type' },
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
  

const Metal = () => {
  const [showModal, setShowModal] = useState(false);
  const { setRightButton } = useHeaderRightButton();
  const [data, setData] = useState([]); // Placeholder for metal data
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  // Placeholder handlers
  const handleEdit = (row) => {
    setShowModal(true);
  };
  const handleToggleStatus = (row) => {
    setStatusLoadingId(row._id);
    // Simulate status toggle
    setTimeout(() => setStatusLoadingId(null), 500);
  };

  useEffect(() => {
    setRightButton(<span onClick={() => setShowModal(true)}>Add Metal</span>);
    // Fetch metal types on mount
    const fetchMetals = async () => {
      try {
        const metals = await getMetalTypes();
        console.log('API metals response:', metals);
        setData(metals.Data || []);
      } catch (error) {
        console.error('Failed to fetch metal types:', error);
      }
    };
    fetchMetals();
    return () => setRightButton(null); // Clean up on unmount
  }, [setShowModal, setRightButton]);

  return (
    <>
      <Table columns={getColumns(handleEdit, handleToggleStatus, statusLoadingId)} data={data} />
      {showModal && <AddMetalModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Metal;


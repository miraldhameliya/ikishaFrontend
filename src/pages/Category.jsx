import React, { useState } from 'react';

// import AddCategoryModal from './modals/AddCategoryModal';
import Table from '../components/Table';
import Header from '../components/Header';


const Category = () => {
  const [showModal, setShowModal] = useState(false);

  const rightButton = (
    <button onClick={() => setShowModal(true)}>Add Category</button>
  );

  return (
    <>
      {/* <Header rightButton={rightButton} /> */}
      <Table /* pass columns, data, pagination props here */ />
      {showModal && <AddCategoryModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Category;

import React, { useState, useEffect } from 'react';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';

import Table from '../components/Table';

import AddDiamondModal from '../components/Modal/AddDiamondModal';


const Diamond = () => {
  const [showModal, setShowModal] = useState(false);
  const { setRightButton } = useHeaderRightButton();

  useEffect(() => {
    setRightButton(<span onClick={() => setShowModal(true)}>Add Diamond</span>);
    return () => setRightButton(null); // Clean up on unmount
  }, [setShowModal, setRightButton]);

  return (
    <>
      <Table columns={[]} data={[]} />
      {showModal && <AddDiamondModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Diamond;

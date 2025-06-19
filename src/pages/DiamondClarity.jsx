import React, { useState, useEffect } from 'react';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';

import Table from '../components/Table';

import AddDiamondClarityModal from '../components/Modal/AddDiamondClarityModal';


const DiamondClarity = () => {
  const [showModal, setShowModal] = useState(false);
  const { setRightButton } = useHeaderRightButton();

  useEffect(() => {
    setRightButton(<span onClick={() => setShowModal(true)}>Add Diamond Clarity</span>);
    return () => setRightButton(null); // Clean up on unmount
  }, [setShowModal, setRightButton]);

  return (
    <>
      <Table columns={[]} data={[]} />
      {showModal && <AddDiamondClarityModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default DiamondClarity;

import React, { useState } from 'react';

function CreateVariants({ diamondType, diamondClarity, metalType, diamondPrice }) {
  const [rows, setRows] = useState([
    // Start with empty rows
  ]);

  const handleDelete = idx => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  const handleInputChange = (idx, field, value) => {
    setRows(rows => rows.map((row, i) => i === idx ? { ...row, [field]: value } : row));
  };

  const handleCreateVariant = () => {
    const newVariant = [diamondType, diamondClarity, metalType].filter(Boolean).join('/');
    if (!newVariant) {
        // Optional: show a message to select options first
        alert("Please select Diamond Type, Clarity, and Metal Type.");
        return;
    }
    const formattedDiamondPrice = diamondPrice ? diamondPrice.toLocaleString() : '0';
    setRows([...rows, { variant: newVariant, metalPrice: '', diamondPrice: formattedDiamondPrice, totalPrice: '' }]);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-2">
        <button
          className="bg-[#303f26] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-900"
          onClick={handleCreateVariant}
        >
          Create Variants
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-1 border border-gray-300 text-center">Sr.no</th>
              <th className="p-1 border border-gray-300 text-center">Variants</th>
              <th className="p-1 border border-gray-300 text-center">Metal Price</th>
              <th className="p-1 border border-gray-300 text-center">Diamond Price</th>
              <th className="p-1 border border-gray-300 text-center">Total Price</th>
              <th className="p-1 border border-gray-300 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className="p-1 border border-gray-300 text-center">{String(idx + 1).padStart(2, '0')}</td>
                <td className="p-1 border border-gray-300 text-center">
                  <input
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={row.variant}
                    onChange={e => handleInputChange(idx, 'variant', e.target.value)}
                  />
                </td>
                <td className="p-1 border border-gray-300 text-center">
                  <input
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={row.metalPrice}
                    onChange={e => handleInputChange(idx, 'metalPrice', e.target.value)}
                  />
                </td>
                <td className="p-1 border border-gray-300 text-center">
                  <input
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={row.diamondPrice}
                    readOnly
                  />
                </td>
                <td className="p-1 border border-gray-300 text-center">
                  <input
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={row.totalPrice}
                    onChange={e => handleInputChange(idx, 'totalPrice', e.target.value)}
                    // readOnly
                  />
                </td>
                <td className="p-1 border border-gray-300 text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(idx)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {/* Empty rows for visual spacing */}
            {Array(6 - rows.length).fill().map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="p-1 border border-gray-300 text-center">&nbsp;</td>
                <td className="p-1 border border-gray-300 text-center"></td>
                <td className="p-1 border border-gray-300 text-center"></td>
                <td className="p-1 border border-gray-300 text-center"></td>
                <td className="p-1 border border-gray-300 text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateVariants;

import React from 'react';

function CreateVariants({ diamondType, diamondClarity, metalType, diamondPrice, variants, setVariants }) {
  const handleDelete = idx => {
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const handleInputChange = (idx, field, value) => {
    setVariants(variants => variants.map((row, i) => i === idx ? { ...row, [field]: value } : row));
  };

  const handleCreateVariant = () => {
    const variantLabel = [
      diamondType?.type,
      diamondClarity?.grade,
      metalType?.name
    ].filter(Boolean).join('/');
    const newVariant = {
      diamondtypeId: diamondType?._id || '',
      diamondclaritiesId: diamondClarity?._id || '',
      metaltypeId: metalType?._id || '',
      variant: variantLabel,
      metalprice: '',
      diamondprice: diamondPrice ? diamondPrice.toString() : '0',
      varientprice: '',
    };
    if (!newVariant.diamondtypeId || !newVariant.diamondclaritiesId || !newVariant.metaltypeId) {
      alert("Please select Diamond Type, Clarity, and Metal Type.");
      return;
    }
    setVariants([...variants, newVariant]);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-2">
        <button
          className="bg-[#303f26] text-white px-4 py-2 font-semibold"
          onClick={handleCreateVariant}
        >
          Create Variants
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-[#334155] text-sm">
              <th className="p-1 border border-gray-300 text-center">Sr.no</th>
              <th className="p-1 border border-gray-300 text-center">Variants</th>
              <th className="p-1 border border-gray-300 text-center">Metal Price</th>
              <th className="p-1 border border-gray-300 text-center">Diamond Price</th>
              <th className="p-1 border border-gray-300 text-center">Total Price</th>
              <th className="p-1 border border-gray-300 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {variants.map((row, idx) => (
              <tr key={idx}>
                <td className="p-1 border border-gray-300 text-[#475569] text-center">{String(idx + 1).padStart(2, '0')}</td>
                <td className="p-1 border border-gray-300 text-[#475569] text-center">
                  <input
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={row.variant}
                    onChange={e => handleInputChange(idx, 'variant', e.target.value)}
                  />
                </td>
                <td className="p-1 border text-[#475569] border-gray-300 text-center">
                  <input
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={row.metalprice}
                    onChange={e => handleInputChange(idx, 'metalprice', e.target.value)}
                  />
                </td>
                <td className="p-1 border text-[#475569] border-gray-300 text-center">
                  <input
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={row.diamondprice}
                    readOnly
                  />
                </td>
                <td className="p-1 border text-[#475569] border-gray-300 text-center">
                  <input
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={row.varientprice}
                    onChange={e => handleInputChange(idx, 'varientprice', e.target.value)}
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
            {Array(6 - variants.length).fill().map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="p-1 border border-gray-300 text-center">&nbsp;</td>
                <td className="p-1 border border-gray-300 text-center"></td>
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

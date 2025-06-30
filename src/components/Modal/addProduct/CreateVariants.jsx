import React from 'react';
import Deleteicon from "../../../assets/icon/delete.png"

function CreateVariants({ diamondTypes = [], diamondClarities = [], metalTypes = [], diamondPriceMap = {}, variants, setVariants, labourPrice = 0, otherPrice = 0 }) {
  variants = Array.isArray(variants) ? variants : [];
  const handleDelete = idx => {
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const handleInputChange = (idx, field, value) => {
    setVariants(variants => variants.map((row, i) => {
      if (i !== idx) return row;
      // If editing total price, store as manualTotalPrice
      if (field === 'manualTotalPrice') {
        return { ...row, manualTotalPrice: value };
      }
      // If editing any other field, clear manualTotalPrice
      const updatedRow = { ...row, [field]: value };
      if (row.manualTotalPrice) delete updatedRow.manualTotalPrice;
      return updatedRow;
    }));
  };

  // Helper: cartesian product
  function cartesian(arrays) {
    // Defensive: ensure all are arrays and not empty
    if (!Array.isArray(arrays) || arrays.length === 0) return [];
    for (let arr of arrays) {
      if (!Array.isArray(arr) || arr.length === 0) return [];
    }
    return arrays.reduce((a, b) => a.flatMap(d => b.map(e => [].concat(d, e))));
  }

  const handleCreateVariant = () => {
    // Defensive: ensure all are arrays
    const dTypes = Array.isArray(diamondTypes) ? diamondTypes : (diamondTypes ? [diamondTypes] : []);
    const dClarities = Array.isArray(diamondClarities) ? diamondClarities : (diamondClarities ? [diamondClarities] : []);
    const mTypes = Array.isArray(metalTypes) ? metalTypes : (metalTypes ? [metalTypes] : []);
    if (!dTypes.length || !dClarities.length || !mTypes.length) {
      alert("Please select at least one Diamond Type, Clarity, and Metal Type.");
      return;
    }
    // Generate all combinations
    const combos = cartesian([dTypes, dClarities, mTypes]);
    // Avoid duplicates (by type/clarity/metal IDs)
    const existingKeys = new Set(
      variants.map(v => `${v.diamondtypeId}_${v.diamondclaritiesId}_${v.metaltypeId}`)
    );
    const newVariants = combos.map(([type, clarity, metal]) => {
      const variantLabel = [type?.type, clarity?.grade, metal?.name].filter(Boolean).join('/');
      return {
        diamondtypeId: type?._id || '',
        diamondclaritiesId: clarity?._id || '',
        metaltypeId: metal?._id || '',
        variant: variantLabel,
        metalprice: '',
        diamondprice: diamondPriceMap[type?._id] ? diamondPriceMap[type._id].toString() : '0',
        varientprice: '',
      };
    }).filter(v => v.diamondtypeId && v.diamondclaritiesId && v.metaltypeId && !existingKeys.has(`${v.diamondtypeId}_${v.diamondclaritiesId}_${v.metaltypeId}`));
    if (newVariants.length === 0) {
      alert("No new variants to add.");
      return;
    }
    setVariants([...variants, ...newVariants]);
  };

  // Helper to calculate total price for a variant row
  const getTotalPrice = (row) => {
    if (row.manualTotalPrice !== undefined && row.manualTotalPrice !== null && row.manualTotalPrice !== '') {
      return row.manualTotalPrice;
    }
    const lp = parseFloat(labourPrice) || 0;
    const op = parseFloat(otherPrice) || 0;
    const mp = parseFloat(row.metalprice) || 0;
    const dp = parseFloat(row.diamondprice) || 0;
    return (lp + op + mp + dp).toFixed(2);
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
              <th className="p-1 w-24 border border-gray-300 text-center">Variants</th>
              <th className="p-1 border border-gray-300 text-center">Metal Price</th>
              <th className="p-1 border border-gray-300 text-center">Diamond Price</th>
              <th className="p-1 border border-gray-300 text-center">Total Price</th>
              <th className="p-1 w-13 border border-gray-300 text-center"></th>
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
                    value={getTotalPrice(row)}
                    onChange={e => handleInputChange(idx, 'manualTotalPrice', e.target.value)}
                  />
                </td>
                <td className="p-1 w-13 border border-gray-300 text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(idx)}
                  >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg> */}
                    <img
                      src={Deleteicon}
                      alt="deleteicon"
                      className="w-4 h-4"
                    />
                  </button>
                </td>
              </tr>
            ))}
            {/* Empty rows for visual spacing */}
            {Array(6 - variants.length > 0 ? 6 - variants.length : 0).fill().map((_, i) => (
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

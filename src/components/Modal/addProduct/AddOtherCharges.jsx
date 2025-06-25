import React from 'react';

const AddOtherCharges = ({ rows, setRows }) => {
  const handleDelete = (idx) => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  const handleInputChange = (idx, field, value) => {
    setRows(rows =>
      rows.map((row, i) =>
        i === idx ? { ...row, [field]: value } : row
      )
    );
  };

  // Calculate totals
  const totalWeight = rows.reduce((sum, row) => {
    const num = parseFloat((row.weight || '').replace(/[^\d.]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const totalAmount = rows.reduce((sum, row) => {
    const num = parseFloat((row.amount || '').replace(/,/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-400 border-collapse">
        <thead>
          <tr>
            <th colSpan={4} className="text-center text-base font-bold py-1 border border-gray-400">
              Other Charge
            </th>
          </tr>
          <tr className="text-sm text-gray-500 text-center">
            <th className="p-1 font-semibold border border-gray-400 text-center">Product</th>
            <th className="p-1 font-semibold border border-gray-400 text-center">Weight</th>
            <th className="p-1 font-semibold border border-gray-400 text-center">Amount</th>
            <th className="p-1 font-semibold border border-gray-400 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="p-1 border border-gray-400 text-center">
                <input
                  type="text"
                  className="w-full text-center"
                  value={row.product}
                  onChange={e => handleInputChange(idx, 'product', e.target.value)}
                />
              </td>
              <td className="p-1 border border-gray-400 text-center">
                <input
                  type="text"
                  className="w-full text-center"
                  value={row.weight}
                  onChange={e => handleInputChange(idx, 'weight', e.target.value)}
                />
              </td>
              <td className="p-1 border border-gray-400 text-center">
                <input
                  type="text"
                  className="w-full text-center"
                  value={row.amount}
                  onChange={e => handleInputChange(idx, 'amount', e.target.value)}
                />
              </td>
              <td className="p-1 text-center border border-gray-400 text-center">
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
        </tbody>
        <tfoot>
          <tr className="bg-[#979f93] text-white font-bold">
            <td className="p-1 text-center border border-gray-400"></td>
            <td className="p-1 text-center border border-gray-400">{totalWeight}</td>
            <td className="p-1 text-center border border-gray-400">{totalAmount.toLocaleString()}</td>
            <td className="p-1 text-center border border-gray-400"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default AddOtherCharges;

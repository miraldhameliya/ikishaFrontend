import React from 'react';
import Deleteicon from "../../../assets/icon/delete.png"

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
    let amount = row.amount;
    if (typeof amount === 'string') {
      amount = amount.replace(/,/g, '');
    }
    const num = parseFloat(amount || 0);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-400 ">
        <thead>
          <tr>
            <th colSpan={4} className="text-center font-semibold py-1 border-b border-[#94A3B8] text-[#1E293B] bg-white">
              Other Charge
            </th>
          </tr>
          <tr className="text-sm text-[#334155] text-center">
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
                  className="w-full text-center text-[#334155] focus:outline-none"
                  value={row.product}
                  onChange={e => handleInputChange(idx, 'product', e.target.value)}
                />
              </td>
              <td className="p-1 border border-gray-400 text-center">
                <input
                  type="text"
                  className="w-full text-center  text-[#334155] focus:outline-none"
                  value={row.weight}
                  onChange={e => handleInputChange(idx, 'weight', e.target.value)}
                />
              </td>
              <td className="p-1 border border-gray-400 text-center">
                <input
                  type="text"
                  className="w-full text-center text-[#334155] focus:outline-none"
                  value={row.amount}
                  onChange={e => handleInputChange(idx, 'amount', e.target.value)}
                />
              </td>
              <td className="p-1 border w-13 border-gray-400 text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(idx)}
                >
                  <img
                    src={Deleteicon}
                    alt="deleteicon"
                    className="w-4 h-4"
                  />
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

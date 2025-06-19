

function Table({ columns=[], data=[], rowKey }) {
    return (
      <div className="bg-white shadow overflow-x-auto w-full">
        <table className="min-w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-[#c3c7bc] text-gray-900">
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={`py-4 px-4 font-semibold border-b border-b-black ${index !== columns.length - 1 ? 'border-r-3 border-[#D9D9D9] border' : ''} text-${col.align || 'left'}`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr
                key={row[rowKey]}
                className={`${rowIndex % 2 === 0 ? 'bg-[#F3F4F6]' : 'bg-white'}`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key}
                    className={`py-1 px-4 align-middle border-b border-b-[#D9D9D9] ${colIndex !== columns.length - 1 ? 'border-r-3 border-[#D9D9D9]' : ''} text-${col.align || 'left'}`}
                  >
                    <div className={col.align === 'right' ? 'ml-auto w-fit' : col.align === 'center' ? 'mx-auto w-fit' : ''}>
                      {col.render ? col.render(row) : row[col.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
  
        </table>
      </div>
    );
  }
  
  export default Table;
  
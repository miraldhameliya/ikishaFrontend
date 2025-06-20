import React, { useRef, useEffect } from 'react';

function Table({ columns, data, rowKey, loading, onBodyScroll }) {
  const bodyRef = useRef();

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const handler = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollHeight - scrollTop - clientHeight < 20) {
        onBodyScroll(e);
      }
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, [onBodyScroll]);
  
  return (
    <div className="bg-white shadow overflow-x-auto w-full">
      <div
        className="max-h-[400px] overflow-y-auto"
        ref={bodyRef}
      >
        <table className="min-w-full table-fixed border-collapse">
          <thead className="sticky top-0 bg-[#c3c7bc] z-10">
            <tr>
              {columns?.map((col, idx) => (
                <th
                  key={col.key}
                  className={`
                    py-4 px-4 font-semibold border-b border-[#D9D9D9]
                    ${idx < columns.length - 1 ? 'border-r border-[#D9D9D9]' : ''}
                    text-${col.align || 'left'}
                    sticky top-0 bg-[#c3c7bc] z-10
                  `}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  {/* Spinner */}
                </td>
              </tr>
            ) : (
              data?.map((row, i) => (
                <tr
                  key={row[rowKey]}
                  className={i % 2 === 0 ? 'bg-[#F3F4F6]' : 'bg-white'}
                >
                  {columns.map((col, j) => (
                    <td
                      key={col.key}
                      className={`
                        py-1 px-4 border-b border-[#D9D9D9]
                        ${j < columns.length - 1 ? 'border-r border-[#D9D9D9]' : ''}
                        text-${col.align || 'left'}
                      `}
                    >
                      <div className={col.align === 'right' ? 'flex justify-end' : col.align === 'center' ? 'flex justify-center' : ''}>
                        {col.render ? col.render(row) : row[col.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
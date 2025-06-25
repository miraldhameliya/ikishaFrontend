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
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Main Spinner */}
                    {/* <div className="relative">
                      <div className="w-12 h-12 border-4 border-[#c3c7bc] border-t-[#26371e] rounded-full animate-spin"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-[#26371e] rounded-full animate-pulse"></div>
                      </div>
                    </div> */}
                    
                    {/* Loading Text */}
                    <div className="text-gray-600 font-medium">
                      <span className="animate-pulse">Loading</span>
                      <span className="animate-bounce delay-100">.</span>
                      <span className="animate-bounce delay-200">.</span>
                      <span className="animate-bounce delay-300">.</span>
                    </div>
                    
                    {/* Shimmer Effect */}
                    <div className="w-32 h-2 bg-gradient-to-r from-transparent via-[#26371e] to-transparent rounded-full animate-pulse"></div>
                  </div>
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
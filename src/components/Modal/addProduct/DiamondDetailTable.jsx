import React, { useState, useRef, useEffect } from "react";
import SelectIcon from "../../../assets/icon/select.png"; 

const CustomDropdown = ({ value, onChange, options, optionLabel = 'label', optionValue = '_id', placeholder = "Select" }) => {
    console.log(options);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block w-full text-left">
            <button
                type="button"
                className="w-full flex items-center justify-center px-3 bg-white rounded focus:outline-none focus:ring-0 focus:border-transparent"
                onClick={() => setOpen((o) => !o)}
            >
                <span className="mr-1">{value || placeholder}</span>
                <img src={SelectIcon} alt="Select" className="w-3 h-3" />
            </button>
            {open && (
                <div className="absolute z-500 mt-1 w-full bg-white border border-[#94A3B8] rounded shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option[optionValue]}
                            className={`px-3 py-1.5 cursor-pointer hover:bg-gray-100 ${option[optionLabel] === value ? "font-semibold" : ""}`}
                            onClick={() => {
                                onChange(option[optionLabel], option[optionValue]);
                                setOpen(false);
                            }}
                        >
                            {option[optionLabel]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const DiamondDetailRow = ({
    shape = "",
    clarity = "",
    size = "",
    rate = "",
    weight = "",
    totalPrice = "",
    onDelete,
    onShapeChange,
    onClarityChange,
    onSizeChange,
    onRateChange,
    onWeightChange,
    shapeOptions,
    clarityOptions,
    sizeOptions,
}) => {
    const isBlank = !shape && !clarity && !size && !rate && !weight && !totalPrice;
    return (
        <tr className="min-h-[40px] text-[#94A3B8]">
            <td className="w-32 min-h-[40px] border border-[#94A3B8] text-center ">
                <CustomDropdown value={shape} onChange={onShapeChange} options={shapeOptions} optionLabel="shape" optionValue="_id" />
            </td>
            <td className="w-32 min-h-[40px] border border-[#94A3B8] text-center">
                <CustomDropdown value={clarity} onChange={onClarityChange} options={clarityOptions} optionLabel="grade" optionValue="_id" />
            </td>
            <td className="w-24 min-h-[40px] border border-[#94A3B8] text-center">
                <CustomDropdown value={size} onChange={onSizeChange} options={sizeOptions} optionLabel="size" optionValue="_id" />
            </td>
            <td className="w-24 min-h-[40px] border border-[#94A3B8] text-center">
                <input type="text" value={rate} onChange={e => onRateChange(e.target.value)} className="w-full px-1 py-0.5 text-center" />
            </td>
            <td className="w-24 min-h-[40px] border border-[#94A3B8] ">
                <input type="text" value={weight} onChange={e => onWeightChange(e.target.value)} className="w-full px-1 py-0.5 text-center" />
            </td>
            <td className="w-32 min-h-[40px] border border-[#94A3B8] text-center">{totalPrice}</td>
            <td className="text-center w-12 min-h-[40px] border border-[#94A3B8]">
                {!isBlank && (
                    <button className="text-red-500 hover:text-red-700" onClick={onDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </td>
        </tr>
    );
};

const DiamondDetailsTable = ({ activeTab, onTabChange, rows, onDeleteRow, onRowChange, shapeOptions, clarityOptions, sizeOptions }) => {
    // const minRows = 5;
    // const blankRows = Math.max(0, minRows - rows.length);

    // Calculate total of Total Price column (remove commas, parse as number, sum, format with commas)
    const totalPriceSum = rows.reduce((sum, row) => {
        const val = typeof row.totalPrice === 'string' ? Number(row.totalPrice.replace(/,/g, '')) : Number(row.totalPrice);
        return sum + (isNaN(val) ? 0 : val);
    }, 0);
    const formattedTotalPriceSum = totalPriceSum.toLocaleString();

    // Calculate total of Weight column (extract numeric part, sum)
    const weightSum = rows.reduce((sum, row) => {
        if (typeof row.weight === 'string') {
            const match = row.weight.match(/([\d.]+)/);
            const val = match ? parseFloat(match[1]) : 0;
            return sum + (isNaN(val) ? 0 : val);
        }
        return sum + (isNaN(Number(row.weight)) ? 0 : Number(row.weight));
    }, 0);
    const formattedWeightSum = weightSum ? weightSum + ' gm' : '';

    return (
        <div className="border border-[#94A3B8] overflow-hidden">
            {/* Tab Switcher */}
            <div className="text-center font-semibold py-1 border-b border-[#94A3B8] text-[#1E293B] bg-white">
                Diamond Details
            </div>
            <div className="flex bg-white">
                <button
                    className={`flex-1 py-1 text-center font-semibold text-[#1E293B] focus:outline-none ${activeTab === 'Lab-Grown' ? 'border-b-3 border-[#475569]' : 'border-b-4 border-transparent'} transition-all`}
                    onClick={() => onTabChange('Lab-Grown')}
                >
                    Lab-Grown
                </button>
                <button
                    className={`flex-1 py-1 text-center font-semibold text-[#1E293B] focus:outline-none ${activeTab === 'Natural' ? 'border-b-3 border-[#475569]' : 'border-b-4 border-transparent'} transition-all`}
                    onClick={() => onTabChange('Natural')}
                >
                    Natural
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-[#94A3B8]">
                    <thead>
                        <tr></tr>
                        <tr className="text-sm text-gray-500 p-1">
                            <th className="p-1 font-semibold border-r w-32 min-h-[40px] border border-[#94A3B8]">Shape</th>
                            <th className="p-1 font-semibold border-r w-32 min-h-[40px] border border-[#94A3B8]">Clarity</th>
                            <th className="p-1 font-semibold border-r w-24 min-h-[40px] border border-[#94A3B8]">Size</th>
                            <th className="p-1 font-semibold border-r w-24 min-h-[40px] border border-[#94A3B8]">Rate</th>
                            <th className="p-1 font-semibold border-r w-24 min-h-[40px] border border-[#94A3B8]">Weight</th>
                            <th className="p-1 font-semibold border-r w-32 min-h-[40px] border border-[#94A3B8]">Total Price</th>
                            <th className="p-1 font-semibold w-12 min-h-[40px] border border-[#94A3B8]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <DiamondDetailRow
                                key={idx}
                                {...row}
                                onDelete={() => onDeleteRow(idx)}
                                onShapeChange={(val, id) => {
                                    onRowChange(idx, 'shape', val);
                                    onRowChange(idx, 'diamondshapeId', id);
                                }}
                                onClarityChange={(val, id) => {
                                    onRowChange(idx, 'clarity', val);
                                    onRowChange(idx, 'diamondclaritiesId', id);
                                }}
                                onSizeChange={(val, id) => {
                                    onRowChange(idx, 'size', val);
                                    onRowChange(idx, 'sizeid', id);
                                }}
                                onRateChange={val => onRowChange(idx, 'rate', val)}
                                onWeightChange={val => onRowChange(idx, 'weight', val)}
                                shapeOptions={shapeOptions}
                                clarityOptions={clarityOptions}
                                sizeOptions={sizeOptions}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-[#979f93] text-white font-bold min-h-[40px]">
                            <td className="p-1 text-right border border-[#94A3B8]" colSpan="4"></td>
                            <td className="p-1 text-right border border-[#94A3B8]">{formattedWeightSum}</td>
                            <td className="p-1 text-right border border-[#94A3B8]">{formattedTotalPriceSum}</td>
                            <td className="p-1 text-right border border-[#94A3B8]"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default DiamondDetailsTable; 
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from 'react-icons/fa';
import Deleteicon from "../../../assets/icon/delete.png"

// Custom dropdown without Listbox
const CustomDropdown = ({ value, onChange, options, optionLabel = 'label', optionValue = '_id', placeholder = 'Select' }) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);
    const selectedOption = options.find(opt => opt[optionValue] === value) || null;

    useEffect(() => {
        if (!open) return;
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <div className="relative w-full">
            <button
                ref={buttonRef}
                type="button"
                className="text-[#94A3B8] bg-[#F3F4F9] hover:bg-gray-200 focus:outline-none font-medium text-sm px-2 py-1 text-left flex items-center justify-between w-full min-h-[32px]"
                onClick={() => setOpen(o => !o)}
            >
                {selectedOption ? selectedOption[optionLabel] : placeholder}
                <FaChevronDown className="ml-2 text-xs" />
            </button>
            {open && (
                <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-full max-h-40 overflow-auto transition-all border border-gray-300 z-50"
                    style={{ borderColor: '#d1d5db', borderWidth: '1.5px' }}
                >
                    {options.map(option => (
                        <div
                            key={option[optionValue]}
                            className={`block w-full text-left px-4 py-2 cursor-pointer transition-colors ${value === option[optionValue] ? 'bg-gray-100 text-[#303F26] font-bold' : 'text-[#475569] hover:bg-gray-100'}`}
                            onClick={() => {
                                if (value !== option[optionValue]) {
                                    onChange(option[optionValue], option);
                                }
                                setOpen(false);
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <span>{option[optionLabel]}</span>
                                {value === option[optionValue] && (
                                    <span className="text-green-500 ml-2">✓</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
// diamond detail row functinality
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
                <input type="text" value={rate} onChange={e => onRateChange(e.target.value)} className="w-full px-1 py-0.5 text-center focus:outline-none" />
            </td>
            <td className="w-24 min-h-[40px] border border-[#94A3B8] ">
                <input type="text" value={weight} onChange={e => onWeightChange(e.target.value)} className="w-full px-1 py-0.5 text-center focus:outline-none" />
            </td>
            <td className="w-32 min-h-[40px] border border-[#94A3B8] text-center">{totalPrice}</td>
            <td className="text-center lg:w-72  md:w-10 min-h-[40px] border border-[#94A3B8]">
                {!isBlank && (
                    <button className="text-red-500 hover:text-red-700" onClick={onDelete}>
                        <img
                            src={Deleteicon}
                            alt="deleteicon"
                            className="w-4 h-4"
                        />
                    </button>
                )}
            </td>
        </tr>
    );
};
// main component
const DiamondDetailsTable = ({
    activeTab,
    onTabChange,
    rows,
    onDeleteRow,
    onRowChange,
    shapeOptions,
    clarityOptions,
    sizeOptions,
    diamondTypeOptions = []
}) => {
    const totalPriceSum = rows.reduce((sum, row) => {
        let totalPrice = row.totalPrice;
        // Handle both string and number values
        if (typeof totalPrice === 'string') {
            totalPrice = totalPrice.replace(/,/g, '');
        }
        const val = Number(totalPrice || 0);
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
        <div className="border border-[#94A3B8]">
            {/* Tab Switcher */}
            <div className="text-center font-semibold py-1 border-b border-[#94A3B8] text-[#1E293B] bg-white">
                Diamond Details
            </div>
            <div className="flex bg-white gap-3 overflow-auto">
                {diamondTypeOptions.map((diamondType) => (
                    <button
                        key={diamondType?._id}
                        className={`flex-1 py-1 text-center font-normal text-[#475569] hover:text-[#334155] focus:outline-none ${activeTab === diamondType.type ? 'border-b-4 text-[#475569] font-semibold border-[#475569]' : 'border-b-4 border-transparent'} transition-all`}
                        onClick={() => onTabChange(diamondType?.type)}
                    >
                        {diamondType.type}
                    </button>
                ))}
            </div>
            <div>
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
                                onShapeChange={(id) => {
                                    onRowChange(idx, 'shape', id);
                                    onRowChange(idx, 'diamondshapeId', id);
                                }}
                                onClarityChange={(id) => {
                                    onRowChange(idx, 'clarity', id);
                                    onRowChange(idx, 'diamondclaritiesId', id);
                                }}
                                onSizeChange={(id) => {
                                    onRowChange(idx, 'size', id);
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
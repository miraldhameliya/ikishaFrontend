import React, { useState, useRef, useEffect } from 'react';
import Dropdown from "../../../assets/icon/Dropdown.png"

const SimpleDropdown = ({ label, options, value, onChange, displayKey = 'name', placeholder = 'Select...', className = '', multi = false }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // For multi-select, value is an array
    const isSelected = (opt) => {
        if (!multi) return (typeof value === 'object' ? value._id : value) === opt._id;
        return Array.isArray(value) && value.some(v => (typeof v === 'object' ? v._id : v) === opt._id);
    };
    const handleOptionClick = (opt) => {
        if (!multi) {
            onChange(opt);
            setOpen(false);
        } else {
            let newValue = Array.isArray(value) ? [...value] : [];
            const idx = newValue.findIndex(v => (typeof v === 'object' ? v._id : v) === opt._id);
            if (idx > -1) {
                newValue.splice(idx, 1);
            } else {
                newValue.push(opt);
            }
            onChange(newValue);
        }
    };
    const handleRemoveTag = (opt) => {
        if (!multi) {
            onChange('');
        } else {
            let newValue = Array.isArray(value) ? [...value] : [];
            newValue = newValue.filter(v => (typeof v === 'object' ? v._id : v) !== opt._id);
            onChange(newValue);
        }
    };
    return (
        <div className={`relative min-w-[1px] ${className}`} ref={ref}>
            <label className="mb-1 text-sm font-semibold text-[#475569] block">{label}</label>
            <button
                type="button"
                className={`w-full gap-2 px-3 py-2 bg-[#F3F4F9] rounded-lg  flex items-center justify-between text-sm font-normal text-[#94A3B8] hover:bg-gray-200 focus:outline-none ${open ? 'shadow-lg' : ''}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                {multi ? (
                    <div className="flex flex-wrap gap-1 items-center">
                        {Array.isArray(value) && value.length > 0 ? value.map((v, i) => (
                            <span key={i} className="inline-flex  gap-1 items-center bg-[#81C995] text-[#FFFFFF] px-2  text-xs">
                                {typeof v === 'object' ? v[displayKey] : options.find(opt => opt._id === v)?.[displayKey]}
                                <span
                                    className="text-center text-[20px] cursor-pointer text-white hover:text-red-600 focus:outline-none"
                                    onClick={e => { e.stopPropagation(); handleRemoveTag(v); }}
                                    tabIndex={0}
                                    role="button"
                                >×</span>
                            </span>
                        )) : <span className="truncate text-[15px]">{placeholder}</span>}
                    </div>
                ) : (
                    value ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full">
                            {typeof value === 'object' ? value[displayKey] : options.find(opt => opt._id === value)?.[displayKey]}
                        </span>
                    ) : <span className="truncate text-[15px]">{placeholder}</span>
                )}
                {/* <img alt='' className='' /> */}
                <img
                    src={Dropdown}
                    alt="dropdown"
                    className="w-4 h-4"
                />
            </button>
            {open && (
                <div className="absolute z-10 mt-1 w-full min-w-0 max-w-xs bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {options.map((opt) => (
                        <div
                            key={opt._id}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-[#475569] text-base ${isSelected(opt) ? 'font-bold bg-gray-100' : ''}`}
                            onClick={() => handleOptionClick(opt)}
                        >
                            {multi && (
                                <input
                                    type="checkbox"
                                    checked={isSelected(opt)}
                                    readOnly
                                    className="mr-2 text-xl align-middle"
                                />
                            )}
                            {opt[displayKey]}
                            {isSelected(opt) && !multi && (
                                <span className="text-green-500 ml-2">✓</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SimpleDropdown; 
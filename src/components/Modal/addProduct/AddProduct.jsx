import React, { useState, useEffect } from 'react';
import DiamondDetailsTable from './DiamondDetailTable';
import AddOtherCharges from './AddOtherCharges';
import { FaChevronDown } from 'react-icons/fa';
import CreateVariants from './CreateVariants';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProduct, updateProduct } from '../../../redux/services/ProductService';
import { allWOPShape } from '../../../redux/services/diamondShape';
import { allWOPClarity } from '../../../redux/services/diamondClarityservice';
import { allWOPSize } from '../../../redux/services/sizeService';
import { allWopMetal } from '../../../redux/services/metalService';
import { allWopType } from '../../../redux/services/diamondTypeService';
import { allWop } from '../../../redux/services/categoryService';
import select from '../../../assets/icon/Dropdown.png'
const DIAMOND_LABGROWN_KEY = 'diamondRowsLabGrown';
const DIAMOND_NATURAL_KEY = 'diamondRowsNatural';
const OTHERCHARGE_KEY = 'otherChargeRows';

const InputField = ({ label, placeholder, value, onChange, ...props }) => (
    <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-[#334155]">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            className="px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800"
            value={value}
            onChange={onChange}
            {...props}
        />
    </div>
);

// Minimal FilterSelect for this file
const FilterSelect = ({ label, value, onClear, onDropdown, options, isOpen, onSelect }) => (
    <div className="flex flex-col min-w-[180px] relative">
        <span className="text-xs font-semibold text-[#4B5563] mb-1">{label}</span>
        <div className="flex items-center bg-[#f5f7fa] rounded-md px-2 py-1 relative">
            {value && (
                <span className="bg-green-300 text-white text-xs rounded px-2 py-0.5 flex items-center mr-2">
                    {value}
                    <button
                        className="ml-1 text-white hover:text-gray-200"
                        onClick={onClear}
                        type="button"
                    >
                        ×
                    </button>
                </span>
            )}
            <button
                className="ml-auto text-gray-400 hover:text-gray-600"
                onClick={onDropdown}
                type="button"
            >
                <FaChevronDown size={14} />
            </button>
        </div>
        {isOpen && (
            <div className="absolute top-full mt-1 w-full bg-white border rounded shadow-lg z-10">
                {options.map(option => (
                    <div
                        key={option._id}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelect(option)}
                    >
                        {option.grade}
                    </div>
                ))}
            </div>
        )}
    </div>
);

const AddProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editingProduct = location.state?.product || null;

    // Example: main form state (add all fields you need)
    const [formState, setFormState] = useState(() => editingProduct ? {
        designNo: editingProduct.design_code || '',
        labelNo: editingProduct.label_no || '',
        gwt: editingProduct.gwt || '',
        dwt: editingProduct.dwt || '',
        owt: editingProduct.owt || '',
        nwt: editingProduct.nwt || '',
        labourPricePerGm: editingProduct.labourPricePerGm || '',
        labourPrice: editingProduct.labourPrice || '',
        otherPrice: editingProduct.otherPrice || '',
        totalAmount: editingProduct.totalAmount || '',
    } : {
        designNo: '',
        labelNo: '',
        gwt: '',
        dwt: '',
        owt: '',
        nwt: '',
        labourPricePerGm: '',
        labourPrice: '',
        otherPrice: '',
        totalAmount: '',
    });

    // Draft (editable) state
    const [draftLabGrownRows, setDraftLabGrownRows] = useState([]);
    const [draftNaturalRows, setDraftNaturalRows] = useState([]);
    const [draftOtherChargeRows, setDraftOtherChargeRows] = useState([]);
    // Filter states for the new UI
    const [diamondType, setDiamondType] = useState('Lab-Grown');
    const [diamondClarity, setDiamondClarity] = useState('VVS');
    const [metalType, setMetalType] = useState('18KT');
    const [activeTab, setActiveTab] = useState('Lab-Grown');
    const [shapeOptions, setShapeOptions] = useState([]);
    const [clarityOptions, setClarityOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [diamondTypeOptions, setDiamondTypeOptions] = useState([]);
    const [metalTypeOptions, setMetalTypeOptions] = useState([]);
    // Dropdown open states
    const [isDiamondTypeOpen, setDiamondTypeOpen] = useState(false);
    const [isClarityOpen, setClarityOpen] = useState(false);
    const [isMetalTypeOpen, setMetalTypeOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories for dropdown
                const res = await allWop({ search: '' });
                if (res && res.Data) {
                    setCategoryOptions(res.Data);
                    console.log("Category options:", res.Data);
                }
                // Fetch Shapes for table
                const shapeData = await allWOPShape({ search: '' });
                if (shapeData && shapeData.Data) setShapeOptions(shapeData.Data);
                // Fetch Clarities for table and filter
                const clarityData = await allWOPClarity({ search: '' });
                console.log(clarityData);
                if (clarityData && clarityData.Data) {
                    setClarityOptions(clarityData.Data);
                }
                // Fetch Sizes for table
                const sizeData = await allWOPSize({ search: '' });
                if (sizeData && sizeData.Data) setSizeOptions(sizeData.Data);
                // Fetch Diamond Types for filter
                const typeData = await allWopType({ search: '' });
                if (typeData && typeData.Data) setDiamondTypeOptions(typeData.Data);
                // Fetch Metal Types for filter
                const metalData = await allWopMetal({ search: '' });
                if (metalData && metalData.Data) setMetalTypeOptions(metalData.Data);
            } catch (err) {
                console.error("Failed to fetch diamond details", err);
            }
        };
        fetchData();
    }, []);

    const calculateTotalPrice = (rows) => {
        return rows.reduce((sum, row) => {
            const num = parseFloat((row.totalPrice || '').replace(/,/g, ''));
            return sum + (isNaN(num) ? 0 : num);
        }, 0);
    };

    const activeDiamondRows = activeTab === 'Lab-Grown' ? draftLabGrownRows : draftNaturalRows;
    const totalDiamondPrice = calculateTotalPrice(activeDiamondRows);


    // Diamond Table logic
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        let diamondtypeId = '';
        if (tab === 'Lab-Grown') {
            const found = diamondTypeOptions.find(opt => opt.type === 'Lab-Grown');
            diamondtypeId = found?._id || '';
            setDraftLabGrownRows(rows => rows.map(row => ({ ...row, diamondtypeId })));
        } else {
            const found = diamondTypeOptions.find(opt => opt.type === 'Natural');
            diamondtypeId = found?._id || '';
            setDraftNaturalRows(rows => rows.map(row => ({ ...row, diamondtypeId })));
        }
    };
    const handleAddDiamondRow = () => {
        let diamondtypeId = '';
        if (activeTab === 'Lab-Grown') {
            const found = diamondTypeOptions.find(opt => opt.type === 'Lab-Grown');
            diamondtypeId = found?._id || '';
            setDraftLabGrownRows([
                ...draftLabGrownRows,
                { shape: '', clarity: '', size: '', rate: '', weight: '', totalPrice: '', diamondtypeId }
            ]);
        } else {
            const found = diamondTypeOptions.find(opt => opt.type === 'Natural');
            diamondtypeId = found?._id || '';
            setDraftNaturalRows([
                ...draftNaturalRows,
                { shape: '', clarity: '', size: '', rate: '', weight: '', totalPrice: '', diamondtypeId }
            ]);
        }
    };
    const handleDeleteDiamondRow = (idx) => {
        if (activeTab === 'Lab-Grown') {
            setDraftLabGrownRows(draftLabGrownRows.filter((_, i) => i !== idx));
        } else {
            setDraftNaturalRows(draftNaturalRows.filter((_, i) => i !== idx));
        }
    };
    const handleDiamondRowChange = (idx, field, value) => {
        const updateRows = (rows) => rows.map((row, i) => {
            if (i !== idx) return row;
            const updated = { ...row, [field]: value };
            let rate = updated.rate;
            let weight = updated.weight;
            const rateNum = parseFloat(rate);
            const weightNum = weight ? parseFloat((weight + '').replace(/[^\d.]/g, '')) : NaN;
            if ((field === 'rate' || field === 'weight') && !isNaN(rateNum) && !isNaN(weightNum)) {
                const total = rateNum * weightNum;
                updated.totalPrice = total ? total.toLocaleString() : '';
            } else if (field === 'rate' || field === 'weight') {
                updated.totalPrice = '';
            }
            return updated;
        });
        if (activeTab === 'Lab-Grown') {
            setDraftLabGrownRows(updateRows);
        } else {
            setDraftNaturalRows(updateRows);
        }
    };

    // Other Charges Table logic
    const handleAddOtherChargeRow = () => {
        setDraftOtherChargeRows([...draftOtherChargeRows, { product: '', weight: '', amount: '' }]);
    };

    // Auto-calculate nwt, labourPrice, otherPrice
    useEffect(() => {
        const gwt = parseFloat(formState.gwt) || 0;
        const dwt = parseFloat(formState.dwt) || 0;
        const owt = parseFloat(formState.owt) || 0;
        const nwt = gwt - dwt - owt;
        const labourPricePerGm = parseFloat(formState.labourPricePerGm) || 0;
        const labourPrice = nwt * labourPricePerGm;
        // Calculate otherPrice from draftOtherChargeRows
        const otherPrice = draftOtherChargeRows.reduce((sum, row) => {
            const num = parseFloat((row.amount || '').replace(/,/g, ''));
            return sum + (isNaN(num) ? 0 : num);
        }, 0);
        setFormState(prev => ({
            ...prev,
            nwt: nwt ? nwt.toFixed(2) : '',
            labourPrice: labourPrice ? labourPrice.toFixed(2) : '',
            otherPrice: otherPrice ? otherPrice.toFixed(2) : '',
        }));
    }, [formState.gwt, formState.dwt, formState.owt, formState.labourPricePerGm, draftOtherChargeRows]);

    // Image upload handler (placeholder logic)
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        // TODO: Replace this with your actual upload logic (e.g., Cloudinary, server, etc.)
        // For now, just use local object URLs for preview (not for production)
        setUploading(true);
        try {
            // Simulate upload and get URLs
            const urls = files.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...urls]);
        } finally {
            setUploading(false);
        }
    };
    const handleRemoveImage = (idx) => {
        setImages(imgs => imgs.filter((_, i) => i !== idx));
    };

    // Save/Cancel logic
    const handleSave = async () => {
        try {
            const diamond_details = [
                ...draftLabGrownRows.map(row => ({
                    // ...row,
                    diamondtypeId: row.diamondtypeId || '',
                    diamondshapeId: row.diamondshapeId || '',
                    diamondclaritiesId: row.diamondclaritiesId || '',
                    sizeid: row.sizeid || '',
                    rate: row.rate,
                    weight: row.weight,
                    price: row.totalPrice?.toString().replace(/,/g, '') || '0',
                })),
                ...draftNaturalRows.map(row => ({
                    // ...row,
                    diamondtypeId: row.diamondtypeId || '',
                    diamondshapeId: row.diamondshapeId || '',
                    diamondclaritiesId: row.diamondclaritiesId || '',
                    sizeid: row.sizeid || '',
                    rate: row.rate,
                    weight: row.weight,
                    price: row.totalPrice?.toString().replace(/,/g, '') || '0',
                })),
            ];
            // Build other_charges array
            const other_charges = draftOtherChargeRows.map(row => ({
                product: row.product,
                weight: row.weight,
                amount: parseFloat((row.amount || '').replace(/,/g, '')) || 0,
            }));
            // Build images array (only selected images)
            const imagesArr = images.map(url => ({ url }));
            // Map formState to backend keys
            const payload = {
                productId: '', // If editing, set the product ID
                categoryid: formState.category, // TODO: Set category ID from selection
                label_code: formState.labelNo,
                design_code: formState.designNo,
                laboureprice: parseFloat(formState.labourPrice) || 0,
                otherprice: parseFloat(formState.otherPrice) || 0,
                totalamount: parseFloat(formState.totalAmount) || 0,
                laboureprice_gm: parseFloat(formState.labourPricePerGm) || 0,
                g_wt: formState.gwt,
                n_wt: formState.nwt,
                d_wt: formState.dwt,
                o_wt: formState.owt,
                images: imagesArr,
                diamond_details,
                other_charges,
            };
            if (editingProduct) {
                payload.productId = editingProduct._id;
                await updateProduct(payload);
            } else {
                await addProduct(payload);
            }
            navigate('/product');
        } catch (error) {
            console.error("Failed to save product", error);
        }
    };
    const handleCancel = () => {
        setDraftLabGrownRows([]);
        setDraftNaturalRows([]);
        setDraftOtherChargeRows([]);
    };

    return (
        <div className="p-3 bg-[#eff0f5] min-h-screen">
            <div className="bg-white p-3 rounded-lg shadow-lg">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Product Details</h2>
                        <div className="mb-8 space-y-6 text-[#334155]">
                            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"> */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6  ">
                                <div className="relative flex flex-col">
                                    <label className="mb-1 text-sm font-semibold text-[#334155]">Category</label>
                                    <select
                                        className="appearance-none px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800"
                                        value={formState.category}
                                        onChange={e => setFormState(f => ({ ...f, category: e.target.value }))}
                                        style={{ background: 'none' }}
                                    >
                                        <option value="">Select Category</option>
                                        {categoryOptions.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.categoryname}</option>
                                        ))}
                                    </select>
                                    <img
                                        src={select} 
                                        alt="Dropdown"
                                        className="w-4 h-4 absolute right-3 top-9 pointer-events-none"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                                <InputField label="Laboure Price/gm" placeholder="Enter price/gm" value={formState.labourPricePerGm} onChange={e => setFormState(f => ({ ...f, labourPricePerGm: e.target.value }))} />
                                <InputField label="Laboure Price" placeholder="Auto" value={formState.labourPrice} readOnly />
                                <InputField label="Other Price" placeholder="Auto" value={formState.otherPrice} readOnly />
                                {/* <InputField label="Total Amount" placeholder="Enter price" value={formState.totalAmount} onChange={e => setFormState(f => ({ ...f, totalAmount: e.target.value }))} /> */}

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Design No." placeholder="Enter design no" value={formState.designNo} onChange={e => setFormState(f => ({ ...f, designNo: e.target.value }))} />
                                <InputField label="G. WT" placeholder="Enter weight" value={formState.gwt} onChange={e => setFormState(f => ({ ...f, gwt: e.target.value }))} />
                                <InputField label="D. WT" placeholder="Enter weight" value={formState.dwt} onChange={e => setFormState(f => ({ ...f, dwt: e.target.value }))} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Label No." placeholder="Enter label no" value={formState.labelNo} onChange={e => setFormState(f => ({ ...f, labelNo: e.target.value }))} />
                                <InputField label="N. WT" placeholder="Auto" value={formState.nwt} readOnly />
                                <InputField label="O. WT" placeholder="Enter weight" value={formState.owt} onChange={e => setFormState(f => ({ ...f, owt: e.target.value }))} />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div>
                                <div className="flex justify-end items-center mb-4">
                                    <button className="bg-[#303f26] text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-900 flex items-center gap-1" onClick={handleAddDiamondRow}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add
                                    </button>
                                </div>
                                <DiamondDetailsTable
                                    activeTab={activeTab}
                                    onTabChange={handleTabChange}
                                    rows={activeTab === 'Lab-Grown' ? draftLabGrownRows : draftNaturalRows}
                                    onDeleteRow={handleDeleteDiamondRow}
                                    onRowChange={handleDiamondRowChange}
                                    shapeOptions={shapeOptions}
                                    clarityOptions={clarityOptions}
                                    sizeOptions={sizeOptions}
                                />
                            </div>
                            <div>
                                <div className="flex justify-end items-center mb-4">
                                    <button
                                        className="bg-[#303f26] text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-900 flex items-center gap-1"
                                        onClick={handleAddOtherChargeRow}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add
                                    </button>
                                </div>
                                <AddOtherCharges
                                    rows={draftOtherChargeRows}
                                    setRows={setDraftOtherChargeRows}
                                />
                            </div>
                            {/* <div className="flex justify-end gap-4">
                                <button className="px-6 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold" onClick={handleCancel}>Cancel</button>
                                <button className="px-6 py-2 rounded-md text-white bg-green-900 hover:bg-green-800 font-semibold" onClick={handleSave}>Save</button>
                            </div> */}
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="flex-1 flex flex-col gap-7">

                        <div className="mb-6">
                            <div className="flex justify-end gap-4">
                                <button className="px-6 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold" onClick={handleCancel}>Cancel</button>
                                <button className="px-6 py-2 rounded-md text-white bg-green-900 hover:bg-green-800 font-semibold" onClick={handleSave} disabled={uploading}>Save</button>
                            </div>
                            <label className="mb-2 block text-sm font-semibold text-gray-600">Upload Image</label>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-2 overflow-x-auto border-2 border-dashed border-gray-400 rounded-lg p-2" style={{ borderStyle: 'dashed' }}>
                                    {images.map((img, i) => (
                                        <div key={i} className="relative flex-shrink-0">
                                            <img src={img} alt="upload-preview" className="w-28 h-30 object-cover rounded-md" />
                                            <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -mr-1 -mt-1" onClick={() => handleRemoveImage(i)}>X</button>
                                        </div>
                                    ))}
                                    <label className="w-30 h-30 flex-shrink-0 border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <span className="text-xs">Upload file</span>
                                        <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImageChange} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-4">
                            <FilterSelect
                                label="Diamond Type"
                                value={diamondType}
                                onClear={() => setDiamondType('')}
                                onDropdown={() => setDiamondTypeOpen(!isDiamondTypeOpen)}
                                isOpen={isDiamondTypeOpen}
                                options={diamondTypeOptions}
                                onSelect={(option) => {
                                    setDiamondType(option);
                                    setDiamondTypeOpen(false);
                                }}
                            />
                            <FilterSelect
                                label="Diamond Clarity"
                                value={diamondClarity}
                                onClear={() => setDiamondClarity('')}
                                onDropdown={() => setClarityOpen(!isClarityOpen)}
                                isOpen={isClarityOpen}
                                options={clarityOptions}
                                onSelect={(option) => {
                                    setDiamondClarity(option);
                                    setClarityOpen(false);
                                }}
                            />
                            <FilterSelect
                                label="Metal Type"
                                value={metalType}
                                onClear={() => setMetalType('')}
                                onDropdown={() => setMetalTypeOpen(!isMetalTypeOpen)}
                                isOpen={isMetalTypeOpen}
                                options={metalTypeOptions}
                                onSelect={(option) => {
                                    setMetalType(option);
                                    setMetalTypeOpen(false);
                                }}
                            />
                        </div>
                        <div>
                            <CreateVariants
                                diamondType={diamondType}
                                diamondClarity={diamondClarity}
                                metalType={metalType}
                                diamondPrice={totalDiamondPrice}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct; 
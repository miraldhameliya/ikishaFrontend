import React, { useState, useEffect, useRef } from 'react';
import DiamondDetailsTable from './DiamondDetailTable';
import AddOtherCharges from './AddOtherCharges';
import { FaChevronDown } from 'react-icons/fa';
import CreateVariants from './CreateVariants';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProduct, updateProduct, uploadImagesProduct } from '../../../redux/services/ProductService';
import { allWOPShape } from '../../../redux/services/diamondShape';
import { allWOPClarity } from '../../../redux/services/diamondClarityservice';
import { allWOPSize } from '../../../redux/services/sizeService';
import { allWopMetal } from '../../../redux/services/metalService';
import { allWopType } from '../../../redux/services/diamondTypeService';
import { allWop } from '../../../redux/services/categoryService';
import SimpleDropdown from './SimpleDropdown';

const InputField = ({ label, placeholder, value, onChange, ...props }) => (
    <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-[#475569]">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            className="px-4 py-2 rounded-md focus:outline-gray-300 bg-[#F3F4F9] "
            value={value}
            onChange={onChange}
            {...props}
        />
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
        category: editingProduct.categoryid || '',
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
        category: '',
    });

    // Draft (editable) state
    const [diamondRows, setDiamondRows] = useState({});
    const [draftOtherChargeRows, setDraftOtherChargeRows] = useState([]);
    // Filter states for the new UI
    const [diamondTypes, setDiamondTypes] = useState([]);
    const [diamondClarities, setDiamondClarities] = useState([]);
    const [metalTypes, setMetalTypes] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [shapeOptions, setShapeOptions] = useState([]);
    const [clarityOptions, setClarityOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [diamondTypeOptions, setDiamondTypeOptions] = useState([]);
    const [metalTypeOptions, setMetalTypeOptions] = useState([]);
    const [isDiamondTypeOpen, setDiamondTypeOpen] = useState(false);
    const [isClarityOpen, setClarityOpen] = useState(false);
    const [isMetalTypeOpen, setMetalTypeOpen] = useState(false);
    const [images, setImages] = useState(editingProduct?.images?.map(img => img.url) || []);
    const [uploading, setUploading] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [variants, setVariants] = useState([]);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({});

    // Auto-fill dropdowns and arrays from editingProduct
    useEffect(() => {
        if (editingProduct) {
            // Diamond Types
            if (editingProduct.diamond_type) {
                setDiamondTypes(editingProduct.diamond_type);
            }
            // Diamond Clarities
            if (editingProduct.diamond_clarity) {
                setDiamondClarities(editingProduct.diamond_clarity);
            }
            // Metal Types
            if (editingProduct.metal_type) {
                setMetalTypes(editingProduct.metal_type);
            }
            // Images
            if (editingProduct.images) {
                setImages(editingProduct.images.map(img => img.url));
            }
            // Variants
            if (editingProduct.varient) {
                setVariants(editingProduct.varient);
            }
            // Diamond Rows (diamond_details)
            if (editingProduct.diamond_details) {
                // Group diamond_details by diamondtypeId for tabs
                const grouped = {};
                editingProduct.diamond_details.forEach(row => {
                    const typeKey = row.diamondtypeId?._id || row.diamondtypeId || '';
                    if (!grouped[typeKey]) grouped[typeKey] = [];
                    grouped[typeKey].push({
                        ...row,
                        diamondtypeId: row.diamondtypeId?._id || row.diamondtypeId || '',
                        diamondshapeId: row.diamondshapeId?._id || row.diamondshapeId || '',
                        diamondclaritiesId: row.diamondclaritiesId?._id || row.diamondclaritiesId || '',
                        sizeid: row.sizeid?._id || row.sizeid || '',
                    });
                });
                setDiamondRows(grouped);
            }
            // Other Charges
            if (editingProduct.other_charges) {
                setDraftOtherChargeRows(editingProduct.other_charges);
            }
        }
    }, [editingProduct]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories for dropdown
                const res = await allWop({ search: '' });
                if (res && res.Data) {
                    setCategoryOptions(res.Data);
                    // console.log("Category options:", res.Data);
                }
                // Fetch Shapes for table
                const shapeData = await allWOPShape({ search: '' });
                if (shapeData && shapeData.Data) setShapeOptions(shapeData.Data);
                // Fetch Clarities for table and filter
                const clarityData = await allWOPClarity({ search: '' });
                // console.log(clarityData);
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
                // console.error("Failed to fetch diamond details", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (diamondTypeOptions.length > 0 && !activeTab) {
            setActiveTab(diamondTypeOptions[0].type);
        }
        // eslint-disable-next-line
    }, [diamondTypeOptions, activeTab]);

    useEffect(() => {
        setDiamondRows(prev => {
            let changed = false;
            const newRows = { ...prev };
            diamondTypeOptions.forEach(type => {
                if (!newRows[type.type]) {
                    newRows[type.type] = [];
                    changed = true;
                }
            });
            // Only update if something actually changed
            return changed ? newRows : prev;
        });
    }, [diamondTypeOptions]);

    const calculateTotalPrice = (rows) => {
        return rows.reduce((sum, row) => {
            const num = parseFloat((row.totalPrice || '').replace(/,/g, ''));
            return sum + (isNaN(num) ? 0 : num);
        }, 0);
    };

    const activeDiamondRows = diamondRows[activeTab] || [];
    const totalDiamondPrice = calculateTotalPrice(activeDiamondRows);

    // Calculate total price for each diamond type tab
    const diamondPriceMap = {};
    diamondTypeOptions.forEach(type => {
        const rows = diamondRows[type.type] || [];
        diamondPriceMap[type._id] = calculateTotalPrice(rows);
    });

    // Diamond Table logic
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleAddDiamondRow = () => {
        const found = diamondTypeOptions.find(opt => opt.type === activeTab);
        const diamondtypeId = found?._id || '';
        setDiamondRows(prev => ({
            ...prev,
            [activeTab]: [...(prev[activeTab] || []), { shape: '', clarity: '', size: '', rate: '', weight: '', totalPrice: '', diamondtypeId }]
        }));
    };

    const handleDeleteDiamondRow = (idx) => {
        setDiamondRows(prev => ({
            ...prev,
            [activeTab]: prev[activeTab].filter((_, i) => i !== idx)
        }));
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
        setDiamondRows(prev => ({
            ...prev,
            [activeTab]: updateRows(prev[activeTab] || [])
        }));
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
            let amount = row.amount;
            if (typeof amount === 'string') {
                amount = amount.replace(/,/g, '');
            }
            const num = parseFloat(amount || 0);
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
        setUploading(true);
        try {
            // Use the uploadImages helper function
            const urls = await uploadImages(files);
            setImages(prev => [...prev, ...urls]);
        } finally {
            setUploading(false);
        }
    };
    const handleRemoveImage = (idx) => {
        setImages(imgs => imgs.filter((_, i) => i !== idx));
    };

    // Save/Cancel logic
    const validateForm = () => {
        const newErrors = {};
        if (!formState.category) newErrors.category = 'Category is required';
        if (!formState.designNo) newErrors.designNo = 'Design No. is required';
        if (!formState.labelNo) newErrors.labelNo = 'Label No. is required';
        if (!formState.gwt) newErrors.gwt = 'Gross Weight is required';
        if (!formState.dwt) newErrors.dwt = 'Diamond Weight is required';
        if (!formState.owt) newErrors.owt = 'Other Weight is required';
        if (!formState.labourPricePerGm) newErrors.labourPricePerGm = 'Labour Price/gm is required';
        // Add more validations as needed
        return newErrors;
    };

    const handleSave = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            const diamond_details = Object.entries(diamondRows)
                .flatMap(([tab, rows]) =>
                    rows.map(row => ({
                        diamondtypeId: typeof row.diamondtypeId === "object" ? row.diamondtypeId._id : row.diamondtypeId || '',
                        diamondshapeId: row.diamondshapeId || '',
                        diamondclaritiesId: typeof row.clarity === "object" ? row.clarity._id : row.diamondclaritiesId || '',
                        sizeid: row.sizeid || '',
                        rate: row.rate,
                        weight: row.weight,
                        price: row.totalPrice?.toString().replace(/,/g, '') || '0',
                    }))
                );
            // Build other_charges array
            const other_charges = draftOtherChargeRows.map(row => ({
                product: row.product,
                weight: row.weight,
                amount: parseFloat((row.amount || '').replace(/,/g, '')) || 0,
            }));
            // Build images array (only selected images)
            const imagesArr = images.map(url => ({ url }));
            // Collect diamond_type, diamond_clarity, metal_type as arrays (single selection)
            const diamondTypeIds = diamondTypes.map(type => typeof type === "object" ? type._id : type);
            const diamondClarityIds = diamondClarities.map(clarity => typeof clarity === "object" ? clarity._id : clarity);
            const metalTypeIds = metalTypes.map(type => typeof type === "object" ? type._id : type);
            // Calculate varientprice for each variant
            const labourPriceNum = parseFloat(formState.labourPrice) || 0;
            const otherPriceNum = parseFloat(formState.otherPrice) || 0;
            const variantsWithPrice = variants.map(v => {
                const metalPriceNum = parseFloat(v.metalprice) || 0;
                const diamondPriceNum = parseFloat(v.diamondprice) || 0;
                return {
                    ...v,
                    varientprice: (labourPriceNum + otherPriceNum + metalPriceNum + diamondPriceNum).toFixed(2)
                };
            });
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
                diamond_type: diamondTypeIds,
                diamond_clarity: diamondClarityIds,
                metal_type: metalTypeIds,
                varient: variantsWithPrice,
            };
            if (editingProduct) {
                payload.productId = editingProduct._id;
                await updateProduct(payload);
            } else {
                await addProduct(payload);
            }
            navigate('/product');
        } catch (error) {
            // console.error("Failed to save product", error);
        }
    };
    const handleCancel = () => {
        setDiamondRows({});
        setDraftOtherChargeRows([]);
    };

    const uploadImages = async (files) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('image', file);
        });
        const res = await uploadImagesProduct(formData);
        // console.log("res", res);
        // Extract URLs from the images array
        return (res.Data.images || []).map(img => img.url);
    };
    // console.log("diamondType", diamondType);
    // console.log("diamondClarity", diamondClarity);
    // console.log("metalType", metalType);
    // console.log("totalDiamondPrice", totalDiamondPrice);
    return (
        <div className="p-5 bg-[#eff0f5] min-h-screen">
            <div className="bg-white p-3 rounded-lg ">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-xl font-bold mb-8 mt-5 text-gray-800">Product Details</h2>
                        <div className="mb-8 space-y-6 text-[#334155]">
                            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"> */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="relative flex flex-col">
                                    {/* <label className="mb-1 text-sm font-semibold text-[#475569]">Category</label> */}
                                    <SimpleDropdown
                                        label="Category"
                                        options={categoryOptions}
                                        value={formState.category}
                                        onChange={cat => setFormState(f => ({ ...f, category: cat._id }))}
                                        displayKey="categoryname"
                                        placeholder="Select Category"
                                        // className='text-lg'
                                    />
                                    {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                                </div>
                                <InputField label="Laboure Price/gm" placeholder="Enter price/gm" value={formState.labourPricePerGm} onChange={e => setFormState(f => ({ ...f, labourPricePerGm: e.target.value }))} />
                                {errors.labourPricePerGm && <div className="text-red-500 text-xs mt-1">{errors.labourPricePerGm}</div>}
                                <InputField label="Laboure Price" placeholder="Auto" value={formState.labourPrice} readOnly />
                                <InputField label="Other Price" placeholder="Auto" value={formState.otherPrice} readOnly />
                                {/* <InputField label="Total Amount" placeholder="Enter price" value={formState.totalAmount} onChange={e => setFormState(f => ({ ...f, totalAmount: e.target.value }))} /> */}

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Design No." placeholder="Enter design no" value={formState.designNo} onChange={e => setFormState(f => ({ ...f, designNo: e.target.value }))} />
                                {errors.designNo && <div className="text-red-500 text-xs mt-1">{errors.designNo}</div>}
                                <InputField label="G. WT" placeholder="Enter weight" value={formState.gwt} onChange={e => setFormState(f => ({ ...f, gwt: e.target.value }))} />
                                {errors.gwt && <div className="text-red-500 text-xs mt-1">{errors.gwt}</div>}
                                <InputField label="D. WT" placeholder="Enter weight" value={formState.dwt} onChange={e => setFormState(f => ({ ...f, dwt: e.target.value }))} />
                                {errors.dwt && <div className="text-red-500 text-xs mt-1">{errors.dwt}</div>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Label No." placeholder="Enter label no" value={formState.labelNo} onChange={e => setFormState(f => ({ ...f, labelNo: e.target.value }))} />
                                {errors.labelNo && <div className="text-red-500 text-xs mt-1">{errors.labelNo}</div>}
                                <InputField label="N. WT" placeholder="Auto" value={formState.nwt} readOnly />
                                <InputField label="O. WT" placeholder="Enter weight" value={formState.owt} onChange={e => setFormState(f => ({ ...f, owt: e.target.value }))} />
                                {errors.owt && <div className="text-red-500 text-xs mt-1">{errors.owt}</div>}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div>
                                <div className="flex justify-end items-center mb-4">
                                    <button className="bg-[#303f26] text-white px-3 py-1 text-sm font-semibold flex items-center gap-1" onClick={handleAddDiamondRow}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add
                                    </button>
                                </div>
                                <DiamondDetailsTable
                                    activeTab={activeTab}
                                    onTabChange={handleTabChange}
                                    rows={activeDiamondRows}
                                    onDeleteRow={handleDeleteDiamondRow}
                                    onRowChange={handleDiamondRowChange}
                                    shapeOptions={shapeOptions}
                                    clarityOptions={clarityOptions}
                                    sizeOptions={sizeOptions}
                                    diamondTypeOptions={diamondTypeOptions}
                                />
                            </div>
                            <div>
                                <div className="flex justify-end items-center mb-4">
                                    <button
                                        className="bg-[#303f26] text-white px-3 py-1 text-sm font-semibold flex items-center gap-1"
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
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-7">

                        <div className="mb-8 mt-8">
                            <div className="flex justify-end gap-4">
                                <button className="px-6 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold" onClick={handleCancel}>Cancel</button>
                                <button className="px-6 py-2 rounded-md text-white bg-[#303F26] font-semibold" onClick={handleSave} disabled={uploading}>Save</button>
                            </div>
                            <label className="mb-2 block text-sm font-semibold text-[#475569]">Upload Image</label>
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
                            <SimpleDropdown
                                label="Diamond Type"
                                options={diamondTypeOptions}
                                value={diamondTypes}
                                onChange={setDiamondTypes}
                                displayKey="type"
                                placeholder="Select Diamond Type"
                                multi={true}
                            />
                            <SimpleDropdown
                                label="Diamond Clarity"
                                options={clarityOptions}
                                value={diamondClarities}
                                onChange={setDiamondClarities}
                                displayKey="grade"
                                placeholder="Select Clarity"
                                multi={true}
                            />
                            <SimpleDropdown
                                label="Metal Type"
                                options={metalTypeOptions}
                                value={metalTypes}
                                onChange={setMetalTypes}
                                displayKey="name"
                                placeholder="Select Metal Type"
                                multi={true}
                            />
                        </div>
                        <div>
                            <CreateVariants
                                diamondTypes={diamondTypes}
                                diamondClarities={diamondClarities}
                                metalTypes={metalTypes}
                                diamondPriceMap={diamondPriceMap}
                                variants={variants}
                                setVariants={setVariants}
                                labourPrice={formState.labourPrice}
                                otherPrice={formState.otherPrice}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>test</div>
    );
};

export default AddProduct; 
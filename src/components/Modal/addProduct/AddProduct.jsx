import React, { useState, useEffect } from 'react';
import DiamondDetailsTable from './DiamondDetailTable';
import AddOtherCharges from './AddOtherCharges';
import CreateVariants from './CreateVariants';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProduct, uploadImagesProduct } from '../../../redux/services/ProductService';
import { allWOPShape } from '../../../redux/services/diamondShape';
import { allWOPClarity } from '../../../redux/services/diamondClarityservice';
import { allWOPSize } from '../../../redux/services/sizeService';
import { allWopMetal } from '../../../redux/services/metalService';
import { allWopType } from '../../../redux/services/diamondTypeService';
import { allWop } from '../../../redux/services/categoryService';
import SimpleDropdown from './SimpleDropdown';


const InputField = ({ label, placeholder, value, onChange, ...props }) => (
    <div className="flex flex-col">
        <label className="mb-1 text-sm font-bold text-[#475569]">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            className="px-4 py-2 rounded-md  focus:outline-gray-300 bg-[#F3F4F9] "
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
        labelNo: editingProduct.label_code || '',
        gwt: editingProduct.g_wt || '',
        dwt: editingProduct.d_wt || '',
        owt: editingProduct.o_wt || '',
        nwt: editingProduct.n_wt || '',
        labourPricePerGm: editingProduct.laboureprice_gm || '',
        labourPrice: editingProduct.laboureprice || '',
        otherPrice: editingProduct.otherprice || '',
        totalAmount: editingProduct.totalamount || '',
        category: editingProduct.categoryid?._id || editingProduct.categoryid || '',
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
    const [images, setImages] = useState(editingProduct?.images?.map(img => img.url) || []);
    const [uploading, setUploading] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [variants, setVariants] = useState([]);
    const [errors, setErrors] = useState({});

    // Auto-fill dropdowns and arrays from editingProduct
    useEffect(() => {
        if (editingProduct) {
            // Update form state with API data
            setFormState({
                designNo: editingProduct.design_code || '',
                labelNo: editingProduct.label_code || '',
                gwt: editingProduct.g_wt || '',
                dwt: editingProduct.d_wt || '',
                owt: editingProduct.o_wt || '',
                nwt: editingProduct.n_wt || '',
                labourPricePerGm: editingProduct.laboureprice_gm || '',
                labourPrice: editingProduct.laboureprice || '',
                otherPrice: editingProduct.otherprice || '',
                totalAmount: editingProduct.totalamount || '',
                category: editingProduct.categoryid?._id || editingProduct.categoryid || '',
            });

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
                    // Use the diamond type name (like "Natural", "Lab-Grown") as the key
                    const typeName = row.diamondtypeId?.type || '';
                    if (!grouped[typeName]) grouped[typeName] = [];
                    grouped[typeName].push({
                        ...row,
                        diamondtypeId: row.diamondtypeId?._id || row.diamondtypeId || '',
                        diamondshapeId: row.diamondshapeId?._id || row.diamondshapeId || '',
                        diamondclaritiesId: row.diamondclaritiesId?._id || row.diamondclaritiesId || '',
                        sizeid: row.sizeid?._id || row.sizeid || '',
                        // Set the display values for the table
                        shape: row.diamondshapeId?._id || row.diamondshapeId || '',
                        clarity: row.diamondclaritiesId?._id || row.diamondclaritiesId || '',
                        size: row.sizeid?._id || row.sizeid || '',
                        rate: row.rate || '',
                        weight: row.weight || '',
                        totalPrice: row.price || '',
                    });
                });
                setDiamondRows(grouped);

                // Set active tab to the first diamond type that has data
                const firstTypeWithData = Object.keys(grouped)[0];
                if (firstTypeWithData && !activeTab) {
                    setActiveTab(firstTypeWithData);
                }
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
            } catch (error) {
                console.error("Failed to fetch diamond details", error);
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

    // Set active tab when diamond rows are loaded for editing
    useEffect(() => {
        if (editingProduct && Object.keys(diamondRows).length > 0 && !activeTab) {
            const firstTypeWithData = Object.keys(diamondRows)[0];
            if (firstTypeWithData) {
                setActiveTab(firstTypeWithData);
            }
        }
    }, [diamondRows, editingProduct, activeTab]);

    // Initialize diamond rows when diamond type options are loaded and we have editing product
    useEffect(() => {
        if (editingProduct && diamondTypeOptions.length > 0 && Object.keys(diamondRows).length === 0) {
            // Re-process the diamond details with the loaded options
            if (editingProduct.diamond_details) {
                const grouped = {};
                editingProduct.diamond_details.forEach(row => {
                    const typeName = row.diamondtypeId?.type || '';
                    if (!grouped[typeName]) grouped[typeName] = [];
                    grouped[typeName].push({
                        ...row,
                        diamondtypeId: row.diamondtypeId?._id || row.diamondtypeId || '',
                        diamondshapeId: row.diamondshapeId?._id || row.diamondshapeId || '',
                        diamondclaritiesId: row.diamondclaritiesId?._id || row.diamondclaritiesId || '',
                        sizeid: row.sizeid?._id || row.sizeid || '',
                        shape: row.diamondshapeId?._id || row.diamondshapeId || '',
                        clarity: row.diamondclaritiesId?._id || row.diamondclaritiesId || '',
                        size: row.sizeid?._id || row.sizeid || '',
                        rate: row.rate || '',
                        weight: row.weight || '',
                        totalPrice: row.price || '',
                    });
                });
                setDiamondRows(grouped);

                // Set active tab
                const firstTypeWithData = Object.keys(grouped)[0];
                if (firstTypeWithData) {
                    setActiveTab(firstTypeWithData);
                }
            }
        }
    }, [editingProduct, diamondTypeOptions, diamondRows]);

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
            let totalPrice = row.totalPrice;
            // Handle both string and number values
            if (typeof totalPrice === 'string') {
                totalPrice = totalPrice.replace(/,/g, '');
            }
            const num = parseFloat(totalPrice || 0);
            return sum + (isNaN(num) ? 0 : num);
        }, 0);
    };

    const activeDiamondRows = diamondRows[activeTab] || [];

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
        console.log("handleSave called");
        console.log("editingProduct:", editingProduct);

        const validationErrors = validateForm();
        console.log("Validation errors found:", validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            console.log("Validation errors:", validationErrors);
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        try {
            console.log("Starting to build payload...");
            const diamond_details = Object.entries(diamondRows)
                .flatMap(([, rows]) =>
                    rows.map(row => {
                        let totalPrice = row.totalPrice;
                        // Handle both string and number values
                        if (typeof totalPrice === 'string') {
                            totalPrice = totalPrice.replace(/,/g, '');
                        }
                        return {
                            diamondtypeId: typeof row.diamondtypeId === "object" ? row.diamondtypeId._id : row.diamondtypeId || '',
                            diamondshapeId: row.diamondshapeId || '',
                            diamondclaritiesId: typeof row.clarity === "object" ? row.clarity._id : row.diamondclaritiesId || '',
                            sizeid: row.sizeid || '',
                            rate: row.rate,
                            weight: row.weight,
                            price: totalPrice?.toString() || '0',
                        };
                    })
                );
            console.log("diamond_details built:", diamond_details);

            // Build other_charges array
            const other_charges = draftOtherChargeRows.map(row => {
                let amount = row.amount;
                // Handle both string and number values
                if (typeof amount === 'string') {
                    amount = amount.replace(/,/g, '');
                }
                return {
                    product: row.product,
                    weight: row.weight,
                    amount: parseFloat(amount || 0) || 0,
                };
            });
            console.log("other_charges built:", other_charges);

            // Build images array (only selected images)
            const imagesArr = images.map(url => ({ url }));
            console.log("images built:", imagesArr);

            // Collect diamond_type, diamond_clarity, metal_type as arrays (single selection)
            const diamondTypeIds = diamondTypes.map(type => typeof type === "object" ? type._id : type);
            const diamondClarityIds = diamondClarities.map(clarity => typeof clarity === "object" ? clarity._id : clarity);
            const metalTypeIds = metalTypes.map(type => typeof type === "object" ? type._id : type);
            console.log("diamondTypeIds:", diamondTypeIds);
            console.log("diamondClarityIds:", diamondClarityIds);
            console.log("metalTypeIds:", metalTypeIds);

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
            console.log("variantsWithPrice built:", variantsWithPrice);

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

            console.log("Full payload built:", payload);

            if (editingProduct) {
                payload.productId = editingProduct._id;
                console.log("EDITING MODE - Product ID:", editingProduct._id);
                console.log("EDITING MODE - Full payload:", payload);
                console.log("About to call updateProduct...");
                const result = await addProduct(payload);
                console.log("updateProduct result:", result);
            } else {
                console.log("ADDING MODE - No product ID");
                console.log("ADDING MODE - Full payload:", payload);
                console.log("About to call addProduct...");
                const result = await addProduct(payload);
                console.log("addProduct result:", result);
            }

            console.log("API call successful, navigating to /product");
            navigate('/product');
        } catch (error) {
            console.error("Failed to save product", error);
            console.error("Error details:", error.response?.data || error.message);
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
                        <div className="flex items-center justify-between mb-8 mt-5">
                            <h2 className="text-xl font-bold text-[#1E293B">
                                {editingProduct ? 'Edit Product' : 'Product Details'}
                            </h2>
                            {/* {editingProduct && (
                                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Editing: {editingProduct.design_code}
                                </div>
                            )} */}
                        </div>
                        <div className="mb-8 space-y-6 text-[#334155]">
                            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"> */}
                            <div className="grid grid-cols-2     md:grid-cols-4 gap-6">
                                <div className="relative flex flex-col">
                                    <label className="text-sm font-bold text-[#475569]">Category</label>
                                    <SimpleDropdown
                                        // label="Category"
                                        options={categoryOptions}
                                        value={formState.category}
                                        onChange={cat => setFormState(f => ({ ...f, category: cat._id }))}
                                        displayKey="categoryname"
                                        placeholder="Select Category"
                                    // className='text-lg'
                                    />
                                    {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                                </div>
                                <InputField label="Laboure Price/gm" placeholder="Enter price" value={formState.labourPricePerGm} onChange={e => setFormState(f => ({ ...f, labourPricePerGm: e.target.value }))} />
                                {errors.labourPricePerGm && <div className="text-red-500 text-xs mt-1">{errors.labourPricePerGm}</div>}
                                <InputField label="Laboure Price" placeholder="Enter price" value={formState.labourPrice} readOnly />
                                <InputField label="Other Price" placeholder="Enter price" value={formState.otherPrice} readOnly />
                                {/* <InputField label="Total Amount" placeholder="Enter price" value={formState.totalAmount} onChange={e => setFormState(f => ({ ...f, totalAmount: e.target.value }))} /> */}

                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                                <InputField label="Design No." placeholder="Enter design no" value={formState.designNo} onChange={e => setFormState(f => ({ ...f, designNo: e.target.value }))} />
                                {errors.designNo && <div className="text-red-500 text-xs mt-1">{errors.designNo}</div>}
                                <InputField label="G. WT" placeholder="Enter weight" value={formState.gwt} onChange={e => setFormState(f => ({ ...f, gwt: e.target.value }))} />
                                {errors.gwt && <div className="text-red-500 text-xs mt-1">{errors.gwt}</div>}
                                <InputField label="D. WT" placeholder="Enter weight" value={formState.dwt} onChange={e => setFormState(f => ({ ...f, dwt: e.target.value }))} />
                                {errors.dwt && <div className="text-red-500 text-xs mt-1">{errors.dwt}</div>}
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
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
                                    <button className="bg-[#303f26] text-white px-2 py-1 text-sm font-semibold flex items-center gap-1" onClick={handleAddDiamondRow}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 bg-white text-[#303F26] rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} >
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
                                        className="bg-[#303f26] text-white px-2 py-1 text-sm font-semibold flex items-center gap-1"
                                        onClick={handleAddOtherChargeRow}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 bg-white text-[#303F26] rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
                                <button className="px-6 py-2 rounded-md text-white bg-[#303F26] font-semibold" onClick={handleSave} disabled={uploading}>
                                    {editingProduct ? 'Update' : 'Save'}
                                </button>
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

                        <div className="flex gap-6 mt-4 max-sm:flex-col">
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
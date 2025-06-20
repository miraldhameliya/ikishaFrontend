import React, { useEffect, useState } from 'react'
import { createCategory } from '../../redux/services/categoryService';
import upload from '../../assets/icon/Group.png';

const AddCategoryModel = ({ onClose, categoryData, onSuccess }) => {
    const [category, setCategory] = useState(categoryData?.categoryname || '')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);


    useEffect(() => {
        setCategory(categoryData?.categoryname || '');
    }, [categoryData]);

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                categoryname: category,
                ...(image ? { categoryimage: image } : {}),
                ...(categoryData?._id ? { categoryid: categoryData._id } : {}),
            };
            console.log("Payload to send:", payload);
            await createCategory(payload);
            if (typeof onSuccess === 'function') onSuccess();
            onClose();
        } catch (error) {
            console.error("API Error:", error, error?.response);
            const apiMsg = error?.response?.data?.Message || error?.message || 'Failed to save category.';
            setError(apiMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-[#E6EAEE] rounded-2xl shadow-lg w-full max-w-xl p-8 relative animate-zoom-in">
                <div className="text-[20px] font-semibold mb-2 text-[#212121]">{categoryData ? 'Edit Category' : 'Add Category'}</div>
                <div>
                    <div className='text-[15px] font-medium mb-1 text-[#475569]'>Category Name</div>
                    <input
                        className="w-full px-3 text-[#A0A8BB] py-2 rounded-md  border-gray-300 text-[15px] mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#263312]"
                        type='text'
                        placeholder='Type Here'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <div className="text-[15px] font-medium mb-1 text-[#475569]">Upload Image</div>
                    <label
                        htmlFor="category-image-upload"
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg h-32 cursor-pointer bg-white hover:bg-gray-50 transition"
                    >
                        {preview ? (
                            <img src={preview} alt="Preview" className="h-24 object-contain" />
                        ) : (
                            <div className="flex flex-col items-center">
                                <img src={upload} alt="Upload Icon" className="w-10 h-10 mb-2 text-gray-400" />
                                {/* <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" />
                                </svg> */}
                                <span className="text-[#A0A8BB]">Drag & Drop or click to upload file</span>
                            </div>
                        )}
                        <input
                            id="category-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                    <button
                        className="px-7 py-2 rounded-lg bg-[#F5F7FA] text-gray-600 font-medium text-[15px] shadow hover:bg-gray-200 border border-gray-200 disabled:opacity-60"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-7 py-2 rounded-lg bg-[#303F26] text-white font-medium text-[15px] shadow"
                        onClick={handleSave}
                        disabled={loading || !category}
                    >
                        {loading ? (categoryData ? 'Saving...' : 'Saving...') : (categoryData ? 'Update' : 'Save')}
                    </button>
                </div>
                {error && <div className="text-red-600 text-center mt-2">{error}</div>}
            </div>
        </div>

    )
}

export default AddCategoryModel

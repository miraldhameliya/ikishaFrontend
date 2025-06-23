import React from 'react';

const InputField = ({ label, placeholder }) => (
    <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-600">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            className="px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-800"
        />
    </div>
);

const DiamondDetailRow = () => (
    <tr className="border-b">
        <td className="p-2">
            <select className="w-full px-3 py-1.5 border rounded-md bg-gray-50">
                <option>Round</option>
            </select>
        </td>
        <td className="p-2">
            <select className="w-full px-3 py-1.5 border rounded-md bg-gray-50">
                <option>VVS</option>
            </select>
        </td>
        <td className="p-2">
            <select className="w-full px-3 py-1.5 border rounded-md bg-gray-50">
                <option>0.2</option>
            </select>
        </td>
        <td className="p-2"><input type="text" defaultValue="3000" className="w-full px-3 py-1.5 border rounded-md" /></td>
        <td className="p-2"><input type="text" defaultValue="3gm" className="w-full px-3 py-1.5 border rounded-md" /></td>
        <td className="p-2 text-right">12,000</td>
        <td className="p-2 text-center">
            <button className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
            </button>
        </td>
    </tr>
);

const OtherChargeRow = () => (
    <tr className="border-b">
        <td className="p-2">
            <select className="w-full px-3 py-1.5 border rounded-md bg-gray-50">
                <option>Lab-Grown/Round</option>
            </select>
        </td>
        <td className="p-2"><input type="text" defaultValue="3gm" className="w-full px-3 py-1.5 border rounded-md" /></td>
        <td className="p-2"><input type="text" defaultValue="12,000" className="w-full px-3 py-1.5 border rounded-md" /></td>
        <td className="p-2 text-center">
            <button className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
            </button>
        </td>
    </tr>
);


const AddProduct = () => {
    return (
        <div className="p-3 bg-[#eff0f5] min-h-screen">
            <div className="bg-white p-3 rounded-lg shadow-lg">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Product Details</h2>
                        <div className="mb-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                <InputField label="Metal Price" placeholder="Enter price" />
                                <InputField label="Diamond Price" placeholder="Enter price" />
                                <InputField label="Laboure Price" placeholder="Enter price" />
                                <InputField label="Other Price" placeholder="Enter price" />
                                <InputField label="Total Amount" placeholder="Enter price" />
                                <InputField label="Laboure Price/gm" placeholder="Enter price/gm" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Design No." placeholder="Enter design no" />
                                <InputField label="G. WT" placeholder="Enter weight" />
                                <InputField label="D. WT" placeholder="Enter weight" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Label No." placeholder="Enter label no" />
                                <InputField label="N. WT" placeholder="Enter weight" />
                                <InputField label="O. WT" placeholder="Enter weight" />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="mb-2 block text-sm font-semibold text-gray-600">Upload Image</label>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-2 overflow-x-auto">
                                    {Array(5).fill().map((_, i) => (
                                        <div key={i} className="relative flex-shrink-0">
                                            <img src="https://via.placeholder.com/100" alt="upload-preview" className="w-24 h-24 object-cover rounded-md" />
                                            <button className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -mr-1 -mt-1">X</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-24 h-24 flex-shrink-0 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span className="text-xs">Upload file</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex flex-col gap-8">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-700">Diamond Details</h3>
                                <button className="bg-green-800 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-900 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th colSpan="3" className="p-2 text-center text-sm font-semibold text-gray-600 border-b border-r">Lab-Grown</th>
                                            <th colSpan="4" className="p-2 text-center text-sm font-semibold text-gray-600 border-b">Natural</th>
                                        </tr>
                                        <tr className="text-xs text-gray-500 uppercase">
                                            <th className="p-2 font-semibold border-r">Shape</th>
                                            <th className="p-2 font-semibold border-r">Clarity</th>
                                            <th className="p-2 font-semibold border-r">Size</th>
                                            <th className="p-2 font-semibold border-r">Rate</th>
                                            <th className="p-2 font-semibold border-r">Weight</th>
                                            <th className="p-2 font-semibold border-r">Total Price</th>
                                            <th className="p-2 font-semibold"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <DiamondDetailRow />
                                        <DiamondDetailRow />
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-green-800 text-white font-bold">
                                            <td colSpan="5" className="p-2 text-right">6gm</td>
                                            <td colSpan="2" className="p-2 text-right">24,000</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-700">Other Charge</h3>
                                <button className="bg-green-800 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-900 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100 text-xs text-gray-500 uppercase">
                                        <tr>
                                            <th className="p-2 font-semibold text-left">Product</th>
                                            <th className="p-2 font-semibold text-left">Weight</th>
                                            <th className="p-2 font-semibold text-left">Amount</th>
                                            <th className="p-2 font-semibold"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <OtherChargeRow />
                                        <OtherChargeRow />
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-green-800 text-white font-bold">
                                            <td className="p-2 text-right">6gm</td>
                                            <td colSpan="3" className="p-2 text-right">24,000</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button className="px-6 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold">Cancel</button>
                    <button className="px-6 py-2 rounded-md text-white bg-green-900 hover:bg-green-800 font-semibold">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct; 
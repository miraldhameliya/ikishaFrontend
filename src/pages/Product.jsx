import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';
import editIcon from '../assets/icon/edit.png';
import productImage from '../assets/icon/earing.png';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Product = () => {
    const navigate = useNavigate();
    const { setRightButton } = useHeaderRightButton();

    useEffect(() => {
        setRightButton(
            <button
                className="bg-[#303F26] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#26371e] font-semibold text-lg shadow"
                onClick={() => navigate('/add-product')}
            >
                Add Product
            </button>
        );
        return () => setRightButton(null);
    }, [setRightButton, navigate]);

    const products = Array.from({ length: 18 }).map((_, index) => ({
        id: index + 1,
        image: productImage,
        designCode: '#303F26',
        price: '₹3,50,000',
    }));

    const handleEdit = (product) => {
        console.log('Edit product:', product);
    };

    const handleDelete = (product) => {
        console.log('Delete product:', product);
    };

    return (
        <div className="p-6 bg-[#eff0f5] min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1">
                        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                            <button onClick={() => handleEdit(product)} className="bg-white p-1.5 rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                                <img src={editIcon} alt="Edit" className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleDelete(product)} className="bg-red-600 p-1.5 rounded-full shadow-lg hover:bg-red-700 transition-colors">
                                <TrashIcon />
                            </button>
                        </div>
                        <div className="h-48 bg-[#ffffff] flex items-center justify-center overflow-hidden">
                            <img src={product.image} alt={`Design ${product.designCode}`} className="h-full w-full object-contain p-4" />
                        </div>
                        <div className="p-4 bg-white text-left">
                            <p className="font-bold text-gray-800">Design Code : <span className="font-medium text-gray-500">{product.designCode}</span></p>
                            <p className="font-bold text-gray-800 mt-1">Price : <span className="font-medium text-gray-500">{product.price}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;

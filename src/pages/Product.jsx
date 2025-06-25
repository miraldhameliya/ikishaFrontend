import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';
import editIcon from '../assets/icon/edit.png';
import productImage from '../assets/icon/nosepin.png';
import { fetchAllProduct } from '../redux/services/ProductService';


const Product = () => {
    const navigate = useNavigate();
    const { setRightButton } = useHeaderRightButton();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchAllProduct({ page: 1, limit: 18, search: "", categoryId: "" });
                console.log('Fetched products:', data);
                if (data && data.Data && data.Data.docs) {
                    setProducts(data.Data.docs);
                }
                setError(null);
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const handleEdit = (product) => {
        navigate('/add-product', { state: { product } });
    };

    const handleDelete = (product) => {
        console.log('Delete product:', product);
    };

    if (loading) {
        return <div className='p-4'>
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

        </div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 bg-[#eff0f5] min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {products.map((product) => (
                    <div key={product._id} className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1">
                        <div className="h-56 bg-[#ffffff] flex items-center justify-center overflow-hidden relative">
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                                <button onClick={() => handleEdit(product)} className="bg-white p-1.5 rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                                    <img src={editIcon} alt="Edit" className="w-6 h-6" />
                                </button>
                                <button onClick={() => handleDelete(product)} className="bg-red-600 p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors">
                                    {/* <TrashIcon/> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <img 
                                src={(product.images && product.images[0]?.url) || productImage} 
                                alt={`Design ${product.design_code}`} 
                                className="p-3 w-[30rem] h-[14rem] cursor-pointer" 
                                onClick={() => navigate('/product-details', { state: { product } })}
                            />
                        </div>
                        <div className="px-3 py-2 bg-white text-left">
                            <p className="font-bold text-gray-800">Design Code : <span className="font-medium text-gray-500">{product.design_code}</span></p>
                            <p className="font-bold text-gray-800 mt-1">Price : <span className="font-medium text-gray-500">₹{product.totalamount}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;

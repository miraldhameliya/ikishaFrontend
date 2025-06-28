import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';
import editIcon from '../assets/icon/edit.png';
import productImage from '../assets/icon/nosepin.png';
import { fetchAllProduct, viewProductDetail } from '../redux/services/ProductService';
import remove from '../assets/icon/Remove.png'

const Product = () => {
    const navigate = useNavigate();
    const { setRightButtonProps } = useHeaderRightButton();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        setRightButtonProps({
            text: 'Add Product',
            onClick: () => navigate('/add-product')
        });
        return () => setRightButtonProps(null);
    }, [setRightButtonProps, navigate]);

    const fetchProducts = useCallback(async (page = 1, append = false) => {
        try {
            if (page === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }
            
            const data = await fetchAllProduct({ page, limit: 18, search: "", categoryId: "" });
            console.log('Fetched products:', data);
            
            if (data && data.Data && data.Data.docs) {
                const newProducts = data.Data.docs;
                const totalDocs = data.Data.totalDocs || 0;
                const totalPages = data.Data.totalPages || 0;
                
                if (append) {
                    setProducts(prev => [...prev, ...newProducts]);
                } else {
                    setProducts(newProducts);
                }
                
                // Check if there are more pages
                setHasMore(page < totalPages);
                setError(null);
            }
        } catch (err) {
            setError('Failed to fetch products');
            console.error(err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(1, false);
    }, [fetchProducts]);

    // Infinite scroll handler
    const handleScroll = useCallback(() => {
        if (loadingMore || !hasMore) return;
        
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Load more when user is near bottom (within 100px)
        if (scrollTop + windowHeight >= documentHeight - 100) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchProducts(nextPage, true);
        }
    }, [loadingMore, hasMore, currentPage, fetchProducts]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleEdit = (product) => {
        navigate('/add-product', { state: { product } });
    };

    const handleDelete = (product) => {
        console.log('Delete product:', product);
    };

    const handleProductClick = async (product) => {
        console.log("product", product);
        // const diamondDetails = product.diamond_details && product.diamond_details[0];
        //     const diamondclaritiesId = diamondDetails?.diamondclaritiesId?._id;
        //     const diamondshapeId = diamondDetails?.diamondshapeId?._id;
        //     const diamondtypeId = diamondDetails?.diamondtypeId?._id;
        const diamondDetails = product.diamond_details && product.diamond_details[0];
        const diamondtypeId = diamondDetails?.diamondtypeId?._id;
        const diamondclaritiesId = diamondDetails?.diamondclaritiesId?._id;
        const metaltypeId = product.varient?.metaltypeId?._id;
        const productId = product._id;

        console.log("diamondtypeId:====", diamondtypeId);
        console.log("diamondclaritiesId:", diamondclaritiesId);
        console.log("metaltypeId:", metaltypeId);
        console.log("productId:", productId);

        setDetailsLoading(true);
        setDetailsError(null);
        try {
            if (!diamondtypeId || !diamondclaritiesId || !metaltypeId || !productId) {
                setDetailsError('Required IDs not found in product data');
                setDetailsLoading(false);
                return;
            }
            const payload = {
                productId,
                diamondtypeId,
                diamondclaritiesId,
                metaltypeId
            };
            const data = await viewProductDetail(payload);
            
            navigate('/product-details', { state: { product: data.Data } });
        } catch (err) {
            setDetailsError('Failed to fetch product details');
            console.error(err);
        } finally {
            setDetailsLoading(false);
        }
    };

    if (loading) {
        return <div className='p-4'>
            <div className="flex flex-col items-center justify-center space-y-4">
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

    if (detailsLoading) {
        return <div className='p-4'>
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-gray-600 font-medium">
                    <span className="animate-pulse">Loading Product Details</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span className="animate-bounce delay-300">.</span>
                </div>
                <div className="w-32 h-2 bg-gradient-to-r from-transparent via-[#26371e] to-transparent rounded-full animate-pulse"></div>
            </div>
        </div>;
    }

    if (detailsError) {
        return <div className="p-4 text-red-500">{detailsError}</div>;
    }

    return (
        <div className="p-4 bg-[#eff0f5]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {products.map((product) => (
                    <div key={product._id} className="group relative bg-white shadow-md overflow-hidden transition-transform transform hover:-translate-y-1">
                        <div className="h-56 bg-[#ffffff] flex items-center justify-center overflow-hidden relative">
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                                <button onClick={() => handleEdit(product)} className="bg-white p-1.5 rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                                    <img src={editIcon} alt="Edit" className="w-6 h-6" />
                                </button>
                                <button onClick={() => handleDelete(product)} className="bg-white rounded-full shadow-lg  transition-colors">
                                    <img src={remove} alt='delete' />
                                </button>
                            </div>
                            <img
                                src={(product.images && product.images[0]?.url) || productImage}
                                alt={`Design ${product.design_code}`}
                                className="p-3 w-[30rem] h-[14rem] cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            />
                        </div>
                        <div className="px-3 py-2 bg-white text-left">
                            <p className="font-bold text-[#334155]">Design Code : <span className="font-medium  text-[#64748B]">{product.design_code}</span></p>
                            <p className="font-bold text-[#334155] mt-1">Price : <span className="font-medium text-[#64748B]">₹{product.totalamount}</span></p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Loading more indicator */}
            {loadingMore && (
                <div className="flex justify-center items-center py-4">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-6 h-6 border-2 border-[#c3c7bc] border-t-[#26371e] rounded-full animate-spin"></div>
                        <span className="text-gray-600 text-sm">Loading more products...</span>
                    </div>
                </div>
            )}
            
            {/* No more products indicator */}
            {!hasMore && products.length > 0 && (
                <div className="flex justify-center items-center py-4">
                    <span className="text-gray-500 text-sm">No more products to load</span>
                </div>
            )}
        </div>
    );
};

export default Product;


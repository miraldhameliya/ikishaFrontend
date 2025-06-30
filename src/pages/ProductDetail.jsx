import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ringImg from '../assets/icon/Diamond.png';
import right from '../assets/icon/right.png';
import left from '../assets/icon/left.png';
import dropdownIcon from '../assets/icon/dropdown.png';

import { viewProductDetail, fetchAllProduct } from '../redux/services/ProductService';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialProduct = location.state?.product;

  // Color mapping for metal types
  const metalTypeColors = [
    // { label: "SL", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
    // { label: "10kt", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
    // { label: "10kt", gradient: "bg-gradient-to-tr  from-[#B3B2AF] to-[#FCF1D5] to-[#FCF1D5] to-[#E1B94F]", border: "", text: "text-[#1E293B]" },
    // { label: "10kt", gradient: "bg-gradient-to-tr from-[#EC8A55] to-[#FCEDE2] to-[#FCEDE2] to-[##EC8A55]", border: "", text: "text-[#1E293B]" },
    // { label: "14kt", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
    // { label: "14kt", gradient: "bg-gradient-to-tr from-[#E1B94F] to-[#FCF1D5] to-[#FCF1D5] to-[#E1B94F]", border: "", text: "text-[#1E293B]" },
    // { label: "14kt", gradient: "bg-gradient-to-tr from-[#EC8A55] to-[#FCEDE2] to-[#FCEDE2] to-[##EC8A55]", border: "", text: "text-[#1E293B]" },
    // { label: "18kt", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
    // { label: "18kt", gradient: "bg-gradient-to-tr from-[#E1B94F] to-[#FCF1D5] to-[#FCF1D5] to-[#E1B94F]", border: "", text: "text-[#1E293B]" },
    // { label: "18kt", gradient: "bg-gradient-to-tr from-[#EC8A55] to-[#FCEDE2] to-[#FCEDE2] to-[##EC8A55]", border: "", text: "text-[#1E293B]" },
    // { label: "PT", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
    { label: "SL", bg: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", text: "text-[#1E293B]" }, // Silver
    { label: "10kt", bg: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", text: "text-[#1E293B]" }, // Light yellow
    { label: "14kt", bg: "bg-gradient-to-tr from-[#E1B94F] to-[#FCF1D5] to-[#FCF1D5] to-[#E1B94F]", text: "text-[#1E293B]" }, // Yellow
    { label: "18kt", bg: "bg-gradient-to-tr from-[#EC8A55] to-[#FCEDE2] to-[#FCEDE2] to-[##EC8A55]", text: "text-[#1E293B]" }, // Dark yellow
    { label: "PT", bg: "bg-gray-200", text: "text-[#1E293B]" }, // Platinum
    { label: "Rose", bg: "bg-pink-100", text: "text-[#1E293B]" }, // Rose Gold (if needed)
  ];

  // Function to get color based on metal type
  const getMetalTypeColor = (metalName) => {
    const metalType = metalName.split('/')[0]; // Get first part (e.g., "10kt", "18kt")

    // Find matching color based on exact metal type name
    const colorConfig = metalTypeColors.find(color => color.label === metalType);

    // Return the matching color or default to first color if not found
    return colorConfig || metalTypeColors[0];
  };

  // Dynamic option arrays from API (from productDetails)
  const [productDetails, setProductDetails] = useState(initialProduct);

  // Default selected IDs from varient (or first in list as fallback)
  const [selectedDiamondType, setSelectedDiamondType] = useState(initialProduct?.varient?.diamondtypeId?._id || initialProduct?.diamond_type?.[0]?._id || '');
  const [selectedDiamondClarity, setSelectedDiamondClarity] = useState(initialProduct?.varient?.diamondclaritiesId?._id || initialProduct?.diamond_clarity?.[0]?._id || '');
  const [selectedMetalType, setSelectedMetalType] = useState(initialProduct?.varient?.metaltypeId?._id || initialProduct?.metal_type?.[0]?._id || '');
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch updated product details from backend
  const fetchUpdatedDetails = async (diamondtypeId, diamondclaritiesId, metaltypeId) => {
    setLoading(true);
    try {
      const payload = {
        productId: initialProduct._id,
        diamondtypeId,
        diamondclaritiesId,
        metaltypeId
      };
      const response = await viewProductDetail(payload);
      setProductDetails(response.Data);
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  // Handlers for option changes
  const handleMetalTypeChange = (id) => {
    setSelectedMetalType(id);
    fetchUpdatedDetails(selectedDiamondType, selectedDiamondClarity, id);
  };

  const handleDiamondTypeChange = (id) => {
    setSelectedDiamondType(id);
    fetchUpdatedDetails(id, selectedDiamondClarity, selectedMetalType);
  };

  const handleDiamondClarityChange = (id) => {
    setSelectedDiamondClarity(id);
    fetchUpdatedDetails(selectedDiamondType, id, selectedMetalType);
  };

  // Update selected IDs if productDetails changes (e.g. after API call)
  useEffect(() => {
    setSelectedDiamondType(productDetails?.varient?.diamondtypeId?._id || productDetails?.diamond_type?.[0]?._id || '');
    setSelectedDiamondClarity(productDetails?.varient?.diamondclaritiesId?._id || productDetails?.diamond_clarity?.[0]?._id || '');
    setSelectedMetalType(productDetails?.varient?.metaltypeId?._id || productDetails?.metal_type?.[0]?._id || '');
    setSelectedImageIndex(0); // Reset image index when product changes
  }, [productDetails]);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (productDetails?.categoryid?._id) {
        const data = await fetchAllProduct({
          page: 1,
          limit: 10,
          search: "",
          categoryId: productDetails.categoryid._id
        });
        setRelatedProducts(data.Data.docs.filter(p => p._id !== productDetails._id)); // Exclude current product
      }
    };
    fetchRelated();
  }, [productDetails]);

  const diamondTypes = productDetails?.diamond_type || [];
  const diamondClarities = productDetails?.diamond_clarity || [];
  const metalTypes = productDetails?.metal_type || [];

  return (
    <div className="pt-5  bg-[#f5f6fa]">
      <div className="mx-auto">
        <div className="text-lg font-bold mb-3 pl-4">
          <span
            className="cursor-pointer text-[17px] font-bold text-[#1B1F2B] hover:text-[#303F26] transition-colors"
            onClick={() => navigate('/product')}
          >
            Product
          </span>
          <span className="text-[11px] font-semibold text-gray-500 ml-1.5 relative top-[3px]">
            / Product Details
          </span>
        </div>

        <div className="flex 2xl:px-[95px] xl:px-[70px] lg:px-[40px] 2xl:gap-20 xl:gap-16">
          {/* Left: Main Image & Thumbnails */}
          <div className="" >
            <div className="relative 2xl:w-[850px] 2xl:h-[510px] xl:w-[700px] xl:h-[400px] lg:w-[480px] lg:h-[350px] flex mb-4 bg-white shadow-lg overflow-hidden">
              <img src={productDetails?.images && productDetails.images[selectedImageIndex]?.url ? productDetails.images[selectedImageIndex].url : ringImg} alt="Main" className="w-full   bg-white" />
              <button className="absolute left-1 top-1/2 -translate-y-1/2 shadow p-2 z-10 flex items-center justify-center"
                onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : (productDetails?.images?.length ? productDetails.images.length - 1 : 0))}
                disabled={!productDetails?.images || productDetails.images.length <= 1}
              >
                <img src={right} alt='rightSide' className="xl:w-9 xl:h-9 lg:w-5 lg:h-5 " />
              </button>
              <button className="absolute right-1 top-1/2 -translate-y-1/2 shadow p-2 z-10 flex items-center justify-center"
                onClick={() => setSelectedImageIndex(prev => prev < (productDetails?.images?.length ? productDetails.images.length - 1 : 0) ? prev + 1 : 0)}
                disabled={!productDetails?.images || productDetails.images.length <= 1}
              >
                <img src={left} alt='leftSide' className="xl:w-9 xl:h-9 lg:w-5 lg:h-5" />
              </button>
            </div>
            {/* <div className="flex gap-4 overflow-x-auto pb-2 w-full 2xl:w-[850px]">
              {productDetails?.images && productDetails.images.length > 0 && productDetails.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`   ${selectedImageIndex === idx ? '' : ''} bg-white flex items-center justify-center`}
                >
                  <img
                    src={img.url ? img.url : (typeof img === 'string' ? img : ringImg)}
                    alt="thumb"
                    className="2xl:w-[205px] 2xl:h-[210px] xl:w-[150px] xl:h-[150px] overflow-auto object-cover rounded"
                  />
                </button>
              ))}
            </div> */}
            <div className="flex gap-4 overflow-x-auto pb-2  2xl:w-[850px] xl:w-[700px]">
              {productDetails?.images && productDetails.images.length > 0 && productDetails.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`2xl:min-w-[200px] 2xl:min-h-[210px] xl:min-w-[163px] xl:min-h-[150px] ${selectedImageIndex === idx ? '' : ''} bg-white flex items-center justify-center`}
                >
                  <img
                    src={img.url ? img.url : (typeof img === 'string' ? img : ringImg)}
                    alt="thumb"
                    className="w-full h-full object-cover bg-cover"
                  />
                </button>
              ))}
            </div>

          </div>
          {/* Right: Product Info Card */}
          <div className="bg-white rounded-lg px-4 py-2 w-full 2xl:h-[500px] xl:h-[400px]">
            <div className='text-2xl font-bold text-[#1E293B] mb-3'>{productDetails?.name}</div>
            <div className='lg:text-lg 2xl:text-2xl font-bold text-[#1E293B] mb-3'>Tri-Color Gold Multi-Band Diamond Engagement Ring</div>
            <div className='lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B] mb-3'>Design Code : <span className="text-[#64748B]">{productDetails?.design_code}</span></div>
            <div className="lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B] mb-3">
              Price : <span className="text-[#64748B]">
                ₹ {productDetails?.varient?.varientprice ?? productDetails?.totalamount ?? productDetails?.price}
              </span>
            </div>
            <div className="lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B] mb-2">Metal Type: <span className="text-[#64748B]">{
              metalTypes.find(m => m._id === selectedMetalType)?.name || ''
            }</span></div>
            <div className="flex gap-2 my-2 flex-wrap mb-4">
              {metalTypes.map((type) => {
                const colorConfig = getMetalTypeColor(type.name);
                return (
                  <button
                    key={type._id}
                    className={`w-9 h-9 flex items-center justify-center rounded-full font-normal text-[13px] shadow ${colorConfig.bg} ${colorConfig.text} ${selectedMetalType === type._id ? "border-2 border-[#6D865D]" : "border border-gray-200"}`}
                    onClick={() => handleMetalTypeChange(type._id)}
                    disabled={loading}
                  >
                    {type.name.split('/')[0]}
                  </button>
                );
              })}
            </div>
            {/* <div className=""> */}
            <div>
              <label className="block lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B]">Diamond Type</label>
              <div className="relative">
                <select
                  className="lg:w-[26.5rem] px-6 py-2 bg-[#F3F4F6] lg:text-base 2xl:text-[14px] appearance-none focus:outline-none focus:ring-0 text-[#64748B] rounded"
                  value={selectedDiamondType}
                  onChange={e => handleDiamondTypeChange(e.target.value)}
                  disabled={loading}
                >
                  <option value="" disabled>Select Diamond Type</option>
                  {diamondTypes.map(type => (
                    <option key={type._id} value={type._id} className='lg:text-base 2xl:text-[15px]'>{type.type}</option>
                  ))}
                </select>
                <img
                  src={dropdownIcon}
                  alt="dropdown"
                  className="w-4 h-4 absolute left-96 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className="block lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B]">Diamond Clarity</label>
              <div className="relative w-full mt-4">
                <select
                  className="lg:w-[26.5rem] px-6 py-2 lg:text-base 2xl:text-[14px] bg-[#F3F4F6] text-xs appearance-none focus:outline-none focus:ring-0 text-[#64748B] rounded"
                  value={selectedDiamondClarity}
                  onChange={e => handleDiamondClarityChange(e.target.value)}
                  disabled={loading}
                >
                  <option value="" disabled>Select Diamond Clarity</option>
                  {diamondClarities.map(clarity => (
                    <option key={clarity._id} value={clarity._id} className='lg:text-base 2xl:text-[15px]'>{clarity.grade}</option>
                  ))}
                </select>
                <img
                  src={dropdownIcon}
                  alt="dropdown"
                  className="w-4 h-4 absolute left-96 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <div className="text-xl font-bold mb-4 text-center text-[#1E293B]">Related Products</div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
              {relatedProducts.map((rel, idx) => (
                <div
                  key={rel._id}
                  className="bg-[#E2E8F0] rounded-lg p-2 flex flex-col items-start border border-gray-200 shadow-sm cursor-pointer"
                  onClick={() => window.location.reload() /* or navigate to details page with rel */}
                >
                  <img
                    src={rel.images && rel.images[0]?.url}
                    alt="related"
                    className="w-full aspect-square object-cover rounded mb-2 bg-white"
                  />
                  <div className="text-xs font-bold text-[#1E293B]">Design Code : <span className="font-medium text-gray-500">{rel.design_code}</span></div>
                  <div className="text-xs font-bold text-[#1E293B] mt-1">
                    Price : <span className="font-medium text-gray-500">
                      ₹{rel.varient?.varientprice ?? rel.totalamount ?? rel.price ?? 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails; 
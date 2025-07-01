import React, { useState, useEffect, useRef } from 'react';
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
  const [hasSelected, setHasSelected] = useState(false);


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
    { label: "SL", bg: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", text: "text-[#1E293B]", border: "border-2 border-[#6D865D]", }, // Silver
    { label: "10kt", bg: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", text: "text-[#1E293B]", border: "border-2 border-gray-500", }, // Light yellow
    { label: "14kt", bg: "bg-gradient-to-tr from-[#E1B94F] to-[#FCF1D5] to-[#FCF1D5] to-[#E1B94F]", text: "text-[#1E293B]", border: "border-2 border-gray-500", }, // Yellow
    { label: "18kt", bg: "bg-gradient-to-tr from-[#EC8A55] to-[#FCEDE2] to-[#FCEDE2] to-[##EC8A55]", text: "text-[#1E293B]", border: "border-2 border-[#EC8A55]", }, // Dark yellow
    { label: "PT", bg: "bg-gray-200", text: "text-[#1E293B]", border: "border-2 border-gray-500", }, // Platinum
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
    setHasSelected(true);
    setOpen(false);
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

  // const scrollRef = useRef(null);
  // useEffect(() => {
  //   const el = scrollRef.current;

  //   const handleWheel = (e) => {
  //     // Only scroll horizontally if cursor is over the container
  //     if (!el || !el.matches(':hover')) return;

  //     if (e.deltaY !== 0) {
  //       e.preventDefault(); // Prevent vertical scroll
  //       el.scrollLeft += e.deltaY; // Scroll horizontally
  //     }
  //   };

  //   if (el) {
  //     el.addEventListener('wheel', handleWheel, { passive: false });
  //   }

  //   return () => {
  //     if (el) {
  //       el.removeEventListener('wheel', handleWheel);
  //     }
  //   };
  // }, []);


  return (
    <div className="pt-5 bg-[#f5f6fa]">
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

        <div className="flex 2xl:px-[95px] xl:px-[70px] lg:px-[40px] md:pl-4 md:py-4 2xl:gap-20 xl:gap-16 max-sm:flex-col p-4">
          {/* Left: Main Image & Thumbnails */}
          <div>
            <div className="relative 2xl:w-[850px] 2xl:h-[510px] xl:w-[700px] xl:h-[400px] lg:w-[480px] lg:h-[300px] md:w-[420px] md:h-[250px] w-full h-[230px] flex mb-4 bg-white overflow-hidden">
              <img src={productDetails?.images && productDetails.images[selectedImageIndex]?.url ? productDetails.images[selectedImageIndex].url : ringImg} alt="Main" className="w-full bg-white" />
              <button className="absolute left-1 top-1/2 -translate-y-1/2 shadow p-2 z-10 flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : (productDetails?.images?.length ? productDetails.images.length - 1 : 0))}
                disabled={!productDetails?.images || productDetails.images.length <= 1}
              >
                <img src={right} alt='rightSide' className="xl:w-9 xl:h-9 lg:w-7 lg:h-7" />
              </button>
              <button className="absolute right-1 top-1/2 -translate-y-1/2 shadow p-2 z-10 flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedImageIndex(prev => prev < (productDetails?.images?.length ? productDetails.images.length - 1 : 0) ? prev + 1 : 0)}
                disabled={!productDetails?.images || productDetails.images.length <= 1}
              >
                <img src={left} alt='leftSide' className="xl:w-9 xl:h-9 lg:w-7 lg:h-7" />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 2xl:w-[850px] xl:w-[700px] lg:w-[480px] md:w-[420px]"
            // ref={scrollRef}
            >
              {productDetails?.images && productDetails.images.length > 0 && productDetails.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-shrink-0  bg-white  2xl:w-[200px] 2xl:h-[210px] xl:w-[163px] xl:h-[150px] lg:w-[150px] lg:h-[150px] md:w-[128px] w-[120px]  ${selectedImageIndex === idx ? '' : ''} bg-white flex items-center justify-center `}
                >
                  <img
                    src={img.url ? img.url : (typeof img === 'string' ? img : ringImg)}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Product Info Card */}
          <div className="bg-white  px-4 lg:py-2 flex-1 items-start flex-col 2xl:h-[500px] h-auto xl:h-[400px]">
            <div className='text-2xl font-bold text-[#1E293B] mb-2'>{productDetails?.name}</div>
            <span className='lg:text-lg 2xl:text-2xl font-bold text-[#1E293B] mb-4'>Tri-Color Gold Multi-Band Diamond Engagement Ring</span>
            <div className='lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B] mt-2 mb-4'>Design Code : <span className="text-[#64748B]">{productDetails?.design_code}</span></div>
            <div className="lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B] mb-4">
              Price : <span className="text-[#64748B]">
                ₹ {productDetails?.varient?.varientprice ?? productDetails?.totalamount ?? productDetails?.price}
              </span>
            </div>
            <div className="lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B] mb-2">Metal Type: <span className="text-[#64748B]">{
              metalTypes.find(m => m._id === selectedMetalType)?.name || ''
            }</span></div>
            <div className="flex gap-2 my-2 flex-wrap mb-5">
              {metalTypes.map((type) => {
                const colorConfig = getMetalTypeColor(type.name);
                return (
                  // <button
                  //   key={type._id}
                  //   className={`w-9 h-9 flex items-center justify-center rounded-full font-normal text-[13px] shadow ${colorConfig.bg} ${colorConfig.text} ${selectedMetalType === type._id ? "border-2 border-green-500" : "border border-gray-200"}`}
                  //   onClick={() => handleMetalTypeChange(type._id)}
                  //   disabled={loading}
                  // >
                  //   {type.name.split('/')[0]}
                  // </button>
                  <button
                    key={type._id}
                    className={`w-9 h-9 flex items-center justify-center rounded-full font-normal text-[13px] shadow 
                    ${colorConfig.bg} 
                    ${colorConfig.text} 
                    ${selectedMetalType === type._id ? colorConfig.border : ""}`}
                    onClick={() => handleMetalTypeChange(type._id)}
                    disabled={loading}
                  >
                    {type.name.split('/')[0]}
                  </button>

                );
              })}
            </div>
            {/* <div className=""> */}
            {/* <div>
              <label className="block lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B] mb-2">Diamond Type</label>
              <div className="relative">
                <select
                  className="lg:w-[26.5rem] md:w-full w-full px-6 py-2 lg:text-base 2xl:text-[13px] bg-[#F3F4F6] text-xs appearance-none focus:outline-none focus:ring-0 font-semibold text-[#64748B] rounded"
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
                  className="w-4 h-4 absolute max-sm:right-6 lg:left-96 md:left-60 top-1/2 lg:-translate-y-1/1 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div> */}
            <div className="relative w-full">
              <label className="block lg:text-base 2xl:text-[18px] font-semibold text-[#1E293B] mb-2">
                Diamond Type
              </label>

              <button
                type="button"
                className={`lg:w-[26.5rem] md:w-full w-full gap-2 px-6 py-2 bg-[#F3F4F6] rounded-lg flex items-center justify-between text-sm font-semibold text-[#64748B] hover:bg-gray-200 focus:outline-none ${open ? 'shadow-lg' : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                disabled={loading}
              >
                <span>
                  {hasSelected && selectedDiamondType
                    ? diamondTypes.find((d) => d._id === selectedDiamondType)?.type
                    : 'Select Diamond Type'}
                </span>
                <img
                  src={dropdownIcon}
                  alt="dropdown"
                  className="w-4 h-4 pointer-events-none"
                />
              </button>

              {open && (
                <div className="absolute z-10 mt-1 lg:w-[26.5rem] md:w-full w-full bg-white rounded-lg max-h-40 overflow-y-auto shadow-md">
                  {diamondTypes.length > 0 ? (
                    diamondTypes.map((type) => (
                      <div
                        key={type._id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[#475569] text-sm"
                        onClick={() => handleDiamondTypeChange(type._id)}
                      >
                        {type.type}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-400">Loading types...</div>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block lg:text-base 2xl:text-[18px] font-semibold mb-2 text-[#1E293B]">Diamond Clarity</label>
              <div className="relative w-full inline-flex">
                <select
                  className="lg:w-[26.5rem] md:w-full w-full px-6 py-2 lg:text-base 2xl:text-[13px] bg-[#F3F4F6] text-xs appearance-none focus:outline-none focus:ring-0 font-semibold text-[#64748B] rounded"
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
                  className="w-4 h-4 absolute max-sm:right-6 lg:left-96 md:left-60 top-1/2 -translate-y-1/2 pointer-events-none"
                />

              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-6 px-4">
            <div className="text-3xl font-bold mb-6 text-center text-[#334155]">Related Products</div>
            <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4 md:gap-4">
              {relatedProducts.map((rel, idx) => (
                <div
                  key={rel._id}
                  className="bg-[#E2E8F0]  p-4 flex flex-col items-start border border-gray-200 shadow-sm cursor-pointer"
                  onClick={() => window.location.reload() /* or navigate to details page with rel */}
                >
                  <img
                    src={rel.images && rel.images[0]?.url}
                    alt="related"
                    className="w-[320px] xl:h-[225px] lg:h-[200px] aspect-square object-cover mb-4 bg-white"
                  />
                  <div className="text-xs font-bold text-[#1E293B]">Design Code : <span className="font-medium text-[#64748B]">{rel.design_code}</span></div>
                  <div className="text-xs font-bold text-[#1E293B] mt-2">
                    Price : <span className="font-medium text-[#64748B]">
                      ₹ {rel.varient?.varientprice ?? rel.totalamount ?? rel.price ?? 0}
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
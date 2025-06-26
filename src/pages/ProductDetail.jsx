import React from 'react';
import { useLocation } from 'react-router-dom';
import ringImg from '../assets/icon/Diamond.png';
import right from '../assets/icon/right.png';
import left from '../assets/icon/left.png';
import dropdownIcon from '../assets/icon/dropdown.png';
import earingImg from '../assets/icon/earing.png';

const placeholderProduct = {
  design_code: '#303F26',
  name: 'Tri-Color Gold Multi-Band Diamond Engagement Ring',
  price: '2,10,000',
  metal_type: '925 Silver',
  diamond_type: 'Lab-Grown',
  diamond_clarity: 'VVS',
  images: [ringImg, ringImg, ringImg, ringImg, ringImg],
  related: [
    { design_code: '#303F26', price: '3,50,000', img: ringImg },
    { design_code: '#303F26', price: '3,50,000', img: ringImg },
    { design_code: '#303F26', price: '3,50,000', img: ringImg },
    { design_code: '#303F26', price: '3,50,000', img: ringImg },
    { design_code: '#303F26', price: '3,50,000', img: ringImg },
  ],
};

const metalTypes = [
  { label: "SL", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
  { label: "10K", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
  { label: "10K", gradient: "bg-gradient-to-tr  from-[#E1B94F] to-[#FCF1D5] to-[#FCF1D5] to-[#E1B94F]", border: "", text: "text-[#1E293B]" },
  { label: "10K", gradient: "bg-gradient-to-tr from-[#EC8A55] to-[#FCEDE2] to-[#FCEDE2] to-[##EC8A55]", border: "", text: "text-[#1E293B]" },
  { label: "14K", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
  { label: "14K", gradient: "bg-gradient-to-tr from-[#E1B94F] to-[#FCF1D5] to-[#FCF1D5] to-[#E1B94F]", border: "", text: "text-[#1E293B]" },
  { label: "14K", gradient: "bg-gradient-to-tr from-[#EC8A55] to-[#FCEDE2] to-[#FCEDE2] to-[##EC8A55]", border: "", text: "text-[#1E293B]" },
  { label: "18K", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
  { label: "18K", gradient: "bg-gradient-to-tr from-[#E1B94F] to-[#FCF1D5] to-[#FCF1D5] to-[#E1B94F]", border: "", text: "text-[#1E293B]" },
  { label: "18K", gradient: "bg-gradient-to-tr from-[#EC8A55] to-[#FCEDE2] to-[#FCEDE2] to-[##EC8A55]", border: "", text: "text-[#1E293B]" },
  { label: "PT", gradient: "bg-gradient-to-tr from-[#B3B2AF] to-[#F7F7F7] to-[#F7F7F7] to-[#B3B2AF]", border: "", text: "text-[#1E293B]" },
];

const ProductDetails = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  // In real use, get product from location.state or fetch by id from params
  const product = location.state?.product || placeholderProduct;
  const relatedProducts = product.related && product.related.length > 0 ? product.related : placeholderProduct.related;

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto">
        <div className="text-lg font-bold mb-2">Product <span className="text-sm font-normal text-gray-500">/ Product Details</span></div>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 bg-white rounded-lg p-4 md:p-6">
          {/* Left: Main Image & Thumbnails */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-full max-w-xl h-64 sm:h-80 md:h-[26rem] flex items-center justify-center mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={product.images && product.images[0]?.url ? product.images[0].url : (product.images && typeof product.images[0] === 'string' ? product.images[0] : ringImg)} alt="Main" className="w-full h-full object-contain bg-white" />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 flex items-center justify-center">
                <img src={right} alt='rightSide' className="w-5 h-5" />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 flex items-center justify-center">
                <img src={left} alt='leftSide' className="w-5 h-5" />
              </button>
            </div>
            <div className="flex w-full gap-4 mb-4 overflow-x-auto pb-2">
              {product.images && product.images.length > 0 && product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url ? img.url : (typeof img === 'string' ? img : ringImg)}
                  alt="thumb"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200 bg-white cursor-pointer shadow-sm flex-shrink-0"
                />
              ))}
            </div>
          </div>
          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col gap-4">
            <div className=' text-lg sm:text-xl font-bold text-[#1E293B]'>{product?.categoryname}</div>
            <div className="text-lg sm:text-xl font-bold">{product.name}</div>
            <div className="text-[#1E293B] font-semibold">Design Code : <span className="text-[#64748B]">{product.design_code}</span></div>
            <div className="text-[#1E293B] font-semibold">Price : <span className="text-[#64748B]">₹ {product.price}</span></div>
            <div className="text-[#1E293B] font-semibold">Metal Type: <span className="text-[#64748B]">{
              typeof product.metal_type === 'object'
                ? product.metal_type?.name || product.metal_type?.type || ''
                : product.metal_type
            }</span></div>
            <div className="flex gap-2 my-2 flex-wrap">
              {metalTypes.map((type, i) => (
                <span
                  key={i}
                  className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-xs shadow ${type.gradient} ${type.border} ${type.text}`}
                >
                  {type.label}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-1">Diamond Type</label>
                <div className="relative w-full">
                  <select className="w-full px-3 py-2 bg-white appearance-none focus:outline-none focus:ring-0 text-[#64748B]">
                    <option value="" disabled selected >Select Diamond Type</option>
                    <option>{
                      typeof product.diamond_type === 'object'
                        ? product.diamond_type?.type || product.diamond_type?.name || ''
                        : product.diamond_type
                    }</option>
                  </select>
                  <img
                    src={dropdownIcon}
                    alt="dropdown"
                    className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-1 ">Diamond Clarity</label>
                <div className="relative w-full">
                  <select className="w-full px-3 py-2 bg-white appearance-none focus:outline-none focus:ring-0 text-[#64748B]">
                    <option value="" disabled selected>Select Diamond Clarity</option>
                    <option>{
                      typeof product.diamond_clarity === 'object'
                        ? product.diamond_clarity?.grade || product.diamond_clarity?.name || ''
                        : product.diamond_clarity
                    }</option>
                  </select>
                  <img
                    src={dropdownIcon}
                    alt="dropdown"
                    className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related Products */}
        <div className="mt-10">
          <div className="text-xl font-bold mb-4 text-center text-[#1E293B]">Related Products</div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {relatedProducts?.map((rel, idx) => (
              <div key={idx} className="bg-[#E2E8F0] rounded-lg p-2 flex flex-col items-start border border-gray-200 shadow-sm">
                <img src={earingImg} alt="related" className="w-full aspect-square object-cover rounded mb-2 bg-white" />
                <div className="text-xs font-bold text-[#1E293B]">Design Code : <span className="font-medium text-gray-500">{rel.design_code}</span></div>
                <div className="text-xs font-bold text-[#1E293B] mt-1">Price : <span className="font-medium text-gray-500">₹{rel.price}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 
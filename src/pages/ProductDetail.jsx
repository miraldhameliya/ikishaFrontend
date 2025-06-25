import React from 'react';
import { useLocation } from 'react-router-dom';
import ringImg from '../assets/icon/Diamond.png';

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

const ProductDetails = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  // In real use, get product from location.state or fetch by id from params
  const product = location.state?.product || placeholderProduct;

  return (
    <div className="p-4 bg-[#eff0f5] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-lg font-bold mb-2">Product <span className="text-sm font-normal text-gray-500">/ Product Details</span></div>
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg p-6">
          {/* Left: Main Image & Thumbnails */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center mb-4">
              <img src={product.images[0]} alt="Main" className="w-full max-w-lg h-80 object-contain rounded-lg border" />
              {/* Carousel arrows (not functional for now) */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2">&#60;</button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2">&#62;</button>
            </div>
            <div className="flex gap-2 mb-4">
              {product.images.map((img, idx) => (
                <img key={idx} src={img} alt="thumb" className="w-20 h-20 object-cover rounded border cursor-pointer" />
              ))}
            </div>
          </div>
          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="text-xl font-bold">{product.name}</div>
            <div className="text-gray-600 font-semibold">Design Code : <span className="text-gray-800">{product.design_code}</span></div>
            <div className="text-gray-600 font-semibold">Price : <span className="text-gray-800">₹ {product.price}</span></div>
            <div className="text-gray-600 font-semibold">Metal Type: <span className="text-gray-800">{product.metal_type}</span></div>
            <div className="flex gap-2 my-2">
              {/* Metal type chips (static for now) */}
              {["SIL", "10K", "12K", "14K", "18K", "18K", "22K", "PT"].map((type, i) => (
                <span key={i} className="px-2 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">{type}</span>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Diamond Type</label>
                <select className="w-full border rounded px-3 py-2 bg-gray-50">
                  <option>{product.diamond_type}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Diamond Clarity</label>
                <select className="w-full border rounded px-3 py-2 bg-gray-50">
                  <option>{product.diamond_clarity}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Related Products */}
        <div className="mt-10">
          <div className="text-xl font-bold mb-4 text-center">Related Products</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {product?.related?.map((rel, idx) => (
              <div key={idx} className="bg-[#f5f7fa] rounded-lg p-3 flex flex-col items-center">
                <img src={rel.img} alt="related" className="w-32 h-32 object-cover rounded mb-2" />
                <div className="text-xs font-bold text-gray-800">Design Code : <span className="font-medium text-gray-500">{rel.design_code}</span></div>
                <div className="text-xs font-bold text-gray-800 mt-1">Price : <span className="font-medium text-gray-500">₹{rel.price}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 
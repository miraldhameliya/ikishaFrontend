import Earing from '../assets/icon/earing.png';
import Chain from '../assets/icon/chain.png';
import Ring from '../assets/icon/ring.png';
import bracelet from '../assets/icon/necklace.png'; // Consider renaming if you have a bracelet image
import nosepin from '../assets/icon/nosepin.png';
import edit from '../assets/icon/edited.png';
import { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa";
import Header from '../components/Header';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';
import AddCategoryModel from '../components/Modal/AddCategoryModel';
import { fetchCategory, updateCategoryStatus } from '../redux/services/categoryService';

function Category() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { setRightButton } = useHeaderRightButton();
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // set right model button
  useEffect(() => {
    setRightButton(
      <span
        className="bg-[#303F26] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#26371e] font-semibold text-lg shadow"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Category
      </span>
    );
    return () => setRightButton(null); // Clean up on unmount
  }, [setShowModal, setRightButton]);

  const handleToggle = async (index) => {
    const cat = categories[index];
    const newStatus = !cat.active;
    try {
      await updateCategoryStatus({ categoryid: cat._id, status: newStatus });
      const updatedCategories = categories.map((c, i) =>
        i === index ? { ...c, active: newStatus } : c
      );
      setCategories(updatedCategories);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const loadCategory = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetchCategory({ page: pageNum, limit: 10, search: '' });
      console.log("API Response:", res);
      const allDocs = res?.Data?.docs || [];
      console.log("All Docs:", allDocs);
      const newCategories = allDocs.map((doc) => ({
        ...doc,
        image: doc.categoryimage || Earing,
        name: doc.categoryname || doc.name || 'Unknown Category',
        count: doc.count || 0,
        active: doc.status !== undefined ? doc.status : true,
      }));
      console.log("New Categories:", newCategories);
      if (pageNum === 1) {
        setCategories(newCategories);
      } else {
        setCategories(prev => [...prev, ...newCategories]);
      }
      setHasMore(allDocs.length === 10);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategory(page);
  }, [page]);

  const handleEdit = (row) => {
    setSelectedImage(row);
    setShowModal(true);
  };

  return (
    <div>
      {/* <Header rightButton={rightButton} /> */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat, index) => (
          <div key={cat._id || cat.name} className="bg-white rounded-lg shadow p-3 flex flex-col">
            <div className="relative">
              <img src={cat.categoryimage || Earing} alt={cat.categoryname} className="rounded-t-lg h-44 w-full object-cover" />
              <button className="absolute top-2 left-2 bg-white text-xs font-semibold shadow" onClick={() => handleEdit(cat)}>
                <img src={edit} alt="Edit" className="w-17 h-7 inline-block" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between p-2">
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#334155]">{cat.name}</div>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cat.active}
                      onChange={() => handleToggle(index)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 mt-5 bg-gray-200   rounded-full peer peer-checked:bg-[#303F26] transition-all duration-300"></div>
                    <div className="absolute mt-5 left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-5"></div>
                  </label>
                </div>
                <div className="text-xs text-[#64748B]">{cat.count} Products</div>
                <div className='border mt-3 border-[#C3C7BC]'></div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <a href="#" className="text-base text-[#64748B] font-semibold hover:underline">View All Product </a>
                <FaChevronRight className="text-[#64748B] text-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && <AddCategoryModel
        onClose={() => setShowModal(false)}
        categoryData={selectedImage}
        onSuccess={() => {
          setPage(1);
          loadCategory(1);
        }}
      />}
    </div>
  );
}

export default Category;

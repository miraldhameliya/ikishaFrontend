import Earing from '../assets/icon/earing.png';

import edit from '../assets/icon/edited.png';
import { useEffect, useState, useCallback } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';
import AddCategoryModel from '../components/Modal/AddCategoryModel';
import { fetchCategory, updateCategoryStatus } from '../redux/services/categoryService';

function Category() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { setRightButtonProps } = useHeaderRightButton();
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastLoadedPage, setLastLoadedPage] = useState(0);

  // set right model button
  useEffect(() => {
    setRightButtonProps({
      text: 'Add Category',
      onClick: () => {
        setSelectedImage(null); // Ensure add opens blank
        setShowModal(true);
      }
    });
    return () => setRightButtonProps(null); // Clean up on unmount
  }, [setShowModal, setRightButtonProps]);

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
      console.log(error);
      alert('Failed to update status');
    }
  };

  const loadCategory = async (pageNum = 1) => {
    // Prevent fetching if we're already loading, if there are no more pages, or if this page is already loaded.
    if (loading || (!hasMore && pageNum > 1) || pageNum <= lastLoadedPage) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetchCategory({ page: pageNum, limit: 10, search: '' });
      const allDocs = res?.Data?.docs || [];
      const totalDocs = res?.Data?.totalDocs || 0;

      console.log('Current categories:', categories.map(c => c._id));
      console.log('New docs from API:', allDocs.map(d => d._id));
      console.log(`Page: ${pageNum}, Received docs:`, allDocs.length, allDocs);

      const newCategories = allDocs.map((doc) => ({
        ...doc,
        image: doc.categoryimage || Earing,
        name: doc.categoryname || doc.name || 'Unknown Category',
        count: doc.count || 0,
        active: doc.status !== undefined ? doc.status : true,
      }));

      setCategories(prevCategories => {
        const existingIds = new Set(prevCategories.map(cat => cat._id));
        const filteredNewCategories = newCategories.filter(cat => !existingIds.has(cat._id));
        const updatedCategories = pageNum === 1 ? newCategories : [...prevCategories, ...filteredNewCategories];
        setHasMore(updatedCategories.length < totalDocs);

        console.log('Existing IDs:', Array.from(existingIds));
        console.log('Filtered new categories:', filteredNewCategories.map(c => c._id));
        console.log('Updated categories length:', updatedCategories.length, updatedCategories);

        setLastLoadedPage(pageNum);
        return updatedCategories;
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Scroll handler for infinite pagination
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Load more when user is near bottom (within 100px)
    if (scrollTop + windowHeight >= documentHeight - 100) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, hasMore]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
  if (page) {
      loadCategory(page);
  }
  
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
              <img src={cat.categoryimage || Earing} alt={cat.categoryname} className="h-44 w-full object-cover" />
              <button className="absolute top-2 left-2 bg-white text-xs font-semibold shadow" onClick={() => handleEdit(cat)}>
                <img src={edit} alt="Edit" className="w-17 h-7 inline-block" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between p-2">
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#334155] text-30">{cat.name}</div>
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
                <div className="text-24 text-[#64748B]">{cat.count} Products</div>
                <div className='border mt-3 border-[#C3C7BC]'></div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <a href="#" className="text-24 text-[#64748B] font-semibold hover:underline">View All Product </a>
                <FaChevronRight className="text-[#64748B] text-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="p-4">
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
          {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#303F26]"></div>
          <span className="ml-2 text-[#303F26]">Loading more categories...</span> */}
        </div>
      )}

      {/* No more data indicator */}
      {!hasMore && categories.length > 0 && (
        <div className="text-center p-6 text-[#64748B]">
          No more categories to load
        </div>
      )}

      {showModal && <AddCategoryModel
        onClose={() => setShowModal(false)}
        categoryData={selectedImage}
        onSuccess={() => {
          setPage(1);
          setLastLoadedPage(0);
          loadCategory(1);
        }}
      />}
    </div>
  );
}

export default Category;

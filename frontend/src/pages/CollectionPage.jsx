import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa6';
import FilterSidebar from './FilterSidebar';
import ProductGrid from '../components/Products/ProductGrid';
import SortOptions from './SortOptions';
import API from '../api/axios';
import { toast } from 'sonner';

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [collection, searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = new URLSearchParams();
      
      // Category from URL
      if (collection) {
        params.set('category', collection);
      }
      
      // Add filters from search params
      searchParams.forEach((value, key) => {
        if (value) params.set(key, value);
      });

      // Default pagination
      params.set('limit', searchParams.get('limit') || '12');
      params.set('page', searchParams.get('page') || '1');

      const { data } = await API.get(`/products?${params.toString()}`);
      setProducts(data.data);
      setTotalProducts(data.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row'>
        {/* Mobile Filter Button */}
        <button 
          onClick={toggleSidebar}
          className='lg:hidden border p-2 flex justify-center items-center'
        >
          <FaFilter className='mr-2' /> Filters
        </button>

        {/* FilterSidebar */}
        <div 
          ref={sidebarRef}
          className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 w-64 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
        >
          <FilterSidebar 
            searchParams={searchParams} 
            setSearchParams={setSearchParams}
          />
        </div>

        <div className='flex-grow p-6'>
          <h1 className='text-2xl uppercase mb-4'>
            {collection || 'All Products'} 
            <span className='text-gray-500 text-lg ml-2'>
              ({totalProducts} products)
            </span>
          </h1>
          
          <SortOptions 
            searchParams={searchParams} 
            setSearchParams={setSearchParams}
          />

          {loading ? (
            <div className="text-center py-20 text-xl">Loading products...</div>
          ) : products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20 text-xl text-gray-500">
              No products found. Try adjusting filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CollectionPage;

import React, { useState, useEffect } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionSection from '../components/Products/GenderCollectionSection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductGrid from '../components/Products/ProductGrid';
import FeatureSection from "../components/Products/FeatureSection";
import FeaturedCollection from '../components/Products/FeaturedCollection';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [newArrivals, setNewArrivals] = useState([]);
  const [topWearProducts, setTopWearProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Fetch new arrivals (latest products)
      const newArrivalsRes = await API.get('/products?sort=newest&limit=8');
      setNewArrivals(newArrivalsRes.data.data);
      
      // Fetch top wear for women
      const topWearRes = await API.get('/products?category=Top Wear&gender=Women&limit=8');
      setTopWearProducts(topWearRes.data.data);
      
      // Fetch featured products
      const featuredRes = await API.get('/products/featured');
      setFeaturedProducts(featuredRes.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      
      <NewArrivals products={newArrivals} />
      
      <h2 className='font-semibold underline text-2xl text-center mb-2'>Best Sellers.</h2>
      
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Women</h2>
        <ProductGrid products={topWearProducts} />
      </div>
      
      <FeaturedCollection />
      <FeatureSection />
    </div>
  );
};

export default Home;

import { toast } from "sonner";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TiMinus, TiPlus } from "react-icons/ti";
import ProductGrid from "./ProductGrid";
import API from "../../api/axios";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data.data);
      if (data.data?.images?.length > 0) {
        setMainImage(data.data.images[0].url);
      }
      
      // Fetch similar products (same category, excluding current product)
      const similarRes = await API.get(`/products?category=${data.data.category}&limit=4`);
      const filtered = similarRes.data.data.filter(p => p._id !== id).slice(0, 4);
      setSimilarProducts(filtered);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color", { duration: 1000 });
      return;
    }
    
    setButtonDisabled(true);
    try {
      await addToCart(product, quantity, selectedSize, selectedColor);
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setButtonDisabled(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
      <div className='flex flex-col md:flex-row'>

        {/* LEFT THUMBNAILS */}
        <div className='hidden md:flex flex-col space-y-4 mr-6'>
          {product.images.map((image, index) => (
            <img
              key={image.url || index}
              className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              loading="lazy"
              onClick={() => setMainImage(image.url)}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className='md:w-1/2'>
          <div className='mb-4'>
            <img
              src={mainImage}
              alt={product.name}
              className='w-full h-auto object-cover rounded-lg'
            />
          </div>
        </div>

        {/* MOBILE THUMBNAILS */}
        <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
          {product.images.map((image, index) => {
            const isActive = mainImage === image.url;
            return (
              <div
                key={image.url || index}
                className={`p-[2px] rounded-lg ${isActive ? "border-2 border-black" : "bg-gray-200"}`}
              >
                <img
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  onClick={() => setMainImage(image.url)}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className='md:w-1/2 md:ml-10'>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>

          <p className='text-lg text-gray-500 mb-1 line-through'>
            Rs. {product.originalPrice || product.price}
          </p>
          <p className='text-xl text-gray-700 mb-2'>Rs. {product.price}</p>
          
          <p className='text-gray-600 mb-4'>{product.description}</p>

          {/* COLORS */}
          <div className='mb-5'>
            <p className='text-gray-600 font-bold'>Colors:</p>
            <div className='flex gap-3 mt-2 ml-2'>
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.toLowerCase() }}
                  className={`h-9 w-9 ml-2 rounded-full border ${
                    selectedColor === color ? "border-4 border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className='flex items-center px-3 py-3 mt-2 mb-3'>
            <h4 className='text-gray-700 text-xl font-bold mr-3'>Size:</h4>
            {product.size.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 ml-2 rounded-full border py-2 transition ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "text-gray-600 border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* QUANTITY */}
          <div className='flex items-center mb-4'>
            <p className='text-gray-700 mr-3'>Quantity</p>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className='p-2 bg-gray-200 rounded'
            >
              <TiMinus />
            </button>
            <span className='mx-3 text-lg'>{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className='p-2 bg-gray-200 rounded'
            >
              <TiPlus />
            </button>
          </div>

          <button 
            disabled={isButtonDisabled} 
            onClick={handleAddToCart} 
            className={`bg-black text-white py-2 px-6 rounded w-full mb-6 ${
              isButtonDisabled ? "cursor-not-allowed opacity-60" : "hover:bg-gray-900"
            }`}
          >
            {isButtonDisabled ? "Adding..." : "Add to cart"}
          </button>

          {/* CHARACTERISTICS */}
          <div className="text-gray-700">
            <h3 className="text-xl font-bold mb-3">Characteristics:</h3>
            <table className="w-full text-left text-sm">
              <tbody>
                <tr>
                  <td className="py-2">Brand:</td>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <td className="py-2">Material:</td>
                  <td>{product.material}</td>
                </tr>
                {product.rating && (
                  <tr>
                    <td className="py-2">Rating:</td>
                    <td>⭐ {product.rating.toFixed(1)} ({product.numReviews} reviews)</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* REVIEWS SECTION */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">You may also like this</h2>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

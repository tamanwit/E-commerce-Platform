import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getProductById } from "../services/productService";
import axios from 'axios'
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchCart, orderPlaced, startNewOrder } = useCart();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProductById(id);

                setProduct(data.product);

            } catch (err) {
                console.log(err);

                setError(
                    "Something went wrong while loading the product."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    const addToWishlist = async (id)=>{
        try{
            await axios.post(`http://localhost:8000/customer/wishlist/${id}`,{}, { 
                withCredentials : true,
            })
        } catch(error){
            console.log(error)
        }
    }
    const addToCart = async (id)=>{
        try{
            if (orderPlaced && !(await startNewOrder())) {
                return;
            }
            await axios.post(`http://localhost:8000/customer/cart/${id}`,{}, { 
                withCredentials : true,
            })
            await fetchCart()
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={() => navigate("/products")}>
                Back to Products
            </button>

            <h1>{product.name}</h1>

            <img
                src={product.image}
                alt={product.name}
                width="400"
            />

            <p>{product.description}</p>

            <p>Price: ₹{product.price}</p>

            <p>Category: {product.category}</p>

            <p>Stock: {product.stock}</p>

            <button onClick={()=>addToWishlist(id)}>
                Add to Wishlist
            </button>
            <button onClick={()=>addToCart(id)}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetails;

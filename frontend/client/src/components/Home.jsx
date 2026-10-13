import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    };
    const toProducts = ()=>{
        navigate('/products')
    }
    return (
        <div>
            <p>Home</p>
            <button onClick={toProducts}>Product Page</button>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Home;
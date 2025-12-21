/* eslint-disable react/jsx-no-undef */

import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart, getCartCount } from './CartContext';

export default function Navbar(props) {

    const cart = useCart();
    let navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", position: "fixed", zIndex: "10", width: "100%", top: 0 }}>
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src="/fooddasher-logo.svg" alt="FoodDash" style={{height: '40px', width: 'auto'}} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {(!localStorage.getItem("authToken")) && (
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3" to="/restaurants">Browse Restaurants</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorders">My Orders</Link>
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form> :
                            <div>
                                <Link className="btn bg-white text-success mx-2" to="/cart">
                                    <Badge color="secondary" badgeContent={getCartCount(cart)}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </Link>

                                <button onClick={handleLogout} className="btn bg-white text-success">Logout</button>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

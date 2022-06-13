import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, Route, Routes} from "react-router-dom";
import { Navigate } from "react-router-dom";
import DashBoard from "./Owner_Panel/Dashboard.js";
import Product from "./Owner_Panel/Product.js";
import Orders from "./Owner_Panel/Orders.js";

//Creates the React function that will be rendered in the app Page through routes
const Owner_Panel = function (props) {

    if (!props.user.Owner) {
        return <Navigate to="/" replace />;
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar-sticky sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/Owner_Panel">
                                    <span data-feather="home" className="align-text-bottom"></span>
                                    DashBoard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Owner_Panel/Orders">
                                    <span data-feather="file" className="align-text-bottom"></span>
                                    Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Owner_Panel/Product_Creation">
                                    <span data-feather="shopping-cart" className="align-text-bottom"></span>
                                    Products Creation
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {/* {content == "DashBoard" ? <DashBoard /> : null}
                    {content == "Products" ? <Product/> : null} */}

                    <Routes>
                        <Route path="/" element={<DashBoard />} />
                        <Route path={'/Product_Creation'} element={<Product/>} />
                        <Route path={'/Orders'} element={<Orders/>} />
                    </Routes>
                </main>

            </div>
        </div>
    )
}

export default Owner_Panel;
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, Route, Routes} from "react-router-dom";
import { Navigate } from "react-router-dom";
import DashBoard from "./Owner_Panel/Dashboard.js";
import Product from "./Owner_Panel/Product.js";

//Creates the React function that will be rendered in the app Page through routes
const Owner_Panel = function (props) {

    const [content, setContent] = useState('DashBoard');

    if (!props.user.Owner) {
        return <Navigate to="/" replace />;
    }

    //Function to set the search variable when there is a change in the form
    const ChangeContentHandler = e => {
        const contentTemp = e.target.innerText;
        console.log(content)
        setContent(contentTemp)

    }



    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/Owner_Panel" onClick={ChangeContentHandler}>
                                    <span data-feather="home" className="align-text-bottom"></span>
                                    DashBoard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={ChangeContentHandler}>
                                    <span data-feather="file" className="align-text-bottom"></span>
                                    Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Owner_Panel/Product_Creation" onClick={ChangeContentHandler}>
                                    <span data-feather="shopping-cart" className="align-text-bottom"></span>
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={ChangeContentHandler}>
                                    <span data-feather="users" className="align-text-bottom"></span>
                                    Customers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={ChangeContentHandler}>
                                    <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                                    Reports
                                </a>
                            </li>
                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                            <span>Saved reports</span>
                            <a className="link-secondary" href="#" aria-label="Add a new report">
                                <span data-feather="plus-circle" className="align-text-bottom"></span>
                            </a>
                        </h6>
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text" className="align-text-bottom"></span>
                                    Current month
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text" className="align-text-bottom"></span>
                                    Last quarter
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text" className="align-text-bottom"></span>
                                    Social engagement
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text" className="align-text-bottom"></span>
                                    Year-end sale
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
                    </Routes>
                </main>

            </div>
        </div>
    )
}

export default Owner_Panel;
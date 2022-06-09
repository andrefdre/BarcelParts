import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { Chart } from "chart.js";
import ProductDataService from "../Services/Barcelparts.js"
import DashBoard from "./Dashboard.js";

//Creates the React function that will be rendered in the app Page through routes
const Owner_Panel = function (props) {
    if (!props.user.Owner) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/Owner_Panel/">
                                    <span data-feather="home" className="align-text-bottom"></span>
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file" className="align-text-bottom"></span>
                                    Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"></span>
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="users" className="align-text-bottom"></span>
                                    Customers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                                    Reports
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="layers" className="align-text-bottom"></span>
                                    Integrations
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
                
                    <DashBoard />


            </div>
        </div>
    )
}

export default Owner_Panel;
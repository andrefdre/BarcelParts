import React from "react";
import { Route, Routes} from "react-router-dom";
import { Navigate } from "react-router-dom";
import DashBoard from "./Owner_Panel/Dashboard.js";
import Product from "./Owner_Panel/Product.js";
import Orders from "./Owner_Panel/Orders.js";

//Creates the React function that will be rendered in the app Page through routes
const Owner_Panel = function (props) {

    //If the User isn't a Owner send him to the main page
    if (!props.user.Owner) {
        return <Navigate to="/" replace />;
    }

    //Displays the content page
    return (
        <div className="container-fluid">
            {/* Sidebar Menu to change between the pages */}
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
                                    All Orders
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

                {/* Main content of the page that will route to the chosen page */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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
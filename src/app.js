//Declares the imports necessary for this page
import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Main_Page from './Pages/Main_Page';
import Research_Page from './Pages/Research_Page';
import Catalog_Page from './Pages/Catalog_Page';
import Register_Page from './Pages/Register_Page';
import Login_Page from "./Pages/Login_Page";
import MyData_Page from './Pages/MyData_Page';
import About_Page from './Pages/About_Page'
import Product_Page from './Pages/Product_Page'
import Cart_Page from './Pages/Cart_Page'
import OrderHistory_Page from './Pages/OrderHistory_Page'
import Owner_Panel from "./Pages/Owner_Panel";
import { IsAuthenticated } from './Services/auth'
import ProductDataService from "./Services/Barcelparts.js"


//Creates the React function that will be rendered in the index Page
function App() {

    // Declares the Global variables
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [search_url, setSearch_url] = useState("/Research_Page");
    const [Categories, setCategories] = useState([]);

    //Function that will send a get request to the backend to retrieve the categories to display in the page
    async function getCategories() {
        ProductDataService.getCategories()
            .then(response => {
                //Stores the acquired data in categories variable
                setCategories(response.data);
                //Set isLoading variable to display the contents in the page
                setIsLoading(false)
            })
            //If there is any erros catch them and display them
            .catch(e => {
                console.log(e);
            });
    };

    //Function that will only run once
    useEffect(() => {
        //Calls the function that verifies if the user is logged in and retrieves the user data
        IsAuthenticated()
            .then(response => {
                //console.log(response[0])
                if (response[0] == true) {
                    // If the User is authenticated sets the user and IsAuthenticated variable
                    setIsAuthenticated(true)
                    setUser(response[1])
                }
                else {
                    //If the User isn't authenticated set it to false
                    setIsAuthenticated(false)
                }
                //Calls the function to retrieve the categories
                getCategories()
            })
    }, [])

    //Function to set the search variable when there is a change in the form
    const onChangeSearch = e => {
        const search = e.target.value;
        setSearch(search);
        //Sets the search url to retrieve the search parameters in the research page
        setSearch_url("/Research_Page?by=Design&query=" + search)
    }


    //Verifies if the page is still Loading if not display the contents
    if (isLoading == false) {
        return (
            <div>
                {/* <!-- Creates the Nav that will disappear --> */}
                <nav className="navbar navbar-expand-lg navbar-light first-navbar">
                    {/* <!-- Uses the className container fluid to have the navbar expand all the page --> */}
                    <div className="container-fluid ">
                        {/* <!--Creates the logo image --> */}
                        <a className="navbar-brand"><img className="Logo" src="/Assets/Images/logo.jpeg" alt=""></img></a>
                        <div className="group-brand">
                            {isAuthenticated == true ? (
                                <p>
                                    Group TRUSTAUTO - Welcome back, {user.User_FirstName}&nbsp;&nbsp;
                                    <img className="UserImage" src={user.User_Image} alt=""></img>
                                </p>
                            ) : (
                                <>Group TRUSTAUTO</>
                            )
                            }
                        </div>
                        {/* <!-- Creates the Components justified to the end of the page such as Account information and the cart item --> */}
                        <div className="justify-content-end">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 first-navbar">
                                {/* If there is a user display information about account if there is change to a button to create/login to account */}
                                {isAuthenticated == true ? (
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            My Account
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="/MyData_Page">My data</a></li>

                                            <li><a className="dropdown-item" href="/OrderHistory_Page">Buying History</a></li>
                                            {user.Owner ? (
                                                <li><a className="dropdown-item" href="/Owner_Panel">Owner Panel</a></li>
                                            )
                                                : (
                                                    <li></li>
                                                )

                                            }

                                            <li><a className="dropdown-item" onClick="" href="./">Sign Out</a></li>
                                        </ul>
                                    </li>
                                ) : (
                                    <a className="nav-link first-navbar" aria-current="page" href="/Login_Page">
                                        <div style={{ position: "relative" }}>
                                            <i className="fa-solid fa-user"></i>
                                            Login/Register
                                        </div>
                                    </a>
                                )
                                }
                                {/* <!-- Cart icon --> */}
                                <li>
                                    <a className="nav-link first-navbar" aria-current="page" href={user ? "/Cart_Page" : "Register_Page?redirect=Cart_Page"}>
                                        <div style={{ position: "relative" }}>
                                            <i className="fa-solid fa-cart-shopping" style={{ border: "2px solid #00a1b6", "borderRadius": "50%", padding: "5px" }}></i>
                                            <span style={{ position: "absolute", right: "-5px", bottom: "18px" }}>{user == null ? 0 : user.Carrinho.length}</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* <!-- Creates the Navbar that will stick to the top --> */}
                <nav className="navbar sticky-top navbar-expand-lg navbar-light second-navbar">
                    {/* <!-- Uses the className container fluid to have the navbar expand all the page --> */}
                    <div className="container-fluid">
                        {/* <!-- Adds the Company name to the navbar --> */}
                        <a className="navbar-brand" href="/">BarcelParts</a>
                        {/* <!-- Adds the research form  --> */}
                        <div className="row justify-content-end">
                            <div className="col-10 d-none d-md-flex d-lg-none">
                                {/* Form that will retrieve the search parameter to search the database */}
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" value={search} placeholder="Search" onChange={onChangeSearch} aria-label="Search"></input>
                                    <Link to={search_url} className="btn btn-outline-secondary align-items-center" onClick={true} type="button">Search</Link>
                                </form>
                            </div>
                            {/* <!-- Adds the hamburger button that will appear when the page is shrunken to display the items in the navbar so it looks cleaner in small screens --> */}
                            <button className="col-md-2 navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>

                        {/* <!-- Items that will be displayed in the navbar that will go inside the Hamburger button when page is shrunken --> */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/* <!-- Adds a navbar dropdown which will have all the categories in the Website --> */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Categories
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {/* Creates a submenu for the Sub-Categories  */}
                                        {Categories.Categories.map((Category, index) => {
                                            if (Categories.SubCategory.length > 0) {
                                                return (
                                                    <li className="dropdown-submenu" key={Category}>
                                                        <a className="dropdown-item" href={"/Research_Page?by=NomeFamilia&query=" + Category} >{Category}</a>
                                                        <ul className="dropdown-menu">
                                                            {Categories.SubCategory[index].map((SubCategory) => {
                                                                return (
                                                                    <li key={Category + SubCategory}><a className="dropdown-item" href={"/Research_Page?by=NomeFamilia&query=" + SubCategory}>{SubCategory}</a></li>
                                                                )
                                                            })
                                                            }
                                                        </ul>
                                                    </li>
                                                )
                                            }
                                            else {
                                                return (
                                                    <li key={Category}><a className="dropdown-item" href={"/Research_Page?by=NomeFamilia&query=" + Category} >{Category}</a></li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </li>

                                {/* <!-- Other navbar items that will appear in the navbar --> */}
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/Catalog_Page">Catalog</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/About_Page">About</a>
                                </li>
                            </ul>
                            {/* <!-- Adds the research form  --> */}
                            <form className="d-flex d-md-none">
                                <input className="form-control me-2" type="search" value={search} onChange={onChangeSearch} placeholder="Search" aria-label="Search"></input>
                                <Link to={search_url} className="btn btn-outline-secondary" onClick={true} type="button">Search</Link>
                            </form>
                        </div>
                        {/* <!-- Adds the research form  --> */}
                        <form className="d-none d-lg-flex">
                            <input className="form-control me-2" type="search" value={search} onChange={onChangeSearch} placeholder="Search" aria-label="Search"></input>
                            <Link to={search_url} className="btn btn-outline-secondary" onClick={true} type="button">Search</Link>
                        </form>
                    </div>
                </nav>

                {/* Where all the rest of the page will be presented depending on the route */}
                <div className="">
                    {/* Routes to the correct pages based on the path of the Page and passes the props to the child Pages */}
                    <Routes>
                        <Route path="/" element={<Main_Page />} />
                        <Route path="/Research_Page" element={<Research_Page />} />
                        <Route path="/Catalog_Page" element={<Catalog_Page />} />
                        <Route path='/Register_Page' element={<Register_Page />} />
                        <Route path='/Login_Page' element={<Login_Page />} />
                        {user ? <Route path="/MyData_Page" element={<MyData_Page user={user} />} /> : null }
                        {user ? <Route path="/OrderHistory_Page" element={<OrderHistory_Page user={user} />}/> : null}
                        <Route exact path='/About_Page' element={<About_Page />} />
                        <Route path='/Product_Page' element={<Product_Page user={user} />} />
                        {user ? <Route path='/Owner_Panel/*' element={<Owner_Panel user={user} />} /> : null}
                        {user ? <Route exact path='/Cart_Page' element={<Cart_Page user={user} />} /> : null}
                        <Route path="*" element={<p>There's nothing here: 404!</p>} />
                    </Routes>
                </div>

                {/* <!-- Code for footer --> */}
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'flow-root', height: '70px' }}>
                    {/* <!-- Adds the symbols of the Social networks to be displayed after  --> */}
                    <symbol id="facebook" viewBox="0 0 16 16">
                        <path
                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </symbol>
                    <symbol id="instagram" viewBox="0 0 16 16">
                        <path
                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </symbol>
                    <symbol id="twitter" viewBox="0 0 16 16">
                        <path
                            d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </symbol>
                </svg>

                {/* <!-- Creates the footer with a container-fluid className so it goes all the webpage and fixes it to the bottom  --> */}
                <div className="container-fluid fixed-bottom">
                    {/* <!-- Creates a footer and organizes how the content will be displayed --> */}
                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3">
                        {/* <!-- Adds the logo and company name  --> */}
                        <div className="col-md-2 d-flex align-items-center">
                            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1 navbar-brand">
                                <img className="Logo-footer" src="/Assets/Images/Logo.jpeg" alt=""></img>
                            </a>
                            <span className="text-muted">BarcelParts</span>
                        </div>
                        {/* <!-- Adds the Social accounts  --> */}
                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                            {/* <!-- <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#twitter" /></svg></a></li> --> */}
                            <li className="ms-3"><a className="text-muted" href="https://www.instagram.com/explore/tags/barcelparts/"><svg
                                className="bi" width="24" height="24">
                                <use xlinkHref="#instagram" />
                            </svg></a></li>
                            <li className="ms-3"><a className="text-muted" href="https://www.facebook.com/barcelparts.trust"><svg className="bi"
                                width="24" height="24">
                                <use xlinkHref="#facebook" />
                            </svg></a></li>
                        </ul>
                    </footer>
                </div>
            </div>)
    }
    //While the page is still loading render an animation
    else {
        return (
            <div className="loader-wrapper">
                <div className="loader">
                    <img src="/Assets/Images/logo_noBackground.svg" />
                </div>
            </div>
        )
    }
}

export default App;
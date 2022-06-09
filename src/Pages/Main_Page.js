//Declares the imports necessary for this page
import React, { useState, useEffect } from "react";

//Creates the React function that will be rendered in the app Page through routes
function Main_Page() {

  //Html that will be rendered 
  return (
    <div>
      {/* Display the carrousel images */}
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* <!-- Adds the small lines to indicate which image is showing at the bottom  --> */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          {/* <!-- Adds the first image to be displayed  --> */}
          <div className="carousel-item active">
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
              preserveAspectRatio="xMidYMid meet" focusable="false">
              <image width="100%" xlinkHref="./Assets/Images/trust.svg" x="0" y="0" />
            </svg>
          </div>
          {/* <!-- Adds the second image to be displayed --> */}
          <div className="carousel-item">
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <image width="100%" xlinkHref="./Assets/Images/frontstore.svg" x="0" y="0" />
            </svg>
          </div>
          {/* <!-- Adds the third image to be displayed --> */}
          <div className="carousel-item">
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <image width="100%" xlinkHref="./Assets/Images/trust-1.svg" x="0" y="0" />
            </svg>
          </div>
        </div>
        {/* <!-- Adds the buttons to go forwards and backwards in the images  --> */}
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* <!-- Items that will not be displayed with all width of the Page --> */}
      <div className="container-md ">
        {/* <!-- Trusted Brands Display --> */}
        <h2>Trusted Brands</h2>
        {/* <!-- Adds a line to make it more styled   --> */}
        <hr className="break-line"></hr>
        {/* <!-- Creates a div to group a className of Displayed items  --> */}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 d-flex justify-content-around">
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" viewBox="0 0 250 250" aria-label="Placeholder: Thumbnail" preserveAspectRatio="none"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Trust_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="/Research_Page?by=Marca&query=TRUSTAUTO">Trust</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/SKF_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="/Research_Page?by=Marca&query=SKF">SKF</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/SWAG_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="/Research_Page?by=Marca&query=SWAG">SWAG</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/OCAP_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="/Research_Page?by=Marca&query=OCAP">OCAP</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display d-none d-md-block">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Hengst_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="/Research_Page?by=Marca&query=HENGST FILTER">Hengst</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display d-none d-md-block">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Pagid_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="/Research_Page?by=Marca&query=HELLA PAGID">Pagid</a>
            </div>
          </div>
        </div>

        {/* <!-- Best Sellers  --> */}
        <br></br>
        <h2>Best Sellers</h2>
        {/* <!-- Adds a line to make it more styled   --> */}
        <hr className="break-line"></hr>
        {/* <!-- Creates a div to group a className of Displayed items  --> */}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 d-flex justify-content-around">
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-item-body">
              <a className="item d-flex" href="#">Bellows Transmission, Direction and Suspension</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-item-body">
              <a className="item d-flex" href="#">UNIVERSAL ACCESSORIES</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-item-body">
              <a className="item d-flex" href="#">BluePrint</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="#">BluePrint</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display d-none d-md-block">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="#">BluePrint</a>
            </div>
          </div>
          {/* <!-- Displayed item with the image and Title  --> */}
          <div className="col item-display d-none d-md-block">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                focusable="false">
                <title>Placeholder</title>
                <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
              </svg>
            </div>
            <div className="card-body">
              <a className="brand" href="#">BluePrint</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main_Page;
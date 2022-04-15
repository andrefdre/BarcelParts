// client/src/App.js
import React from "react";

function Main_Page() {

    return (
      <React.Fragment>
        {/* <!-- Main Content of the Webpage --> */}

        {/* <!-- Carousel --> */}
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
          {/* <!-- Adds the small lines to indicate which image is showing at the bottom  --> */}
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true"
              aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div class="carousel-inner">
            {/* <!-- Adds the first image to be displayed  --> */}
            <div class="carousel-item active">
              <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                preserveAspectRatio="xMidYMid meet" focusable="false">
                <image width="100%" xlinkHref="./Assets/Images/trust.svg" x="0" y="0" />
              </svg>
            </div>
            {/* <!-- Adds the second image to be displayed --> */}
            <div class="carousel-item">
              <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                preserveAspectRatio="xMidYMid slice" focusable="false">
                <image width="100%" xlinkHref="./Assets/Images/frontstore.svg" x="0" y="0" />
              </svg>
            </div>
            {/* <!-- Adds the third image to be displayed --> */}
            <div class="carousel-item">
              <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                preserveAspectRatio="xMidYMid slice" focusable="false">
                <image width="100%" xlinkHref="./Assets/Images/trust-1.svg" x="0" y="0" />
              </svg>
            </div>
          </div>
          {/* <!-- Adds the buttons to go forwards and backwards in the images  --> */}
          <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        {/* <!-- Items that will not be displayed with all width of the Page --> */}
        <div class="container-md">
          {/* <!-- Trusted Brands Display --> */}
          <h2>Trusted Brands</h2>
          {/* <!-- Adds a line to make it more styled   --> */}
          <hr class="break-line"></hr>
          {/* <!-- Creates a div to group a class of Displayed items  --> */}
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6">
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" viewBox="0 0 250 250" aria-label="Placeholder: Thumbnail" preserveAspectRatio="none"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">BluePrint</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">BluePrint</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/SKF_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">SKF</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">SKF</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/SWAG_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">SWAG</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">SWAG</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Trust_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">Trust</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">Trust</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display d-none d-md-block">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">SWAG</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">BluePrint</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display d-none d-md-block">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">SWAG</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">BluePrint</a>
              </div>
            </div>
          </div>

          {/* <!-- Best Sellers  --> */}
          <br></br>
          <h2>Best Sellers</h2>
          {/* <!-- Adds a line to make it more styled   --> */}
          <hr class="break-line"></hr>
          {/* <!-- Creates a div to group a class of Displayed items  --> */}
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6">
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">Metal-Rubber</text>
                </svg>
              </div>
              <div class="card-item-body">
                <a class="item d-flex" href="#">Bellows Transmission, Direction and Suspension</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">UNIVERSAL ACCESSORIES</text>
                </svg>
              </div>
              <div class="card-item-body">
                <a class="item d-flex" href="#">UNIVERSAL ACCESSORIES</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">SWAG</text>
                </svg>
              </div>
              <div class="card-item-body">
                <a class="item d-flex" href="#">BluePrint</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">SWAG</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">BluePrint</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display d-none d-md-block">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">SWAG</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">BluePrint</a>
              </div>
            </div>
            {/* <!-- Displayed item with the image and Title  --> */}
            <div class="col item-display d-none d-md-block">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" aria-label="Placeholder: Thumbnail" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid slice"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">SWAG</text>
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#">BluePrint</a>
              </div>
            </div>



          </div>
        </div>

      </React.Fragment>
    )
  }

export default Main_Page;
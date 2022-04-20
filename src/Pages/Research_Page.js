import React, { useState, useEffect } from "react";
import ProductDataService from "../Services/Barcelparts.js"


const Research_Page = function (props) {

  const [products, setProducts] = useState([]);


  const getAll = () => {
    ProductDataService.getAll()
      .then(response => {
        console.log(response.data);
        setProducts(response.data.products);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
   <div className="container-md">
     <br></br>
     <h2>{props.search_display}</h2>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6">
        {props.products.map((products) => {
          return (
              <div class="col item-display mb-3">
              <div class="card shadow-sm">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                  role="img" viewBox="0 0 250 250" aria-label="Placeholder: Thumbnail" preserveAspectRatio="none"
                  focusable="false">
                  <title>Placeholder</title>
                  <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                </svg>
              </div>
              <div class="card-body">
                <a class="brand" href="#" style={{'font-size':'1rem', 'alignItems':'center'}}>{products.Design}</a>
                <p className="card-text">
                    <strong>Producer: </strong>{products.Marca}<br />
                    <strong>Price: </strong>{products.PrecoCusto}<br />
                  </p>
            </div>
            </div>
          );
        })
        }
      </div>
    </div>
  );
}


export default Research_Page;
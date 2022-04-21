import React, { useState, useEffect } from "react";
import ProductDataService from "../Services/Barcelparts.js"

const Research_Page = function (props) {

  const [Categories, setCategories] = useState([]);

  const getCategories = () => {
    ProductDataService.getCategories()
      .then(response => {
        //console.log(response.data);
        setCategories(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const [products, setProducts] = useState([]);


  // const getAll = () => {
  //   ProductDataService.getAll()
  //     .then(response => {
  //       console.log(response.data);
  //       setProducts(response.data.products);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };


  useEffect(() => {
    getCategories()
  }, []) // <-- empty dependency array

  return (
    <div className="container-md">
      <br></br>
      <div className="row d-flex">
        <div className="col-3">
          <h2>Categories</h2>
        </div>
        <div className="col-9">
          <h2>{props.search_display}</h2>
        </div>
      </div>
      <div className="row no-gutters w-100">
        <div className="col-3">
          {Categories.map((Categorie) => {
            return (
              <div>
                <a className="item" href="#">{Categorie}</a>
                <br></br>
              </div>
            )
          })}
        </div>
        <div class="vr"></div>
        <div className="col-9 row row-cols-2 row-cols-md-3 row-cols-lg-4 h-100">
          {props.products.map((product) => {
            return (
              <div className="col item-display mb-3" key={product._id}>
                <div className="card shadow-sm">
                  <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                    role="img" viewBox="0 0 250 250" aria-label="Placeholder: Thumbnail" preserveAspectRatio="none"
                    focusable="false">
                    <title>Placeholder</title>
                    <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  </svg>
                </div>
                <div className="card-body">
                  <a className="brand" href="#" style={{ 'fontSize': '1rem', 'alignItems': 'center' }}>{product.Design}</a>
                  <p className="card-text">
                    <strong>Producer: </strong>{product.Marca}<br />
                    <strong>Price: </strong>{product.PrecoCusto}€<br />
                  </p>
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
    </div>
  );
}


export default Research_Page;
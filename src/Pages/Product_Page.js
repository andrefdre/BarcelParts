import React, { useState, useEffect } from "react";
import ProductDataService from "../Services/Barcelparts.js"
import { Link } from "react-router-dom"

const Product_Page = props => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName ] = useState("");




  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

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




  const find = (query, by) => {
    ProductDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setProducts(response.data.products);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };


  

  return (
    <React.Fragment>
      {getAll()}
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        
      </div>

      <div className="row">
        {products.map((products) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{products.Design}</h5>
                  <p className="card-text">
                    <strong>Producer: </strong>{products.Marca}<br/>
                    <strong>Price: </strong>{products.PrecoCusto}<br/>
                  </p>
                </div>
              </div>
            </div>
          );
        })}


      </div>


      </React.Fragment>
  );
}


export default Product_Page;
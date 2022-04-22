//Declares the imports necessary for this page
import React, { useState, useEffect } from "react";
import ProductDataService from "../Services/Barcelparts.js"

//Creates the React function that will be rendered in the app Page through routes
const Research_Page = function (props) {

  //Creates the variable for categories
  const [Categories, setCategories] = useState([]);


  //Function that will send a get request to the backend to retrieve the categories to display in the page
  const getCategories = () => {
    ProductDataService.getCategories()
      .then(response => {
        //Stores the acquired data in categories variable
        setCategories(response.data);
      })
      //If there is any erros catch them and display them
      .catch(e => {
        console.log(e);
      });
  };


  // Code necessary to retrieve all the products will be implemented in the products page
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


  //useEffect to run a function only once since the dependency array is empty
  useEffect(() => {
    //Runs the getCategories function
    getCategories()
  }, []) // <-- empty dependency array

  //Html that will be rendered 
  return (
    //div that has the class container to display within a percentage of the page
    <div className="container-md">
      {/* break line for spacing from the navbar  */}
      <br></br>
      {/* Row for displaying the search word and categories title */}
      <div className="row d-flex">
        <div className="col-3">
          <h2>Categories</h2>
        </div>
        <div className="col-9">
          <h2>{props.search_display}</h2>
        </div>
      </div>
      {/* Row for displaying the categories retrieved from database and search results */}
      <div className="row w-100">
        <div className="col-3">
          {/* Function that will loop through each element of Categories array and print each Category in the Page  */}
          {Categories.map((Category) => {
            return (
              <div>
                {/* Display each Category */}
                <a className="item" href="#">{Category}</a>
                <br></br>
              </div>
            )
          })}
        </div>
        {/* Creates a vertical line to split Categories and search results */}
        <div class="vr"></div>
        {/* Creates a row for displaying search results */}
        <div className="col-9 row row-cols-2 row-cols-md-3 row-cols-lg-4 h-100">
          {/* Function that will loop through each element of Products array and print each Product information in the Page  */}
          {props.products.map((product) => {
            return (
              <div className="col item-display mb-3 h-100" key={product._id}>
                <div className="card shadow-sm">
                  {/* Display image that will be acquired by API */}
                  <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                    role="img" viewBox="0 0 250 250" aria-label="Placeholder: Thumbnail" preserveAspectRatio="none"
                    focusable="false">
                    <title>Placeholder</title>
                    <image width="100%" xlinkHref="./Assets/Images/Blueprint_logo.svg" x="0" y="0" />
                  </svg>
                </div>
                {/* Place where information from each product will be displayed */}
                <div className="card-body ">
                  <a className="brand d-flex justify-content-center" href="#" style={{ 'fontSize': '0.9rem'}}>{product.Design}</a>
                  <p className="card-text d-flex justify-content-center" style={{ 'fontSize': '0.7rem'}}>
                    <strong >Producer: </strong>{product.Marca}</p>
                    {product.NumArmazem > 0 
                    ? <p><strong className="d-flex justify-content-center" style={{'fontSize': '0.7rem', 'color': '#3eb94f'}}>Available in Store</strong></p>
                    : <p><strong className="d-flex justify-content-center" style={{'fontSize': '0.7rem'}}>Not available in Store</strong></p>
   
                    }
                  
                  <strong ><p className="card-text d-flex justify-content-center" style={{ 'fontSize': '0.9rem', 'color': '#00a1b6'  }}>{product.PrecoCusto}€</p>  </strong>
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
//Declares the imports necessary for this page
import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductDataService from "../Services/Barcelparts.js"

//Creates the React function that will be rendered in the app Page through routes
const Research_Page = function (props) {

  const observer = useRef()

  // Variables used to store the query parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //Getting the query and search name from the link
  const query = urlParams.get('query')
  const by = urlParams.get('by')


  //Creates the variables
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState('0');
  const [Categories, setCategories] = useState([]);


  const lastProductElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log('Visible')
        setPage(page => parseInt(page) + 1)
        console.log(page)
        //find(query, by, page);
      }
    })
    if (node) observer.current.observe(node)
  }, [page, products])

  //Function that will search the database for the information asked 
  const find = (query, by, page) => {
    //Call function that will send a get request to the backend
    ProductDataService.find(query, by, page)
      .then(response => {
        //Console log for debugging and developing
        console.log(response.data.products)
        //Stores the acquired data in the variable products
        setProducts(response.data.products);
      })
      //If there is an error catches it and displays it in the console
      .catch(e => {
        console.log(e);
      });
  };

  //Function to get all the products
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

  //useEffect to run a function when the dependency array changes
  //This function will search the database when query or by changes 
  useEffect(() => {
    setPage('0')
    //Why don't the array get set to an empty one
    setProducts([]);
    console.log(products)
    //Run function find
    find(query, by, page);
  }, [query, by]); //dependency array


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
      <div className="row d-flex align-items-center">
        <div className="col-3">
          <h2>Categories</h2>
        </div>
        <div className="col-6">
          <h2>{query}</h2>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <span className="p-2">Filters</span>
          <i className="fa-solid fa-sliders"></i>
        </div>
      </div>
      {/* Row for displaying the categories retrieved from database and search results */}
      <div className="row">
        <div className="col-3">
          {/* Function that will loop through each element of Categories array and print each Category in the Page  */}
          {Categories.map((Category) => {
            return (
              <div key={Category}>
                {/* Display each Category */}
                <a className="item" href={"/Research_Page?by=NomeFamilia&query=" + Category} >{Category}</a>
                <br></br>
              </div>
            )
          })}
        </div>
        {/* Creates a vertical line to split Categories and search results */}
        <div className="vr"></div>
        {/* Creates a row for displaying search results */}
        <div className="col-9 row row-cols-2 row-cols-md-3 row-cols-lg-4 h-100 d-flex justify-content-end">
          {/* Function that will loop through each element of Products array and print each Product information in the Page  */}
          {products.map((product, index) => {
            //Writes the last product of the array to have an ref to search more items
            if (products.length === index + 1) {
              return (
                <div className="col item-display mb-3 h-100" key={product._id} ref={lastProductElementRef}>
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
                    <a className="brand d-flex justify-content-center" href="#" style={{ 'fontSize': '0.9rem' }}>{product.Design}</a>
                    <p className="card-text d-flex justify-content-center" style={{ 'fontSize': '0.7rem' }}>
                      <strong >Producer: </strong>{product.Marca}</p>
                    {/* Checks if the product is available in store or not */}
                    {product.NumArmazem > 0
                      ? <p><strong className="d-flex justify-content-center" style={{ 'fontSize': '0.7rem', 'color': '#3eb94f' }}>Available in Store</strong></p>
                      : <p><strong className="d-flex justify-content-center" style={{ 'fontSize': '0.7rem' }}>Not available in Store</strong></p>
                    }

                    <strong ><p className="card-text d-flex justify-content-center" style={{ 'fontSize': '0.9rem', 'color': '#00a1b6' }}>{product.PrecoCusto}€</p>  </strong>
                  </div>
                </div>
              )
            }

            //Writes the other products
            else {
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
                    <a className="brand d-flex justify-content-center" href="#" style={{ 'fontSize': '0.9rem' }}>{product.Design}</a>
                    <p className="card-text d-flex justify-content-center" style={{ 'fontSize': '0.7rem' }}>
                      <strong >Producer: </strong>{product.Marca}</p>
                    {product.NumArmazem > 0
                      ? <p><strong className="d-flex justify-content-center" style={{ 'fontSize': '0.7rem', 'color': '#3eb94f' }}>Available in Store</strong></p>
                      : <p><strong className="d-flex justify-content-center" style={{ 'fontSize': '0.7rem' }}>Not available in Store</strong></p>

                    }

                    <strong ><p className="card-text d-flex justify-content-center" style={{ 'fontSize': '0.9rem', 'color': '#00a1b6' }}>{product.PrecoCusto}€</p>  </strong>
                  </div>
                </div>
              )
            }
          })
          }
        </div>
      </div>
    </div>
  );
}


export default Research_Page;
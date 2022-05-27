//Declares the imports necessary for this page
import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductDataService from "../Services/Barcelparts.js"

//Creates the React function that will be rendered in the app Page through routes
const Research_Page = function () {

  //Creates the observer to perform the lazy loading
  const observer = useRef()

  // Variables used to store the query parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //Getting the query and search name from the link
  const query = urlParams.get('query')
  const by = urlParams.get('by')


  //Creates the variables
  const [products, setProducts] = useState([]);
  const [Sort, setSort] = useState('');
  const [page, setPage] = useState('0');
  const [Categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [HasMore, setHasMore] = useState('false');

  //Detects when the node(last product) is in the view of the observer and if so loads more products
  const lastProductElementRef = useCallback(node => {
    //If page is loading do nothing
    if (Loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (HasMore) {
          //Sets the Loading variable so it doesn't increment more numbers if it is still loading the page
          setLoading(true)
          //Increments the page to get new products
          setPage(page => (parseInt(page) + 1).toString())
          //Queries the database and adds it to the previous products list
          scroll_find(query, by, page, Sort);
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [products])

  //Function that will search the database for the information asked and adds it to the previous information
  const scroll_find = (query, by, page, sort) => {
    //Call function that will send a get request to the backend
    ProductDataService.find(query, by, page, sort)
      .then(response => {
        //Console log for debugging and developing
        //console.log(response.data)
        //Stores the acquired data in the variable products
        setProducts([...products, ...response.data.products]);
        //See is there is more documents in the database
        setHasMore(parseInt(response.data.total_results) - (parseInt(page) + 1) * 28 > 0)
      })
      //If there is an error catches it and displays it in the console
      .catch(e => {
        console.log(e);
      });
  };

  const find = (query, by, page, sort) => {
    //Call function that will send a get request to the backend
    ProductDataService.find(query, by, page, sort)
      .then(response => {
        //Console log for debugging and developing
        //console.log(response)
        //Stores the acquired data in the variable products
        setProducts(response.data.products);
        //See is there is more documents in the database
        setHasMore(parseInt(response.data.total_results) - (parseInt(page) + 1) * 20 > 0)
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


  // Handle Sort changes
  const handleChange = (e) => {
    // Creates a loop for setting the other checkboxes to false so only one can be activated
    for (var i = 1; i <= 4; i++) {
      document.getElementById(i).checked = false;
    }
    // Sets the current checkbox to checked
    document.getElementById(e.target.id).checked = true;
    // to get the checked name

    // Sets the sort value with the value from checkbox
    setSort(e.target.value);
  };

  //useEffect to run a function when the dependency array changes
  //This function will search the database when query or by changes 
  useEffect(() => {
    //Why don't the array get set to an empty one
    setProducts([]);
    //Displays the result for debugging
    //console.log(products)
    //Run function find
    setPage('0');

    find(query, by, page, Sort);
    console.log(page)

    setPage('1')
    window.scrollTo(0, 0)
  }, [query, by, Sort]); //dependency array


  //useEffect to run a function only once since the dependency array is empty
  useEffect(() => {
    //Runs the getCategories function
    getCategories()
  }, []) // <-- empty dependency array

  window.requestAnimationFrame(function () {
    //When page finishes loading set Loading to false
    setLoading(false)
  })

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
        {/* <div className="col-3 d-flex justify-content-end align-items-center">
          <span className="p-2">Filters</span>
          <i className="fa-solid fa-sliders"></i>
        </div> */}
        <div className="dropdown show col-3 d-flex justify-content-end align-items-center">
          <a className="nav-link text-decoration-none btn-secondary" href="#" id="filtersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="p-2">Filters</span>
            <i className="fa-solid fa-sliders"></i>
          </a>

          <ul className="dropdown-menu " aria-labelledby="filtersDropdown">
            <li className="dropdown-item">
              <label>
                <input type="checkbox" name="Sort" id="1" value="PriceAscending" onChange={handleChange} /> Price Increasing
              </label>
            </li>
            <li className="dropdown-item">
              <label>
                <input type="checkbox" name="Sort" id="2" value="PriceDescending" onChange={handleChange} /> Price Decreasing
              </label>
            </li>
            <li className="dropdown-item">
              <label>
                <input type="checkbox" name="Sort" id="3" value="A-Z" onChange={handleChange} /> Name: A-Z
              </label>
            </li>
            <li className="dropdown-item">
              <label>
                <input type="checkbox" name="Sort" id="4" value="Z-A" onChange={handleChange} /> Name: Z-A
              </label>
            </li>
          </ul>
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
            //Writes the last product of the array to have an ref to search more item
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
                    <a className="brand d-flex justify-content-center" href={"/Product_Page?id=" + product._id} style={{ 'fontSize': '0.9rem' }}>{product.Design}</a>
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
                    <a className="brand d-flex justify-content-center" href={"/Product_Page?id=" + product._id} style={{ 'fontSize': '0.9rem' }}>{product.Design}</a>
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
          <div className="d-flex">{products.length == 0 && 'No products found'}</div>
          <div>{Loading && 'Loading...'}</div>
        </div>
      </div>
    </div>
  );
}


export default Research_Page;
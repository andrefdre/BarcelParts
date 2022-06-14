//Declares the imports necessary for this page
import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductDataService from "../Services/Barcelparts.js"

//Creates the React function that will be rendered in the app Page through routes
const Catalog_Page = function () {

  //Creates the variables
  const [products, setProducts] = useState([]);
  const [Sort, setSort] = useState('');
  const [page, setPage] = useState('0');
  const [Categories, setCategories] = useState([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [HasMore, setHasMore] = useState('false');

  //Creates the observer to perform the lazy loading
  const observer = useRef()
  //Detects when the node(last product) is in the view of the observer and if so loads more products
  const lastProductElementRef = useCallback(node => {
    //If page is loading do nothing
    if (isLoadingProduct) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        //If has more products to display, load more
        if (HasMore) {
          //Sets the Loading variable so it doesn't increment more numbers if it is still loading the page
          setIsLoadingProduct(true)
          //Increments the page to get new products
          setPage(page => (parseInt(page) + 1).toString())
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [products])

  //Function that will search the database for the information asked and adds it to the previous information
  const scroll_find = (query, by, page, sort) => {
    //Call function that will send a get request to the backend
    ProductDataService.find(query, by, page, sort)
      .then(async response => {
        //Creates a temporary Products variable to add the image from the api
        let productTemp = response.data.products
        //Loops over the products to add the image parameter
        for (let i = 0; i < productTemp.length; i++) {
          //Queries the google api
          await triggerSearch(productTemp[i])
            .then((responseImage) => {
              //Sets the Product image
              productTemp[i].image = responseImage
            })
        }
        //Stores the acquired data in the variable products
        setProducts([...products, ...productTemp]);
        //Set is Loading to remove the loading products icon
        setIsLoadingProduct(false)
        //See is there is more documents in the database
        setHasMore(parseInt(response.data.total_results) - (parseInt(page) + 1) * 28 > 0)
      })
      //If there is an error catches it and displays it in the console
      .catch(e => {
        console.log(e);
      });
  };

  //Function that will find the Products 
  const find = (query, by, page, sort) => {
    //Call function that will send a get request to the backend
    ProductDataService.find(query, by, page, sort)
      .then(async response => {
        //Creates a temporary Products variable to add the image from the api
        let productTemp = response.data.products
        //Loops over the products to add the image parameter
        for (let i = 0; i < productTemp.length; i++) {
          //Queries the google api
          await triggerSearch(productTemp[i])
            .then((responseImage) => {
              //Sets the Product image
              productTemp[i].image = responseImage
            })
        }
        //Stores the acquired data in the variable products
        setProducts(productTemp);
        //Set is Loading to remove the loading products icon
        setIsLoadingProduct(false)
        //See is there is more documents in the database
        setHasMore(parseInt(response.data.total_results) - (parseInt(page) + 1) * 20 > 0)
      })
      //If there is an error catches it and displays it in the console
      .catch(e => {
        console.log(e);
      });
  };

  //Google user key
  var key = "AIzaSyBVX_BmLiBLGxaKjpH-tu2OK3DzIJ2Ie4E";
  //Google custom search engine id
  var cse = "53879c7ef6d345597";
  //Image Api Function
  async function triggerSearch(product) {
    //Queries the google api with the product reference
    return await fetch(`https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cse}&q=${product.Ref_Tecdoc}` + '&searchType=image&num=1')
    .then(response => response.json())
      .then(response => {
        //Returns the image Url
        return response.items[0]['link']
      })
      .catch(() => {
        //In case of error return a error image
        return "https://cdn.appuals.com/wp-content/uploads/2019/08/0aCjoLy.png"
      })
  }


  //Function that will send a get request to the backend to retrieve the categories to display in the page
  const getCategories = () => {
    //Queries the backend to get the categories
    ProductDataService.getCategories()
      .then(response => {
        //Stores the acquired data in categories variable
        setCategories(response.data);
        //Set the isLoading variable to false to display the page content
        setIsLoading(false)
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
      //Disables all the checked in all the checkboxes
      document.getElementById(i).checked = false;
    }
    // Sets the current checkbox to checked
    document.getElementById(e.target.id).checked = true;
    // Sets the sort value with the value from checkbox
    setSort(e.target.value);
  };

  //Function that will load more products when the sort changes
  useEffect(() => {
    //Sets the page to 0
    setPage('0')
    //Run function find
    find("", "Design", 0, Sort);
    //Scroll the page to the top
    window.scrollTo(0, 0)
  }, [Sort]); //dependency array


  //Function that will load more products when the page number changes
  useEffect(() => {
    //If page is bigger than zero call the scroll_find function
    if (page > 0) {
      scroll_find("", "Design", page, Sort);
    }
  }, [page])


  //useEffect to run a function only once since the dependency array is empty
  useEffect(() => {
    //Runs the getCategories function
    getCategories()
  }, []) // <-- empty dependency array

  //If the page has stopped loading display content
  if (isLoading == false) {
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
            <h2>All Products</h2>
          </div>
          {/* Creates the filter button */}
          <div className="dropdown show col-3 d-flex justify-content-end align-items-center">
            <a className="nav-link text-decoration-none btn-secondary" href="#" id="filtersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="p-2">Filters</span>
              <i className="fa-solid fa-sliders"></i>
            </a>
            {/* Filter dropdown menu */}
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
            <div aria-labelledby="Categories">
              {/* Creates a submenu for the Sub-Categories  */}
              {Categories.Categories.map((Category, index) => {
                //If categories has subcategories print it with dropdown menu
                if (Categories.SubCategory.length > 0) {
                  return (
                    <div className="dropdown-submenu" key={Category}>
                      {/* Creates the Category Dropdown button */}
                      <a className="dropdown-item" href={"/Research_Page?by=NomeFamilia&query=" + Category} >{Category}</a>
                      <ul className="dropdown-menu">
                        {/* Prints the Subcategories */}
                        {Categories.SubCategory[index].map((SubCategory) => {
                          return (
                            <li key={Category + SubCategory}><a className="dropdown-item" href={"/Research_Page?by=NomeFamilia&query=" + SubCategory}>{SubCategory}</a></li>
                          )
                        })
                        }
                      </ul>
                    </div>
                  )
                }
                // If the categories doesn't have subcategories just print it without dropdown menu
                else {
                  return (
                    <div key={Category}><a className="dropdown-item" href={"/Research_Page?by=NomeFamilia&query=" + Category} >{Category}</a></div>
                  )
                }
              })}
            </div>
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
                        <image width="100%" xlinkHref={product.image} x="0" y="0" />
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
                        <image width="100%" xlinkHref={product.image} x="0" y="0" />
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
            {/* If the Page is Loading products display Loading */}
            {isLoadingProduct == true
              ? <i className="fa-solid fa-spinner"></i>
              : ''
            }
            {/* If the products array length is 0 then say it didn't found any products */}
            {products.length == 0 && isLoadingProduct == false
              ? 'No products found'
              : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Catalog_Page;
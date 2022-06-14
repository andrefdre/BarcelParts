import React, { useState, useEffect } from "react";
import NumericInput from 'react-numeric-input';
import Barcelparts from "../Services/Barcelparts.js"

function Product_Page(props) {

  // Variables used to store the query parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //Getting the query and search name from the link
  const id = urlParams.get('id')

  // Global Variables
  const [product, setProduct] = useState([]);
  const [number, setNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [productImage, setProductImage] = useState("");

  // Function to find the product by id
  const findById = (id) => {
    //Call function that will send a get request to the backend
    Barcelparts.get(id)
      .then(response => {
        //Stores the response message in the Product variable
        setProduct(response.data);
        // Call the Google Image Api 
        triggerSearch(response.data)
      })
      //If there is an error catches it and displays it in the console
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeNumber = (value) => {
    setNumber(value);
  }

  //Google user key
  var key = "AIzaSyBVX_BmLiBLGxaKjpH-tu2OK3DzIJ2Ie4E";
  //Google custom search engine id
  var cse = "53879c7ef6d345597";
  //Image Api Function
  async function triggerSearch(product) {
    //Queries the google api with the product reference
    await fetch(`https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cse}&q=${product.Ref_Tecdoc}` + '&searchType=image&num=1')
      .then(response => {
        //Stores the acquired Url 
        setProductImage(response.json().items[0]['link']);
        // Sets the isLoading variable to let the page display the contents
        setIsLoading(false);
      })
      //Catch erros and sets the Image accordingly
      .catch(() => {
        //Stores the error Url 
        setProductImage("https://cdn.appuals.com/wp-content/uploads/2019/08/0aCjoLy.png");
        // Sets the isLoading variable to let the page display the contents
        setIsLoading(false);
      })
  }

  //Handler function that will add the product to User's cart
  const AddToCartHandler = () => {
    //Verifies if the user exists if it doesn't sends to the register page
    if (props.user) {
          //Creates a temporary variable to edit the data from user
      var tempUser = props.user;
      //Adds the new product to the existing in the users cart
      tempUser.Carrinho.push({
        Product_id: id,
        Product_amount: number
      });
      //Creates the object to be sent to the database
      let data = {
        _id: tempUser._id,
        Carrinho: tempUser.Carrinho
      }
      //Converts the object to JSON and sends it to the backend
      Barcelparts.updateUser(JSON.stringify(data))
        .then(function (result) {
          //Prints the result
          console.log(result)
        })
      //Reloads the page to display the updated content
      window.location.reload(true)
    }
    else {
      window.location.href = "/Register_Page";
    }
  }

  //Handler function that will let the Owner delete the product from the database
  const DeleteProductHandler = () => {
    //Checks if the user is a Owner
    if (props.user.Owner == true) {
      // Creates a temporary variable that will be sent to the backend
      let ProductTemp = {
        "_Id": id
      }
      // Sends the Product information that will be deleted
      Barcelparts.deleteProduct(ProductTemp)
        .then(() => {
          //Sends the User to the Main Page
          window.location.href = "/";
        })
    }
  }

  //useEffect to run a function only once since the dependency array is empty
  useEffect(() => {
    //Runs the getCategories function
    findById(id);
  }, []) // <-- empty dependency array

//IF the page is still loading don't display anything
  if (isLoading == false) {
    return (
      <div className="container-md">
        <br></br>
        <div className="row">
          <div className="col-4">
            {/* Display the Product Image */}
            <svg className="bd-placeholder-img card-img-top" width="100%" xmlns="http://www.w3.org/2000/svg"
              role="img" viewBox="0 0 250 250" aria-label="Placeholder: Thumbnail" preserveAspectRatio="none"
              focusable="false">
              <title>Placeholder</title>
              <image width="100%" xlinkHref={productImage} x="0" y="0" />
            </svg>
          </div>
          {/* Display Product information */}
          <div className="col-8">
            <h2>{product.Design}</h2>
            <h3 style={{ 'color': '#00a1b6' }}>{product.PrecoCusto} €</h3>
            {/* If the user is the Owner display the deleting product Button */}
            {props.user ?
              props.user.Owner == true ?
                <h5><i class="fa-solid fa-trash" onClick={DeleteProductHandler}></i> Delete Product</h5>
                :
                null
              :
              null
            }
            <hr className="break-line"></hr>
            <div className="Product-Brand">
              <label style={{ 'fontSize': '1.2rem', 'color': '#00a1b6', 'fontWeight': 'bold' }}>Brand</label> <span>{product.Marca}</span>
            </div>
            <div className="Product-Reference">
              <label style={{ 'fontSize': '1.2rem', 'color': '#00a1b6', 'fontWeight': 'bold' }}>Reference</label> <span>{product.Ref}</span>
            </div>
            <div className="Product-Provider">
              <label style={{ 'fontSize': '1.2rem', 'color': '#00a1b6', 'fontWeight': 'bold' }}>Provider</label> <span>{product.Fornecedor}</span>
            </div>
            <br></br>
            <div className="Product-Description">
              <p>{product.Description}</p>
            </div>
            {/* Button to add product to the Cart */}
            <div className="qty  mb-1">
              <NumericInput min={0} max={product.NumArmazem} value={number} style={{ input: { width: '4pc', height: '2pc' }, wrap: { marginRight: '2px' } }} onChange={onChangeNumber} />
              <button type="button" className="btn btn-outline-secondary" onClick={AddToCartHandler}>Add to cart</button>
            </div>
            {/* Checks if the product is available in store or not */}
            {product.NumArmazem > 0
              ? <p><strong className="d-flex" style={{ 'fontSize': '0.7rem', 'color': '#3eb94f' }}>Available in Store, {product.NumArmazem} left</strong></p>
              : <p><strong className="d-flex" style={{ 'fontSize': '0.7rem' }}>Not available in Store</strong></p>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Product_Page;
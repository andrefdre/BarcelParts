import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import NumericInput from 'react-numeric-input';
import Barcelparts from "../Services/Barcelparts.js"

function Product_Page(props) {

  // Variables used to store the query parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //Getting the query and search name from the link
  const id = urlParams.get('id')

  const [product, setProduct] = useState([]);
  const [number, setNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [productImage, setProductImage] = useState("");


  const findbyId = (id) => {
    //Call function that will send a get request to the backend
    Barcelparts.get(id)
      .then(response => {
        //Console log for debugging and developing
        //console.log(response.data)

        setProduct(response.data);
        triggersearch(response.data)
      })
      //If there is an error catches it and displays it in the console
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeNumber = (value) => {
    setNumber(value);
  }

  var key = "AIzaSyBVX_BmLiBLGxaKjpH-tu2OK3DzIJ2Ie4E";
  var cse = "53879c7ef6d345597";
  //Image Api Function
  async function triggersearch(product) {
    await fetch(`https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cse}&q=${product.Ref_Tecdoc}` + '&searchType=image')
      .then(response => {
        return response.json()
      })
      .then(response => {
        console.log(response)
        setProductImage(response.items[0]['link']);
        setIsLoading(false);
       // setProductImage("https://cdn.appuals.com/wp-content/uploads/2019/08/0aCjoLy.png");
      });
  }

  const AddToCartHandler = () =>{
    //Creates a temporary variable to edit the data from user
    var tempUser=props.user;
    //Adds the new product to the existing in the users cart
    tempUser.Carrinho.push({
      Product_id: id,
      Product_amount: number});
      //Creates the object to be sent to the database
      let data = {
        _id : tempUser._id,
        Carrinho: tempUser.Carrinho
      }
      //Converts the object to JSON and sends it to the backend
      Barcelparts.updateUser(JSON.stringify(data))
      .then(function (result) {
        //Prints the result
        console.log(result)
      })
      window.location.reload(true)
  }

  const DeleteProductHandler = () => {
    if(props.user.Owner == true) {
      let ProductTemp = {
        "_Id":id
      }
      console.log(ProductTemp)
      Barcelparts.deleteProduct(ProductTemp)
      .then(response=>{
        console.log(response)
        window.location.search = ""
        window.location.pathname="/"
      })
    }
  }


  //useEffect to run a function only once since the dependency array is empty
  useEffect(() => {
    //Runs the getCategories function
    findbyId(id);
  }, []) // <-- empty dependency array


  if(isLoading == false) {
  return (
    <div className="container-md">
      <br></br>
      <div className="row">
        <div className="col-4">
          <svg className="bd-placeholder-img card-img-top" width="100%" xmlns="http://www.w3.org/2000/svg"
            role="img" viewBox="0 0 250 250" aria-label="Placeholder: Thumbnail" preserveAspectRatio="none"
            focusable="false">
            <title>Placeholder</title>
            <image width="100%" xlinkHref={productImage} x="0" y="0" />
          </svg>
        </div>
        <div className="col-8">
          <h2>{product.Design}</h2>
          <h3 style={{ 'color': '#00a1b6' }}>{product.PrecoCusto} €</h3>

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
          <div className="qty  mb-1">
          <NumericInput min={0} max={product.NumArmazem} value={number} style={{ input:{ width: '4pc' , height:'2pc' } ,wrap: {marginRight: '2px'}}} onChange={onChangeNumber}/>
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
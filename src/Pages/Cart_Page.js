import React, { useEffect } from "react";
import Barcelparts from "../Services/Barcelparts.js"
import {getJwtToken} from '../Services/authentication'

function Cart_Page(props) {

    //This function will set the function on the forms when it's submitted when the page loads
    useEffect(() => {
        //Selects the forms
        var forms = document.querySelectorAll('.needs-validation')
        //For each form insert the function
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', async function (event) {
                    event.preventDefault()
                    //If the form isn't valid stop it from continuing 
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        //Creates the temporary variables
                        let CarrinhoTemp = [];
                        let TotalPrice = 0;

                        //Gets the products in the cart and the total price by querying the database
                        TotalPrice = await Promise.all(props.user.Carrinho.map(async (product) => {
                            return await Barcelparts.get(product.Product_id)
                                .then(response => {
                                    TotalPrice = TotalPrice + parseFloat((response.data.PrecoCusto)) * parseInt(product.Product_amount)
                                    let CarrinhoTemporary = {}
                                    CarrinhoTemporary.Product_id = product.Product_id
                                    CarrinhoTemporary.Product_reference = response.data.Ref
                                    CarrinhoTemporary.Product_amount = product.Product_amount
                                    CarrinhoTemp.push(CarrinhoTemporary)
                                    return TotalPrice
                                })
                        }))

                        //Creates the order variable to be sent to the database
                        let Order = {
                            User_FirstName: (new FormData(forms[0])).get("firstName"),
                            User_LastName: (new FormData(forms[0])).get("lastName"),
                            User_Id: props.user._id,
                            Email: props.user.Email,
                            Carrinho: CarrinhoTemp,
                            TotalPrice: TotalPrice[TotalPrice.length - 1],
                            Payment_Method: (new FormData(forms[0])).get("paymentMethod")
                        }
                        //Creates the order in the database
                        await Barcelparts.createOrder(JSON.stringify(Order),getJwtToken())
                            .then(response => {
                                console.log(response)
                            })

                        //Creates the temporary user to empty it's cart
                        var tempUser = props.user;
                        //Empties the cart
                        tempUser.Carrinho = [];
                        //Updates the user's cart
                        Barcelparts.updateUser(JSON.stringify(tempUser),getJwtToken())
                            .then(function (result) {
                                //Prints the result
                                console.log(result)
                                window.location.reload(true)
                            })
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    })

    //Function that will display the products information on the page
    const productHandler = (element_id, product_info) => {
        //Queries the database for the product information
        Barcelparts.get(product_info.Product_id)
            .then(response => {
                var Design = document.getElementById('Design' + element_id);
                Design.textContent = response.data.Design
                var Preco = document.getElementById('Preco' + element_id);
                Preco.textContent = response.data.PrecoCusto
                var Total = document.getElementById('Total');
                Total.textContent = (parseFloat(Total.textContent) + parseFloat(response.data.PrecoCusto) * parseInt(product_info.Product_amount)).toFixed(2)
            })
            .catch(e => {
                console.log(e);
            });
    }

    //Handler to remove products from the shopping cart
    const removeItemHandler = (e) => {
        //Creates a temporary user to apply the alterations
        var tempUser = props.user;
        //Removes the product from the array
        tempUser.Carrinho.splice(parseInt(e.target.id), parseInt(e.target.id) + 1)
        //Creates the data structure to be sent to the backend
        let data = {
            _id: tempUser._id,
            Carrinho: tempUser.Carrinho
        }
        //Sends the data to the backend
        Barcelparts.updateUser(JSON.stringify(data),getJwtToken(),getJwtToken())
            .then(function (result) {
                //Prints the result
                console.log(result)
            })
        //Reloads the page to show the results
        window.location.reload(true)
    }


    //Content that will be displayed to the user
    return (
        <div className="container-md">
            {/* Adds space to the top */}
            <br></br>
            {/* Div where products will be displayed */}
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">{props.user == null ? 0 : props.user.Carrinho.length}</span>
                    </h4>
                    {/* List of all products in cart */}
                    <ul className="list-group mb-3">
                        {/* Will loop all user's products in cart to display it in the website */}
                        {props.user.Carrinho.map((product_info, index) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                                    <div className="d-flex justify-content-between">
                                        <i id={index} className="fa-solid fa-trash-can" style={{ 'padding-right': '5px' }} onClick={removeItemHandler}></i>
                                        <div>
                                            <h6 id={'Design' + index} className="my-0"></h6>
                                            <small className="text-muted">x{product_info.Product_amount}</small>
                                        </div>
                                    </div>
                                    <span id={'Preco' + index} className="text-muted justify-content-end" onLoad={productHandler(index, product_info)}></span>

                                </li>
                            )
                        })}
                        {/* Displays the Total */}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (Eur)</span>
                            <strong>
                                <span id="Total">0</span>
                                <span>€</span>
                            </strong>
                        </li>
                    </ul>
                </div>

                {/* Order information */}
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" name="firstName" id="firstName" placeholder="" defaultValue={props.user == null ? "" : props.user.User_FirstName} required></input>
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" name="lastName" id="lastName" placeholder="" defaultValue={props.user == null ? "" : props.user.User_LastName} required></input>
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="you@example.com" defaultValue={props.user == null ? "" : props.user.Email} readOnly></input>
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" defaultValue={props.user == null ? "" : props.user.Address} required></input>
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="col-md-5">
                                <label htmlFor="country" className="form-label">Country</label>
                                <select className="form-select" name="country" id="country" defaultValue="15" required>
                                    <option value="">Choose...</option>
                                    <option value="1" data-text="Alemanha" data-iso-code="DE">
                                        Alemanha
                                    </option>
                                    <option value="40" data-text="Andorra" data-iso-code="AD">
                                        Andorra
                                    </option>
                                    <option value="2" data-text="Áustria" data-iso-code="AT">
                                        Áustria
                                    </option>
                                    <option value="3" data-text="Bélgica" data-iso-code="BE">
                                        Bélgica
                                    </option>
                                    <option value="74" data-text="Croácia" data-iso-code="HR">
                                        Croácia
                                    </option>
                                    <option value="20" data-text="Dinamarca" data-iso-code="DK">
                                        Dinamarca
                                    </option>
                                    <option value="193" data-text="Eslovénia" data-iso-code="SI">
                                        Eslovénia
                                    </option>
                                    <option value="6" data-text="Espanha" data-iso-code="ES">
                                        Espanha
                                    </option>
                                    <option value="8" data-text="França" data-iso-code="FR">
                                        França
                                    </option>
                                    <option value="9" data-text="Grécia" data-iso-code="GR">
                                        Grécia
                                    </option>
                                    <option value="143" data-text="Hungria" data-iso-code="HU">
                                        Hungria
                                    </option>
                                    <option value="26" data-text="Irlanda" data-iso-code="IE">
                                        Irlanda
                                    </option>
                                    <option value="10" data-text="Itália" data-iso-code="IT">
                                        Itália
                                    </option>
                                    <option value="12" data-text="Luxemburgo" data-iso-code="LU">
                                        Luxemburgo
                                    </option>
                                    <option value="139" data-text="Malta" data-iso-code="MT">
                                        Malta
                                    </option>
                                    <option value="13" data-text="Países Baixos" data-iso-code="NL">
                                        Países Baixos
                                    </option>
                                    <option value="14" data-text="Polónia" data-iso-code="PL">
                                        Polónia
                                    </option>
                                    <option value="15" data-text="Portugal" data-iso-code="PT">
                                        Portugal
                                    </option>
                                    <option value="17" data-text="Reino Unido" data-iso-code="GB">
                                        Reino Unido
                                    </option>
                                    <option value="18" data-text="Suécia" data-iso-code="SE">
                                        Suécia
                                    </option>
                                    <option value="19" data-text="Suíça" data-iso-code="CH">
                                        Suíça
                                    </option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">Zip</label>
                                <input type="text" className="form-control" name="zip" id="zip" placeholder="" required></input>
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>

                        <hr className="my-4"></hr>


                        <h4 className="mb-3">Payment</h4>

                        <div className="my-3">
                            <div className="form-check">
                                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" defaultChecked required></input>
                                <label className="form-check-label" htmlFor="bankTransfer">Bank Transfer</label>
                            </div>
                            <div className="form-check">
                                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" required></input>
                                <label className="form-check-label" htmlFor="credit">Credit card</label>
                            </div>
                            <div className="form-check">
                                <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required></input>
                                <label className="form-check-label" htmlFor="debit">Debit card</label>
                            </div>
                            <div className="form-check">
                                <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required></input>
                                <label className="form-check-label" htmlFor="paypal">PayPal</label>
                            </div>
                        </div>

                        <hr className="my-4"></hr>

                        <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                    </form>
                </div>
            </div>
        </div>
    )

}


export default Cart_Page;
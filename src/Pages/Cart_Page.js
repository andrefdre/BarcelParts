import React, { useState, useEffect } from "react";
import NumericInput from 'react-numeric-input';
import ProductDataService from "../Services/Barcelparts.js"

function Cart_Page() {


    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })

    return (
        <div className="container-md">
            <br></br>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">3</span>
                    </h4>
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Product name</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$12</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Second product</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$8</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Third item</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$5</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (EUR)</span>
                            <strong>$20</strong>
                        </li>
                    </ul>

                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label for="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="" value="" required></input>
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label for="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="" value="" required></input>
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>

                            <div className="col-12">
                                <label for="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com"></input>
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="col-12">
                                <label for="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required></input>
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="col-md-5">
                                <label for="country" className="form-label">Country</label>
                                <select className="form-select" id="country" data-default-value="15" required>
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
                                    <option value="15" data-text="Portugal" data-iso-code="PT" selected>
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
                                <label for="zip" className="form-label">Zip</label>
                                <input type="text" className="form-control" id="zip" placeholder="" required></input>
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>

                        <hr className="my-4"></hr>


                        <h4 className="mb-3">Payment</h4>

                        <div className="my-3">
                            <div className="form-check">
                                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required></input>
                                <label className="form-check-label" for="credit">Credit card</label>
                            </div>
                            <div className="form-check">
                                <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required></input>
                                <label className="form-check-label" for="debit">Debit card</label>
                            </div>
                            <div className="form-check">
                                <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required></input>
                                <label className="form-check-label" for="paypal">PayPal</label>
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
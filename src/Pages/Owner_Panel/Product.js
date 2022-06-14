import React, {  useEffect } from "react";
import BarcelParts from "../../Services/Barcelparts.js"

//Creates the React function that will be rendered in the app Page through routes
const Product = function () {

        useEffect(() => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', async function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        let Product = {
                            "Fornecedor": (new FormData (forms[0])).get("Fornecedor"),
                            "Marca":(new FormData (forms[0])).get("Marca"),
                            "Ref": (new FormData (forms[0])).get("Ref"),
                            "Design": (new FormData (forms[0])).get("Design"), 
                            "Ref_Tecdoc": (new FormData (forms[0])).get("Ref_Tecdoc"),
                            "NomeFamilia": (new FormData (forms[0])).get("NomeFamilia"),
                            "SubFamilia": (new FormData (forms[0])).get("SubFamilia"),
                            "PFU": (new FormData (forms[0])).get("PFU"),
                            "CASCO": (new FormData (forms[0])).get("CASCO"),
                            "PrecoCusto": (new FormData (forms[0])).get("PrecoCusto"),
                            "NumArmazem": (new FormData (forms[0])).get("NumArmazem")
                        }
                        
                        await BarcelParts.createProduct(Product)
                        .then(response => {
                            if (response.data) {
    
                            }
                        })
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    })


    return (
        <div>
            <h1 className="h2 pt-3">Product Creation</h1>
            <hr className="break-line"></hr>

            <form className="needs-validation" name="my_form">
                <div className="row">
                    <div className="col-4 d-flex flex-column">

                        <div>
                            <label htmlFor="Fornecedor" className="form-label">Supplier: </label>
                            <input type="text" className="form-control" name="Fornecedor"  id="Fornecedor" placeholder="" required />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="Marca" className="form-label">Brand: </label>
                            <input type="text" className="form-control" name="Marca" id="Marca" placeholder="" required />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="Ref" className="form-label">Reference: </label>
                            <input type="text" className="form-control" name="Ref" id="Ref" placeholder="" required />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="Design" className="form-label">Item Name: </label>
                            <input type="text" className="form-control" name="Design" id="Design" placeholder="" required />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="Ref_Tecdoc" className="form-label">Tecdoc Reference: </label>
                            <input type="text" className="form-control" name="Ref_Tecdoc" id="Ref_Tecdoc" placeholder="" />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="NomeFamilia" className="form-label">Family Name: </label>
                            <input type="text" className="form-control" name="NomeFamilia" id="NomeFamilia" placeholder="" required />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="SubFamilia" className="form-label">SubFamily Name: </label>
                            <input type="text" className="form-control" name="SubFamilia" id="SubFamilia" placeholder="" />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="PFU" className="form-label">PFU: </label>
                            <input type="text" className="form-control" name="PFU" id="PFU" placeholder="" />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="CASCO" className="form-label">CASCO: </label>
                            <input type="text" className="form-control" name="CASCO" id="CASCO" placeholder="" />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="PrecoCusto" className="form-label">Price: </label>
                            <input type="number" step="0.01" className="form-control" name="PrecoCusto" id="PrecoCusto" placeholder="" required />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                        <div>
                            <label htmlFor="NumArmazem" className="form-label">Amount in store: </label>
                            <input type="number" className="form-control" name="NumArmazem" id="NumArmazem" placeholder="" required />
                            <div className="invalid-feedback">
                                Required.
                            </div>
                        </div>

                    </div>
                    <div className="col-6 d-flex align-items-center">
                        <button className="btn btn-primary btn-lg" type="submit">Register Product</button>
                    </div>
                </div>

            </form>
        </div>

    )

}

export default Product;
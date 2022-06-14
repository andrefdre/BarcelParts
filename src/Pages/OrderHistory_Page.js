import React, { useState, useEffect } from "react";
import Barcelparts from "../Services/Barcelparts.js"

function OrderHistory_Page(props) {

    //Creates a variable with the user info
    let tempUser = props.user;

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //Function that will send a get request to the backend to retrieve the categories to display in the page
    const getOrders = () => {
        let data = {
            Email: props.user.Email
        }
        Barcelparts.getOrders(JSON.stringify(data))
            .then(response => {
                //console.log(response.data.Orders)
                setOrders(response.data.Orders)
                setIsLoading(false)
            })
            //If there is any erros catch them and display them
            .catch(e => {
                console.log(e);
            });
    };

    //this runs once after doing the return
    useEffect(() => {
        getOrders()
    }, [])

    if (isLoading == false) {
        return (
            <React.Fragment>
                <div>
                    <br></br>

                    {

                        orders.map((order, index) => {

                            console.log(order)
                            return (

                                <div>
                                    <div className="card">
                                        <ul className="list-group list-group-flush">
                                            <li className="card-body">{"order id = " + order._id}</li>
                                            <li className="list-group-item">{"price =" + order.TotalPrice}</li>
                                        </ul>
                                    </div>
                                    <br></br>
                                </div>


                            )
                        })


                    }
                </div>

            </React.Fragment>
        )
    }


}

export default OrderHistory_Page;
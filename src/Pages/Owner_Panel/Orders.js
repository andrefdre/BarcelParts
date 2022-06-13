import { get } from "jquery";
import React, { useState, useEffect, useRef, useCallback } from "react";
import BarcelParts from "../../Services/Barcelparts.js"

//Creates the React function that will be rendered in the app Page through routes
const Orders = function () {

    const [Orders, setOrders] = useState([]);
    const [Loading, setLoading] = useState(true);

    const getOrders = () => {
        //Call function that will send a get request to the backend
        BarcelParts.getOrders()
          .then(response => {
            //Console log for debugging and developing
            setOrders(response.data.Orders)
            setLoading(false)
          })
          //If there is an error catches it and displays it in the console
          .catch(e => {
            console.log(e);
          });
      };

      useEffect(() => {
        getOrders()
      })

    if (Loading == false) {
        return (
            <div>
                {Orders.map((Order,index)=>{
                    return(
                        <div>
                            
                        </div>
                    )
                })}

            </div>
        )
    }

}

export default Orders;
import React, { useEffect, useState } from "react";
import API from "../utils/API";
// import { Link, useLocation } from "react-router-dom";

function In() {


    const [currentInCount, setCurrentInCount] = useState(0);

    // useEffect(() => {
    //     const inCount = async () => {

    //         const count = await API.inCount();
    //         if (count == null) {
    //             setCurrentInCount(0);
    //         }
    //         setCurrentInCount(count);
    //     };
    //     inCount();
    // }, []);


    function plusBtn(e) {
        e.preventDefault();
        const addQty = prompt("Please Enter Qty : ");

        API.locationAdd({
            location: "Aging Room",
            qty: addQty
        })
    };

    return (
        <main className="card mt-5 mb-5 col-sm-2">
            In : {currentInCount}
            <div className="container">
                <div className="row">
                    <button type="button" class="btn btn-outline-info mb-3 col" onClick={plusBtn}>+</button>
                    <div className="col-1" />
                    <button type="button" class="btn btn-outline-primary mb-3 col">-</button>
                </div>
            </div>
        </main>
    )
}

export default In;

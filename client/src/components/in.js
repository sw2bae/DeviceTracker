import React, { useEffect, useState } from "react";
import API from "../utils/API";
// import { Link, useLocation } from "react-router-dom";

function In() {


    const [currentInCount, setCurrentInCount] = useState("none");

    const qtyCount = async () => {
        const count = await API.locationRead();
        setCurrentInCount(count);
    };

    useEffect(() => {
        qtyCount();
    }, []);

    async function plusBtn(e) {
        e.preventDefault();
        const addQty = prompt("(+) Please Enter Qty : ");
        if (currentInCount === "none") {
            await API.locationAdd({
                location: "Aging Room",
                qty: addQty
            });
        } else {
            await API.locationUpdate({
                qty: parseInt(currentInCount) + parseInt(addQty)
            });
        }
        qtyCount();
    };

    async function minusBtn(e) {
        e.preventDefault();
        const subtractQty = prompt("(-) Please Enter Qty : ");

        await API.locationUpdate({
            qty: parseInt(currentInCount) - parseInt(subtractQty)
        });

        qtyCount();
    };


    return (
        <main className="card mt-5 mb-5 col-sm-2">
            <p className="text-center mt-3">Aging Room</p>
            <div className="container">
                <div className="row">
                    <button type="button" class="btn btn-outline-info mb-3 col" onClick={plusBtn}>+</button>
                    <div className="col-1" />
                    <button type="button" class="btn btn-outline-primary mb-3 col" onClick={minusBtn}>-</button>
                </div>
            </div>
            <h1 className="text-center">{currentInCount}</h1>

        </main>
    )
}

export default In;

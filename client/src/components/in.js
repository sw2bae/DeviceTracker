import React, { useEffect, useState } from "react";
import API from "../utils/API";
// import { Link, useLocation } from "react-router-dom";

function In() {

    const [inventory, setInventory] = useState("none");

    const inventoryCount = async () => {
        const count = await API.locationRead();
        setInventory(count);
        // console.log(inventory);
    };

    useEffect(() => {
        inventoryCount();
    }, []);

    async function plusBtn(e) {
        e.preventDefault();
        const location = e.target.value;
        const addQty = prompt("(+) Please Enter Qty : ");
        if (inventory === "none") {
            await API.locationAdd({
                location: location,
                qty: addQty
            });
        } else {
            await API.locationUpdate({
                location: location,
                qty: parseInt(inventory[location]) + parseInt(addQty)
            });
        }
        inventoryCount();
    };

    async function minusBtn(e) {
        e.preventDefault();
        const location = e.target.value;
        const subtractQty = prompt("(-) Please Enter Qty : ");

        await API.locationUpdate({
            location: location,
            qty: parseInt(inventory[location]) - parseInt(subtractQty)
        });

        inventoryCount();
    };


    return (
        <main className="card mt-5 mb-5 col-sm-2">
            <p className="text-center mt-3">Aging Room</p>
            <div className="container">
                <div className="row">
                    <button type="button" class="btn btn-outline-info mb-3 col" onClick={plusBtn} value="Aging Room">+</button>
                    <div className="col-1" />
                    <button type="button" class="btn btn-outline-primary mb-3 col" onClick={minusBtn} value="Aging Room">-</button>
                </div>
            </div>
            <h1 className="text-center">{inventory["Aging Room"]}</h1>

        </main>
    )
}

export default In;

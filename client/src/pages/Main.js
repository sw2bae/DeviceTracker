import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Header from "../components/header";
import In from "../components/in";
import Out from "../components/out";
import { LocationProvider } from "../utils/LocationContext";

function Main() {

    const [inventory, setInventory] = useState("none");
    var firstLocation;
    var secondLocation;

    const inventoryCount = async () => {
        const count = await API.locationRead();
        setInventory(count);
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


    async function dragStart(e) {
        console.log("Drag Start : ");
        firstLocation = e.target.id;
        e.target.className += " bg-dark text-white";
    };
    function dragEnd(e) {
        e.preventDefault();
        console.log("Drag End : ", e.target.id);

    };
    function dragOver(e) {
        e.preventDefault();
        console.log("Drag Over : ");
    };
    function dragEnter(e) {
        e.preventDefault();
        console.log("Drag Enter : ");
        if (e.target.id === "OutBound") {
            e.target.className += " bg-dark text-white";
        } else {
            e.target.className += " bg-dark text-white";
        }
    };
    function dragLeave(e) {
        e.preventDefault();
        console.log("Drag Leave : ");
        if (e.target.id === "OutBound") {
            e.target.className = "card mt-5 mb-5 col-sm";
        } else {
            e.target.className = "font-weight-bold text-center mt-3 border rounded";
        }
    };

    async function dragDrop(e) {
        e.preventDefault();
        e.stopPropagation()
        console.log("Drag Drop : ", e.target.id);
        secondLocation = e.target.id;
        console.log(firstLocation, secondLocation);

        if (e.target.id === "OutBound") {
            e.target.className = "card mt-5 mb-5 col-sm";
        } else {
            e.target.className = "font-weight-bold text-center mt-3 border rounded";
        }

        if (secondLocation === "OutBound") {
            const newLocation = prompt("Location : ")
            const addQty = prompt("QTY : ");
            await API.locationAdd({
                location: newLocation,
                qty: addQty
            }).then(() => {
                API.locationUpdate({
                    location: firstLocation,
                    qty: parseInt(inventory[firstLocation]) - parseInt(addQty)
                })
            });
        } else if (firstLocation === secondLocation) {
            return;
        } else {
            const moveQty = prompt("QTY : ");
            await API.locationUpdate({
                location: secondLocation,
                qty: parseInt(inventory[secondLocation]) + parseInt(moveQty)
            }).then(() => {
                API.locationUpdate({
                    location: firstLocation,
                    qty: parseInt(inventory[firstLocation]) - parseInt(moveQty)
                })
            });
        }
        inventoryCount();
    };

    return (
        <>
            <Header />
            <main className="card mt-3">
                <div className=" container">
                    <LocationProvider value={inventory}>
                        <div className="row">
                            <In onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragDrop={dragDrop} plusBtn={plusBtn} minusBtn={minusBtn} />
                            <div className="col-sm-1">
                            </div>
                            <Out onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragDrop={dragDrop} />
                        </div>
                    </ LocationProvider>
                </div>
            </main>
        </>
    );
}

export default Main;


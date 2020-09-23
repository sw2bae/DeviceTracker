import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Header from "../components/header";
import In from "../components/in";
import Out from "../components/out";


// import { Link, useLocation } from "react-router-dom";

function Main() {

    function dragStart(e) {
        const location1 = e.target.id;
        console.log("location1 : ", location1);
        e.target.className += " bg-dark text-white";
    };
    function dragEnd(e) {
        console.log("DragEnd");
        e.target.className = "font-weight-bold text-center mt-3 border rounded";
    };
    function dragOver(e) {
        e.preventDefault();
        console.log("DragOver");
    };
    function dragEnter(e) {
        e.preventDefault();
        console.log("DragEnter");
    };
    function dragLeave(e) {
        // e.preventDefault();
        console.log("DragLeave");
    };

    async function dragDrop(e) {
        e.preventDefault();
        const location2 = e.target.id;
        console.log("location 2 : ", location2);
        console.log(location2);
        const newLocation = prompt("Location : ")
        const addQty = prompt("QTY : ");

        if (location2 === "OutBound") {
            await API.locationAdd({
                location: newLocation,
                qty: addQty
            }).then(() => {
                console.log("New Location Added");
            });
        }
        // else {
        //     await API.locationUpdate({
        //         location: e.target.id,
        //         qty: parseInt(inventory[location2]) + parseInt(addQty)
        //     });
        // }
    };


    return (
        <>
            <Header />
            <main className="card mt-3">
                <div className=" container">
                    <div className="row">
                        <In onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragDrop={dragDrop} />
                        <div className="col-sm-1">
                        </div>
                        <Out onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragDrop={dragDrop} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Main;

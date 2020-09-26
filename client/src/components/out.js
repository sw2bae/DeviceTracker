import React from "react";
import { useLocationContext } from "../utils/LocationContext";

function Out({ onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDragDrop }) {

    const inventory = useLocationContext();
    // console.log(inventory);

    let locations = (Object.keys(inventory));
    locations.shift();



    return (
        <>
            <main className="card mt-5 mb-5 col-sm" onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDragDrop} id="OutBound">
                <div className="mt-3" />
                {locations.map((location, index) => {
                    if (typeof (inventory) === "string") {
                        return;
                    } else {
                        return (<ul className="font-weight-bold text-center mt-1 mb-1 border rounded" draggable="true" id={location} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDragDrop} key={index}>[{location}] {inventory[location]}</ul>);
                    }
                })}
                <div className="mb-3" />
            </main>
            <div className="mr-3">
            </div>
            <div className="card mt-5 mb-5 col-sm">
            </div>
        </>
    )
}

export default Out;

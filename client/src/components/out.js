import React from "react";
import { useLocationContext } from "../utils/LocationContext";


function Out({ onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDragDrop, dailyLogData }) {


    const inventory = useLocationContext();

    let locations = (Object.keys(inventory));
    locations.shift();

    let count = (Object.values(inventory));
    let sum = count.reduce((pre, value) => {
        return pre + value;
    })


    return (
        <>
            <main className="card mt-5 mb-5 col-sm" onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDragDrop} id="OutBound">
                <div className="mt-3" />
                {locations.map((location, index) => {
                    if (typeof (inventory) === "string") {
                        return;
                    } else {
                        return (<p className="font-weight-bold text-center mt-1 mb-1 border rounded" draggable="true" id={location} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDragDrop} key={index}>[{location}] {inventory[location]}</p>);
                    }
                })}
                <div className="mb-3" />
            </main>
            <div className="mr-3">
            </div>
            <div className="card mt-5 mb-5 col-sm">
                <div className="mt-3" />
                <h1 className="font-weight-bold text-center mt-1 mb-1 border rounded"> Total : {sum}</h1>
                <div className="mb-3" />
                <table className="table table-striped mb-3">

                    <thead>
                        <tr className="align-middle text-center">
                            <th scope="col" >ID</th>
                            <th scope="col" >From</th>
                            <th scope="col" >To</th>
                            <th scope="col" >QTY</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {dailyLogData.map((log, index) => {
                            return (
                                <tr key={index}>
                                    <td>{log.logInId}</td>
                                    <td>{log.location_1}</td>
                                    <td>{log.location_2}</td>
                                    <td>{log.qty}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default Out;

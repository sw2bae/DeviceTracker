import React from "react";

// Depending on the current path, this component sets the "active" className on the appropriate navigation link item
function LogHead({ btnStatus, sortByNum, sortByCharLocation }) {

    return (
        <thead>
            <tr>
                <th scope="col">Log #
    <button type="button" className="btn btn-link" onClick={sortByNum}>{btnStatus.nummode}</button>
                </th>
                <th scope="col" className="align-middle">Date</th>
                <th scope="col" className="align-middle">Time</th>
                <th scope="col" className="align-middle">User ID</th>
                <th scope="col">Location From
    <button type="button" className="btn btn-link" id="location1" onClick={sortByCharLocation}>{btnStatus.location1}</button>
                </th>
                <th scope="col">Location To
    <button type="button" className="btn btn-link" id="location2" onClick={sortByCharLocation}>{btnStatus.location2}</button>
                </th>
                <th scope="col" className="align-middle">QTY</th>
            </tr>
        </thead>
    );
}

export default LogHead;
